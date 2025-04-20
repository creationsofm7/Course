"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';



export async function changeTheme() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  await prisma.user
    .update({
      where: {
        id: session?.user.id,
      },
      data: {
        DarkMode: !session?.user.DarkMode,
      },
    })
}


interface Lesson {
  name: string;
  description: string;
  contenturl?: string;
}

interface Module {
  name: string;
  description: string;
  lessons: Lesson[];
}

interface CourseData {
  name: string;
  description: string;
  modules: Module[];
}

export async function createTestCourse(data: CourseData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  

  const course = await prisma.course.create({
    data: {
      name: data.name,
      description: data.description,
      userId: session?.user.id,
      modules: {
        create: data.modules.map((module: Module) => ({
          name: module.name,
          description: module.description,
          lessons: {
            create: module.lessons,
            
          },
        })),
      },
    },
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  });

  return course;
}

export async function getCourseWithContent(courseId: string) {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        User: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!course) {
      throw new Error('Course not found');
    }

    return course;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
}

export const updateVideo = async ( lessonid: string, contenturl: string )  => {
 

  const course = await prisma.lesson.update({
    where: {
      id: lessonid,
    },
    data: {
      contenturl: contenturl,
    },
  });
  return course;
}







const API_KEY = process.env.YOUTUBE_KEY ; // Replace with your actual API key

export const searchVideos = async (query: string) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=3&q=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error("Error fetching video search results");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};








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
      model: openai('gpt-4.1-mini'),
      system: "Create a structured course outline based on user input. Include fully developed modules and lessons, covering beginner to advanced levels unless specified otherwise. Take the user's topic and requirements. Build distinct modules with at least one detailed, relevant lesson each. Ensure content is informative, coherent, and logically organized. Avoid empty or underdeveloped entries. Return a clear, hierarchical outline listing modules and their lessons.",
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


