"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getCourseWithContent, updateVideo } from "@/app/actions/actions";
import { useParams } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Pen } from "lucide-react";

interface Lesson {
  id: string;
  name: string;
  description: string | null;
  contenturl: string | null;
}

interface Module {
  id: string;
  name: string;
  description: string | null;
  lessons?: Lesson[];
}

interface Course {
  user: string;
  email: string;
  name: string;
  description: string;
  modules?: Module[];
}

interface ActiveLessonData {
  id: string;
  name: string;
  contenturl: string;
  lesson_description?: string;
}

const LessonContext = createContext<{
  activeLesson: ActiveLessonData;
  setActiveLesson: (lessonData: ActiveLessonData) => void;
}>({
  activeLesson: { name: "", contenturl: "", id: "" },
  setActiveLesson: () => {},
});

const OpenContext = createContext<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>({
  isOpen: true,
  setIsOpen: () => {},
});

const OpenNoteContext = createContext<{
  isnotesOpen: boolean;
  setIsnotesOpen: (isOpen: boolean) => void;
}>({
  isnotesOpen: true,
  setIsnotesOpen: () => {},
});

export default function Lab() {
  const courseid = useParams().slug as string;
  const [isOpen, setIsOpen] = useState(true);
  const [isnotesOpen, setIsnotesOpen] = useState(false);

  const [activeLesson, setActiveLesson] = useState<ActiveLessonData>({
    id: "",
    name: "",
    contenturl: "",
    lesson_description: "",
  });

  const [course, setCourse] = useState<Course>({
    user: "",
    email: "",
    name: "",
    description: "",
  });

  useEffect(() => {
    getCourseWithContent(courseid).then((courseData) => {
      // Map the API response to match the Course interface
      const formattedCourse: Course = {
        user: courseData.User?.name || "",
        email: courseData.User?.email || "",
        name: courseData.name || "",
        description: courseData.description || "",
        modules: courseData.modules?.map(module => ({
          ...module,
          description: module.description || "",
          lessons: module.lessons?.map(lesson => ({
            ...lesson,
            description: lesson.description || "",
            contenturl: lesson.contenturl || ""
          }))
        }))
      };
      setCourse(formattedCourse);
    });
  }, [courseid]);

  return (
    <div className="h-full w-full overflow-hidden">
      <LessonContext.Provider value={{ activeLesson, setActiveLesson }}>
        <div className="fixed top-0 left-0 right-0 flex items-center px-6 py-4 w-full bg-black shadow-sm z-10 text-white gap-2">
          <Link href="/">
            <h1 className="text-xl font-bold ">CookLab</h1>
          </Link>
          <span className="text-xl font-normal">|</span>
          <h1 className="text-xl font-light">{course.name}</h1>
        </div>
        <div className="pt-[3.2rem]"></div>
        <OpenContext.Provider value={{ isOpen, setIsOpen }}>
          <OpenNoteContext.Provider value={{ isnotesOpen, setIsnotesOpen }}>
            <div className="flex">
              <CourseList {...course} />
              <Notebar />
            </div>
          </OpenNoteContext.Provider>

          <div className="flex flex-row  w-full">
            <div
              className={`flex flex-col  ${isOpen ? "w-9/12" : "w-full"}
              
              h-full`}
            >
              <Tabs defaultValue="video" className="">
                <TabsContent value="video">
                  {/* <VidPlay videoid={activeLesson.contenturl} /> */}
                  <div className="flex flex-col items-center justify-center border-2 h-[80vh]">
                    {!activeLesson.id ? (
                      <div className="flex flex-col items-center justify-center h-full w-full p-4">
                        <h3 className="text-lg font-medium mb-2 text-gray-700">
                          Please select a lesson to start
                        </h3>
                      </div>
                    ) : !activeLesson.contenturl ? (
                      <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-gradient-to-br from-slate-50 to-gray-100">
                        <form
                          className="flex flex-col gap-5 w-full max-w-md p-8 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl border border-gray-800/30 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                          action={async (FormData: FormData) => {
                            const videoId = FormData.get("videoId") as string;
                            if (videoId) {
                              await updateVideo(activeLesson.id, videoId);
                              setActiveLesson({
                                ...activeLesson,
                                contenturl: videoId,
                              });
                            }
                          }}
                        >
                          <h3 className="text-white text-xl font-semibold mb-3 tracking-tight">
                            Add YouTube Video for <span className="text-blue-400 font-bold">{activeLesson.name}</span>
                          </h3>

                          <div className="flex flex-col sm:flex-row gap-3 w-full">
                            <input
                              type="text"
                              name="videoId"
                              className="flex-1 p-4 rounded-lg border border-gray-700/50 bg-gray-800/80 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-inner outline-none"
                              placeholder="Enter YouTube video ID (e.g., dQw4w9WgXcQ)"
                            />
                            <button
                              type="submit"
                              className="px-5 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                            >
                              <svg
                                className="w-5 h-5 mr-2 animate-pulse"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                              </svg>
                              Add Video
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <iframe
                        key={activeLesson.contenturl}
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${activeLesson.contenturl}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="Notes">
                  <div className="flex flex-col items-center justify-center  border-2 h-[80vh]">
                    Get the video summary here if user wants
                  </div>
                </TabsContent>
                <TabsContent value="Documents">
                  <div className="flex flex-col items-center justify-center border-2 h-[80vh]">
                    Upload relevant douments here to perform actions such as
                    asking questions about the documents and summarising them or
                    atleast keeping them in one place.
                  </div>
                </TabsContent>
                <TabsList className="w-full">
                  <TabsTrigger value="video" className="w-full">
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="Notes" className="w-full">
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="Documents" className="w-full">
                    Documents
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <h2 className="p-4 text-xl font-semibold">{activeLesson.name}</h2>
                <div className="px-4 py-2 space-y-2">
                {activeLesson.lesson_description && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                  {activeLesson.lesson_description}
                  </p>
                )}
                {activeLesson.contenturl && (
                  <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    Video ID: {activeLesson.contenturl}
                  </span>
                  </div>
                )}
                </div>
            </div>
          </div>
        </OpenContext.Provider>
      </LessonContext.Provider>
    </div>
  );
}

function CourseList(course: Course) {
  const { setActiveLesson } = useContext(LessonContext);
  const { isOpen, setIsOpen } = useContext(OpenContext);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-0 top-16 bg-black text-white p-2 rounded-l-md z-20"
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 overflow-y-auto top-14 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "w-[95%] sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-3/12" : "w-0 opacity-0"
        }`}
      >
        <h3 className="p-4 font-bold text-xl border text-black border-b-black border-b-2">
          Modules
        </h3>
        {!course.modules?.length ? (
          <div className="bg-white p-8 text-center">
            <p className="text-gray-600 text-lg">No content here yet</p>
          </div>
        ) : (
          <div className="grid">
            {course.modules.map((module, index) => (
              <div key={module.id} className="custom-scroll">
                <Accordion
                  type="single"
                  collapsible
                  defaultValue={index === 0 ? `module-${module.id}` : undefined}
                >
                  <AccordionItem value={`module-${module.id}`}>
                    <AccordionTrigger className="p-4 text-xl text-black font-normal focus:no-underline">
                      {module.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      {!module.lessons?.length ? (
                        <div className="p-2 text-center">
                          <p className="text-gray-600">
                            No lessons available yet
                          </p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {module.lessons.map((lesson) => (
                            <li
                              key={lesson.id}
                              className="p-4 hover:bg-gray-50 transition-colors duration-150"
                            >
                              <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                  <svg
                                    className="w-5 h-5 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                                <div className="ml-4 flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {lesson.name}
                                  </h3>

                                  <button
                                    onClick={() => {
                                      setActiveLesson({
                                        id: lesson.id,
                                        name: lesson.name,
                                        contenturl: lesson.contenturl || "",
                                        lesson_description: lesson.description || "",
                                      });
                                    }}
                                    className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                                  >
                                    Start Lesson
                                    <svg
                                      className="ml-1 w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Notebar() {
  const { activeLesson } = useContext(LessonContext);
  const { isnotesOpen, setIsnotesOpen } = useContext(OpenNoteContext);

  const notehandler = () => {
    console.log(activeLesson.name);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsnotesOpen(!isnotesOpen)}
        className={`fixed right-0 top-32  text-white p-2 rounded-l-md z-20 ${
          isnotesOpen ? "bg-red-600" : "bg-black"
        }`}
        aria-label={isnotesOpen ? "Close sidebar" : "Open sidebar"}
      >
        <Pen size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed right-0 overflow-y-auto top-28 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isnotesOpen ? "w-3/12" : "w-0 opacity-0"
        }`}
      >
        <h3 className="p-4 font-bold text-xl text-black border border-b-black border-b-2">
          Take Notes here
        </h3>
        <form className="flex flex-col gap-4 p-4" action={notehandler}>
          <input
            type="text"
            className="p-4 w-full h-[calc(40vh-4rem)]"
            placeholder="Write your notes here"
          />
          <button
            type="submit"
            className="bg-black text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
