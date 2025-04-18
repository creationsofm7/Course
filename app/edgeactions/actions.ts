export const runtime = "edge";
export const preferredRegion = 'home'
export const maxDuration = 60

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

const lessonSchema = z.object({
  name: z.string().describe("Name of the lesson"),
  description: z.string().optional().describe("Concise description of what the lesson covers in a short format and its application in practical world in a 40 to 80 words"),
  searchterm: z.string().optional().describe("Search words to find the videos related to the lesson on youtube and google"),
});

const moduleSchema = z.object({
  name: z.string().describe("Name of the module"),
  lessons: z.array(lessonSchema).describe("Collection of lessons within this module (minimum four lessons)")
});

const courseSchema = z.object({
  name: z.string().describe("Title of the course"),
  modules: z.array(moduleSchema).describe("Collection of modules that make up the course minimum 5 upto 9 according to the course"),
  description: z.string().describe("Description of the course in 50 to 100 words"),
});

export async function generate(input: string) {
  'use server';

  

  const stream = createStreamableValue();

  (async () => {
    const { partialObjectStream } = streamObject({
      model: openai('gpt-4o-mini'),
      system: 'You generate course content with modules and lessons based on the user input. you never create empty modules or lessons',
      prompt: input,
      schema: courseSchema,
    });

    for await (const partialObject of partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return { object: stream.value };
}