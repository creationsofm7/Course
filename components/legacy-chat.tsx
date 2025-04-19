"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react"; // Add this import
import { createTestCourse } from "@/app/actions/actions";
// import { prisma } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Link from "next/link";

export default function Chat() {
  const [input, setInput] = useState("");
  // the output is an array of objects, so we need to set the type to unknown[] but type would be defined later
  const [outputs, setOutputs] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/chef", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();

      try {
        await createTestCourse(data.output).then((course) => {
          router.push(`/cooklab/${course.id}`);
        });
      } catch (dbError) {
        console.error("Database Error:", dbError);
      }

      setOutputs([...outputs, data.output]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="m-2 lg:w-[50vw] md:[w-[70vw]] flex flex-row items-center justify-center border-2 rounded-xl p-1 border-black dark:border-white bg-white  dark:bg-gray-800 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1  px-2 py-1 focus:outline-none dark:bg-gray-800 dark:text-white"
          placeholder="Describe your course..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-black text-white rounded-lg hover:bg-orange-600 hover:text-black transition-colors disabled:bg-gray-300 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          <SendHorizonal className="w-4 h-6" />
        </button>
      </form>

      <h2 className="mb-2 mt-2 text-black dark:text-white text-sm font-medium">OR</h2>
      
        <Button disabled className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md transition-all duration-300 hover:shadow-lg border border-blue-500 hover:scale-105">
          Create an Empty Course
        </Button>
      

    </div>
  );
}
