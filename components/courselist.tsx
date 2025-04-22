"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CourseFetchTest from "@/components/coursefetchtest";

interface ICourse {
  id: string;
  name: string;
  description: string | null;
  userId: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CourseList() {
  const [data, setData] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await fetch("/api/courses");
      if (res.ok) {
        const courses = await res.json();
        setData(courses);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <h2 className="text-center text-2xl font-semibold">Your Courses</h2>
      <div className="m-6 grid lg:grid-cols-3 md:grid-cols-2 gap-4 ">
        {loading ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="col-span-3 text-center py-8">
            <p className="text-gray-500">
              Use the search bar to create a course in seconds
            </p>
          </div>
        ) : (
          data.map((course: ICourse) => (
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
  );
}
