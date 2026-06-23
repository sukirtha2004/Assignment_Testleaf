import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import { parse as parseCsv } from "csv-parse/sync";

const txtWarningSize = 1_000_000;

export async function loadDocument(filePath: string): Promise<string> {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".pdf":
      return loadPdf(filePath);
    case ".docx":
      return loadDocx(filePath);
    case ".csv":
      return loadCsv(filePath);
    case ".txt":
      return loadTxt(filePath);
    default:
      throw new Error(`Unsupported file type: ${extension}`);
  }
}

async function loadPdf(filePath: string): Promise<string> {
  const data = await fs.readFile(filePath);
  const parsed = await pdfParse(data);
  const pages = parsed.text.split("\f").map((page: string, idx: number) => `[Page ${idx + 1}]\n${page.trim()}`);
  return pages.filter(Boolean).join("\n---\n");
}

async function loadDocx(filePath: string): Promise<string> {
  const { value } = await mammoth.extractRawText({ path: filePath });
  const paragraphs = value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return paragraphs.join("\n\n");
}

async function loadCsv(filePath: string): Promise<string> {
  const raw = await fs.readFile(filePath, "utf8");
  const records = parseCsv(raw, { columns: false, skip_empty_lines: true });
  const rows = Array.isArray(records)
    ? records.map((row, idx) => `[Row ${idx + 1}] ${Array.isArray(row) ? row.join(", ") : JSON.stringify(row)}`)
    : [];
  return rows.join("\n---\n");
}

async function loadTxt(filePath: string): Promise<string> {
  const stats = await fs.stat(filePath);
  if (stats.size > txtWarningSize) {
    console.warn(`Warning: TXT file ${filePath} is larger than 1MB (${stats.size} bytes)`);
  }
  return fs.readFile(filePath, "utf8");
}
