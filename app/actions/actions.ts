"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";



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



