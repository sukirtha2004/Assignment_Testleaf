import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { createModel } from "./model";
import { PromptType } from "./types";

const chainCache = new Map<string, LLMChain>();

const systemInstructions: Record<PromptType, string> = {
  default: "You are a document analysis assistant. Answer questions accurately using only the information from the provided document. Cite sections when helpful.",
  detailed: "Provide a comprehensive analysis. Include context, relevant details, and caveats from the document content.",
  concise: "Answer briefly and directly. Keep the response short and focused on the question.",
  technical: "Respond with a technical and precise explanation. Use industry terminology and explain details clearly.",
};

export function buildChain(promptType: PromptType, providerOverride?: string, modelOverride?: string, temperatureOverride?: number) {
  const cacheKey = `${promptType}:${providerOverride || "default"}:${modelOverride || "default"}:${temperatureOverride || "default"}`;
  const cached = chainCache.get(cacheKey);
  if (cached) return cached;

  const model = createModel(providerOverride, modelOverride, temperatureOverride);
  const prompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(systemInstructions[promptType]),
    HumanMessagePromptTemplate.fromTemplate("Document:\n{document}\n\nQuestion:\n{question}"),
  ]);

  const chain = new LLMChain({ llm: model, prompt });
  chainCache.set(cacheKey, chain);
  return chain;
}

export async function runChain(promptType: PromptType, document: string, question: string, providerOverride?: string, modelOverride?: string, temperatureOverride?: number) {
  const chain = buildChain(promptType, providerOverride, modelOverride, temperatureOverride);
  const result = await chain.call({ document, question });
  return String(result?.text ?? "");
}
