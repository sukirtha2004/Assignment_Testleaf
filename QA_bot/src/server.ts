import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import { z } from "zod";
import { loadDocument } from "./loaders";
import { getModelInfo, getAvailableProviders } from "./model";
import { FileUploadSchema, InvokeSchema, PromptTypeEnum, PromptType } from "./types";
import { runChain } from "./chain";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT ?? 3000);
const uploadDir = path.resolve(process.cwd(), "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req: Request, _res: Response, next: NextFunction) => {
  const requestId = `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
  (req as any).requestId = requestId;
  req.headers["x-request-id"] = requestId;
  console.info(`[${requestId}] ${req.method} ${req.originalUrl}`);
  next();
});

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    const suffix = Math.random().toString(36).slice(2, 8);
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${suffix}${ext}`);
  },
});

const allowedExtensions = new Set([".pdf", ".docx", ".csv", ".txt"]);
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.has(ext)) {
      return cb(new Error(`Unsupported file type: ${ext}`));
    }
    cb(null, true);
  },
});

app.get("/", (_req, res) => {
  res.sendFile(path.resolve(process.cwd(), "index.html"));
});

app.get("/health", (_req, res) => {
  const modelInfo = getModelInfo();
  res.json({ status: "healthy", timestamp: new Date().toISOString(), model: modelInfo });
});

app.get("/config", (_req, res) => {
  const providers = getAvailableProviders();
  res.json({ providers });
});

app.post(
  "/search/upload",
  upload.array("files", 10),
  async (req: Request, res: Response, next: NextFunction) => {
    const startedAt = Date.now();
    const requestId = (req as any).requestId as string;

    try {
      const body = FileUploadSchema.parse(req.body);
      const files = (req.files || []) as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "At least one file is required" });
      }

      console.info(`[${requestId}] received ${files.length} file(s): ${files.map(f => f.originalname).join(", ")}`);

      const promptType = body.promptType as PromptType;
      
      // Load and process each file
      const loadedTexts: string[] = [];
      for (const file of files) {
        try {
          console.info(`[${requestId}] loading file: ${file.originalname}`);
          const text = await loadDocument(file.path);
          loadedTexts.push(text);
          console.info(`[${requestId}] loaded file: ${file.originalname} (${text.length} chars)`);
        } catch (fileError) {
          console.error(`[${requestId}] failed to load file: ${file.originalname}`, fileError);
          throw new Error(`Failed to process file "${file.originalname}": ${fileError instanceof Error ? fileError.message : "Unknown error"}`);
        }
      }

      const documentText = loadedTexts.join("\n\n---\n\n");
      console.info(`[${requestId}] total document length=${documentText.length}`);

      const output = await runChain(promptType, documentText, body.question, body.provider, body.model, body.temperature);
      const duration = Date.now() - startedAt;
      const modelInfo = getModelInfo(body.provider, body.model, body.temperature);

      res.json({
        output,
        model: modelInfo.model,
        provider: modelInfo.provider,
        temperature: modelInfo.temperature,
        promptType,
        filesProcessed: files.map((file) => file.originalname),
        durationMs: duration,
      });
    } catch (error) {
      next(error);
    }
  }
);

app.post("/search/document", async (req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();
  const requestId = (req as any).requestId as string;

  try {
    const body = InvokeSchema.parse(req.body);
    const promptType = body.promptType as PromptType;
    let documentText = body.documentText ?? "";

    if (body.documentPath) {
      documentText = await loadDocument(path.resolve(process.cwd(), body.documentPath));
    }

    const output = await runChain(promptType, documentText, body.question, body.provider, body.model, body.temperature);
    const duration = Date.now() - startedAt;
    const modelInfo = getModelInfo(body.provider, body.model, body.temperature);

    res.json({
      output,
      model: modelInfo.model,
      provider: modelInfo.provider,
      temperature: modelInfo.temperature,
      promptType,
      durationMs: duration,
    });
  } catch (error) {
    next(error);
  }
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  const requestId = (req as any).requestId as string;
  console.error(`[${requestId}] ERROR`, err);

  if (err instanceof z.ZodError) {
    return res.status(400).json({ error: err.errors.map((e) => e.message).join(", ") });
  }

  const message = err instanceof Error ? err.message : "Internal server error";
  let status = 500;
  if (message.startsWith("Unsupported file type")) status = 415;
  if (message.includes("File too large")) status = 413;
  if (message.includes("Failed to process file")) status = 422;
  
  console.error(`[${requestId}] responding with status ${status}: ${message}`);
  res.status(status).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`QA bot server listening on http://localhost:${PORT}`);
});
