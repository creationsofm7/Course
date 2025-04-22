"use client";
import Chat from "../components/chat";
import HomePage from "@/components/ui/frontpage";

import CourseList from "@/components/courselist";
import UserAvatar from "@/components/useravatar";

import { authClient } from "@/lib/auth-client";

export const runtime = "edge"; // Set runtime to edge for serverless functions
export const preferredRegion = 'home';
export const maxDuration = 30;
export default  function Home() {

  const { data: session} = authClient.useSession();
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
              <UserAvatar />

           
            </div>

            <div className="h-[70vh] justify-center items-center place-content-center text-center flex flex-col gap-4">
              <h1 className="font-semibold text-4xl">You Can Learn Anything</h1>
              <Chat />
            </div>
            <CourseList />
           
          </>
        ) : (
          
          <HomePage />
          
        )}
      </div>
    </div>
  );
}
