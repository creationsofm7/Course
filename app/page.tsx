

import { auth } from "../lib/auth"; // path to your Better Auth server instance
import { headers } from "next/headers";
import Link from "next/link";
import SignoutButton from "./signin/signout";
import { prisma } from "../lib/prisma";
import CourseFetchTest from "@/components/coursefetchtest";
import Chat from "../components/chat";
import HomePage from "@/components/ui/frontpage";


import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface ICourse {
  id: string;
  name: string;
  description: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.course.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className={`h-full flex flex-col items-center justify-center w-full `}>
      <div className=" w-full">
        {session ? (
          <>
            <div className="items-center gap-2 text-center flex justify-between p-4 m-2 ">
              <div className="flex flex-row gap-2">
                <p className="text-gray-600 text-xl ">Welcome</p>
                <p className="text-xl font-bold">{session.user.name}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {session.user.image ? (
                    <Image src={session.user.image} alt="User" width={40} height={40} className="rounded-full cursor-pointer" />
                  ) : (
                    <CircleUserRound size={28} className="cursor-pointer" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-28 mr-5">
                  <DropdownMenuLabel>
                    {" "}
                    <Link
                      href="/settings"
                      className="text-indigo-600 hover:underline"
                    >
                      Settings
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <SignoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="h-[70vh] justify-center items-center place-content-center text-center flex flex-col gap-4">
              <h1 className="font-semibold text-4xl">You Can Learn Anything</h1>
              <Chat />
            </div>
            <h2 className="text-center text-2xl font-semibold">Your Courses</h2>
            <div className="m-6 grid lg:grid-cols-3 md:grid-cols-2 gap-4 ">
              {data.length === 0 ? (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">
                    Use the search bar to create a course in seconds
                  </p>
                </div>
              ) : (
                data.map((course: ICourse ) => (
                    <div
                    key={course.id}
                    className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                    <div className="mb-4">
                      <CourseFetchTest
                      courseid={course.id}
                      courseName={course.name}
                      />
                      {course.description && (
                      <p className="text-sm text-gray-700 line-clamp-3 mt-2">
                        {course.description}
                      </p>
                      )}
                    </div>
                    <div className="mt-auto">
                      <Link 
                      href={`/cooklab/${course.id}`}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                      Continue learning →
                      </Link>
                    </div>
                    </div>
                ))
              )}
            </div>
          </>
        ) : (
          
          <HomePage />
          
        )}
      </div>
    </div>
  );
}
