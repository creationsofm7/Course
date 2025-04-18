"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { createTestCourse } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Chat() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setCourseData(null);
    
    try {
      const res = await fetch("/api/chef", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setCourseData(data.output);
      setOutputs([...outputs, data.output]);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    if (!courseData) return;
    
    setIsCreating(true);
    try {
      const course = await createTestCourse(courseData);
      router.push(`/cooklab/${course.id}`);
    } catch (dbError) {
      console.error("Database Error:", dbError);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="m-2 lg:w-[50vw] md:[w-[70vw]] flex flex-row items-center justify-center border-2 rounded-xl p-1 border-black dark:border-white bg-white dark:bg-gray-800 shadow-md"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-2 py-1 focus:outline-none dark:bg-gray-800 dark:text-white"
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
      
      {courseData && (
        <div className="mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">{courseData.name}</h2>
            {courseData.description && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">{courseData.description}</p>
            )}
            
            <Button
              onClick={handleCreateCourse}
              disabled={isCreating}
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Course...
                </>
              ) : (
                "Create This Course"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}