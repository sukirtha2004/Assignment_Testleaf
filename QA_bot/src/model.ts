import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

export type ModelInfo = {
  provider: string;
  model: string;
  temperature: number;
  maxTokens: number;
};

const modelCache = new Map<string, any>();

export function createModel(providerOverride?: string, modelOverride?: string, temperatureOverride?: number): any {
  const provider = (providerOverride ?? process.env.MODEL_PROVIDER ?? "openai").toLowerCase();
  const temperature = temperatureOverride ?? Number(process.env.TEMPERATURE ?? 0.1);
  const maxTokens = Number(process.env.MAX_TOKENS ?? 4096);
  const cacheKey = `${provider}:${modelOverride || "default"}:${temperature}`;

  if (modelCache.has(cacheKey)) {
    return modelCache.get(cacheKey);
  }

  if (Number.isNaN(temperature) || temperature < 0 || temperature > 2) {
    throw new Error("TEMPERATURE must be a number between 0 and 2");
  }

  if (Number.isNaN(maxTokens) || maxTokens <= 0) {
    throw new Error("MAX_TOKENS must be a positive number");
  }

  let model: any;

  switch (provider) {
    case "openai": {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("OPENAI_API_KEY is required for openai provider");
      model = new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: modelOverride ?? process.env.OPENAI_MODEL ?? "gpt-4",
        temperature,
        maxTokens,
      });
      break;
    }
    case "anthropic": {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error("ANTHROPIC_API_KEY is required for anthropic provider");
      model = new ChatAnthropic({
        anthropicApiKey: apiKey,
        modelName: modelOverride ?? process.env.ANTHROPIC_MODEL ?? "claude-3",
        temperature,
        maxTokens,
      });
      break;
    }
    case "groq": {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) throw new Error("GROQ_API_KEY is required for groq provider");
      model = new ChatGroq({
        apiKey,
        modelName: modelOverride ?? process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
        temperature,
        maxTokens,
      });
      break;
    }
    default:
      throw new Error(`Unsupported MODEL_PROVIDER: ${provider}`);
  }

  modelCache.set(cacheKey, model);
  return model;
}

export function getModelInfo(providerOverride?: string, modelOverride?: string, temperatureOverride?: number): ModelInfo {
  const provider = (providerOverride ?? process.env.MODEL_PROVIDER ?? "openai").toLowerCase();
  const model =
    modelOverride ??
    (provider === "openai"
      ? process.env.OPENAI_MODEL ?? "gpt-4"
      : provider === "anthropic"
      ? process.env.ANTHROPIC_MODEL ?? "claude-3"
      : provider === "groq"
      ? process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile"
      : "unknown");
  const temperature = temperatureOverride ?? Number(process.env.TEMPERATURE ?? 0.1);

  return {
    provider,
    model,
    temperature,
    maxTokens: Number(process.env.MAX_TOKENS ?? 4096),
  };
}

export function getAvailableProviders() {
  const providers: Array<{ provider: string; available: boolean; models: string[] }> = [];

  if (process.env.OPENAI_API_KEY) {
    providers.push({
      provider: "openai",
      available: true,
      models: ["gpt-4", "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo"],
    });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    providers.push({
      provider: "anthropic",
      available: true,
      models: ["claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-sonnet-20240229"],
    });
  }

  if (process.env.GROQ_API_KEY) {
    providers.push({
      provider: "groq",
      available: true,
      models: ["llama-3.3-70b-versatile", "qwen/qwen3-32b", "llama-3.3-70b-versatile","llama-3.1-8b-instant","openai/gpt-oss-120b"],
    });
  }

  return providers;
}
