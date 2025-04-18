import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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

export async function POST(req: NextRequest) {
  try {
    const data: CourseData = await req.json();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const course = await prisma.course.create({
      data: {
        name: data.name,
        description: data.description,
        userId: session.user.id,
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

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}