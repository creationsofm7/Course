import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const lessonSchema = z.object({
  name: z.string().describe("Name of the lesson"),
  description: z.string().optional().describe("Concise description of what the lesson covers in a short format and its application in practical world in a 40 to 80 words"),
  searchterm: z.string().optional().describe("Search words to find the videos related to the lesson on youtube and google"),
});

const moduleSchema = z.object({
  name: z.string().describe("Name of the module"),
  lessons: z.array(lessonSchema).describe("Collection of lessons within this module (minimum four lessons)"),
});

const courseSchema = z.object({
  name: z.string().describe("Title of the course"),
  modules: z.array(moduleSchema).describe("Collection of modules that make up the course minimum 5 upto 9 according to the course"),
  description: z.string().describe("Description of the course in 50 to 100 words"),
});

export async function* runAgent(userInput: string) {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-4.1-mini",
    temperature: 1,
    maxTokens: 1571,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    streaming: true,
  });

  const structuredLlm = chatModel.withStructuredOutput(courseSchema);

  const stream = await structuredLlm.stream(userInput);
  for await (const chunk of stream) {
    yield chunk;
  }
}
