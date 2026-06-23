import { z } from "zod";

export const PromptTypeEnum = z.enum(["default", "detailed", "concise", "technical"]);
export const ProviderEnum = z.enum(["openai", "anthropic", "groq"]);

export type PromptType = z.infer<typeof PromptTypeEnum>;
export type Provider = z.infer<typeof ProviderEnum>;

export const FileUploadSchema = z.object({
  question: z.string().min(1, "Question is required"),
  promptType: PromptTypeEnum.default("default"),
  provider: ProviderEnum.optional(),
  model: z.string().optional(),
  temperature: z.coerce.number().min(0, "Temperature must be at least 0").max(2, "Temperature cannot exceed 2").optional(),
});

export const InvokeSchema = z.object({
  question: z.string().min(1, "Question is required"),
  documentPath: z.string().optional(),
  documentText: z.string().optional(),
  promptType: PromptTypeEnum.default("default"),
  provider: ProviderEnum.optional(),
  model: z.string().optional(),
  temperature: z.coerce.number().min(0, "Temperature must be at least 0").max(2, "Temperature cannot exceed 2").optional(),
}).refine((data) => !!data.documentPath || !!data.documentText, {
  message: "Either documentPath or documentText is required",
  path: ["documentPath", "documentText"],
});

export type FileUploadBody = z.infer<typeof FileUploadSchema>;
export type InvokeBody = z.infer<typeof InvokeSchema>;

export type InvokeResult = {
  output: string;
  model: string;
  provider: string;
  promptType: PromptType;
};

export type ProviderConfig = {
  provider: Provider;
  available: boolean;
  models: string[];
};
