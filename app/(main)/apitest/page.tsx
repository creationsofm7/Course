// "use client";

// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Loader2, SendHorizonal } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import axios from "axios";
// import { fetchEventSource } from "@microsoft/fetch-event-source";

// interface Course {
//   name: string;
//   description: string;
//   modules: Module[];
// }

// interface Module {
//   name: string;
//   lessons: Lesson[];
// }

// interface Lesson {
//   name: string;
//   description?: string;
//   searchterm?: string;
// }

// export const runtime = "edge";
// export const preferredRegion = "home";
// export const maxDuration = 60;

// export default function Home() {
//   const [generation, setGeneration] = useState<Course | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [prompt, setPrompt] = useState("");
//   const [error, setError] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const router = useRouter();
//   const modalContentRef = useRef<HTMLDivElement>(null);
//   const [cpholder, setCpholder] = useState<string>("Create a course on Control Systems");

//   const placeholders = [
//     "Create a course on AI in Healthcare",
//     "Generate a course outline for Web Development",
//     "Design a course on Data Science and Machine Learning",
//     "Outline a course on Digital Marketing Strategies",
//     "Create a course on Blockchain Technology",
//   ];

//   useEffect(() => {
//     let current = 0;
//     const interval = setInterval(() => {
//       setCpholder(placeholders[current]);
//       current = (current + 1) % placeholders.length;
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [placeholders]);

//   // Auto-scroll modal content when generation updates.
//   useEffect(() => {
//     if (modalContentRef.current && generation) {
//       modalContentRef.current.scrollTop = modalContentRef.current.scrollHeight;
//     }
//   }, [generation]);

//   // Scroll back to top when generation is complete.
//   useEffect(() => {
//     if (!isLoading && isSaving) {
//       setTimeout(() => {
//         if (modalContentRef.current) {
//           modalContentRef.current.scrollTop = 0;
//         }
//       }, 0);
//     }
//   }, [isLoading, isSaving]);

//   const handleGenerate = async () => {
//     setIsLoading(true);
//     setGeneration(null);
//     setError("");
//     setModalOpen(true);
//     let finalCourse: Course | null = null;

//     await fetchEventSource("/api/chef", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userInput: prompt }),
//       onmessage(ev) {
//         if (ev.data === "[DONE]") {
//           // Streaming is complete
//           setIsLoading(false);
//           if (finalCourse) {
//             // Save the final object to the DB and then redirect.
//             setIsSaving(true);
//             axios
//               .post("/api/createcourseapi", finalCourse)
//               .then((response) => {
//                 const course = response.data;
//                 router.push(`/cooklab/${course.id}`);
//               })
//               .catch((dbError) => {
//                 console.error("Database Error:", dbError);
//                 setError("Failed to save course to database. Please try again.");
//                 setIsSaving(false);
//               });
//           }
//           return;
//         }
//         if (ev.data.startsWith("[ERROR]")) {
//           console.error(ev.data);
//           setError(ev.data);
//           setIsLoading(false);
//           return;
//         }
//         try {
//           // Each event data is a JSON string representing a partial update.
//           const chunk: Course = JSON.parse(ev.data);
//           finalCourse = chunk;
//           setGeneration(chunk);
//         } catch (err) {
//           console.error("Failed to parse chunk", err);
//         }
//       },
//       onerror(err) {
//         console.error("Streaming error:", err);
//         setError("Streaming error. Please try again.");
//         setIsLoading(false);
//       },
//     });
//   };

//   const renderCourseStructure = () => (
//     <div className="space-y-4">
//       <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-900 mb-2">
//           {generation?.name}
//         </h2>
//         <p className="text-gray-700">{generation?.description}</p>
//       </div>

//       <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
//         Course Modules
//       </h3>
//       {generation?.modules &&
//         generation.modules.map((module: Module, index: number) => (
//           <Accordion
//             key={index}
//             type="multiple"
//             defaultValue={[`module-${index}`]}
//             className="border border-muted rounded-lg mb-4"
//           >
//             <AccordionItem value={`module-${index}`} className="border-0">
//               <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 text-lg font-medium">
//                 Module {index + 1}: {module.name}
//               </AccordionTrigger>
//               <AccordionContent className="bg-background/80">
//                 <div className="px-4 pb-3">
//                   <h4 className="font-medium text-gray-700 mb-2">Lessons:</h4>
//                   <ul className="space-y-3">
//                     {module.lessons &&
//                       module.lessons.map((lesson: Lesson, lessonIndex: number) => (
//                         <li
//                           key={lessonIndex}
//                           className="bg-white p-3 rounded-md border border-gray-100 shadow-sm"
//                         >
//                           <h5 className="font-medium text-gray-900">
//                             {lesson.name}
//                           </h5>
//                           {lesson.description && (
//                             <p className="text-gray-600 text-sm mt-1">
//                               {lesson.description}
//                             </p>
//                           )}
//                           {lesson.searchterm && (
//                             <div className="mt-2">
//                               <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
//                                 {lesson.searchterm}
//                               </span>
//                             </div>
//                           )}
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//         ))}
//     </div>
//   );

//   return (
//     <div className="container mx-auto p-3 max-w-4xl">
//       <div className="">
//         <div className="m-2 lg:w-[50vw] md:[w-[70vw]] flex flex-row items-center justify-center border-2 rounded-xl p-1 border-black dark:border-white bg-white dark:bg-gray-800 shadow-md">
//           <input
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             className="flex-1 px-2 py-1 focus:outline-none dark:bg-gray-800 dark:text-white"
//             placeholder={cpholder}
//           />
//           <button
//             onClick={handleGenerate}
//             disabled={isLoading || !prompt.trim()}
//             className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-5 py-3 rounded-lg hover:opacity-90 transition-all duration-200 font-medium flex items-center justify-center disabled:opacity-50"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                 Generating Course...
//               </>
//             ) : (
//               <SendHorizonal className="w-4 h-6" />
//             )}
//           </button>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
//           {error}
//         </div>
//       )}

//       <Dialog open={modalOpen} onOpenChange={setModalOpen}>
//         <DialogContent
//           className="max-w-3xl max-h-[90vh] overflow-y-auto"
//           ref={modalContentRef}
//         >
//           <DialogHeader>
//             <DialogTitle>
//               {generation ? generation.name : "Generating Course Structure"}
//             </DialogTitle>
//             <DialogDescription>
//               {isLoading
//                 ? "Creating your custom course..."
//                 : isSaving
//                 ? "Saving course to your library..."
//                 : "Your custom course structure is ready"}
//             </DialogDescription>
//           </DialogHeader>

//           <div className="mt-4">
//             {isLoading && !generation && (
//               <div className="flex justify-center items-center h-32">
//                 <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
//               </div>
//             )}

//             {isSaving && generation && (
//               <div className="flex justify-center items-center py-3 bg-amber-50 rounded-lg mb-4">
//                 <Loader2 className="h-5 w-5 animate-spin text-amber-600 mr-2" />
//                 <span className="text-amber-700">
//                   Saving your course...
//                 </span>
//               </div>
//             )}

//             {generation && renderCourseStructure()}
//           </div>
//         </DialogContent>
//       </Dialog>

//       {!isLoading && !generation && (
//         <div className="flex flex-col items-center justify-center h-64 text-center border border-muted rounded-lg">
//           <p className="text-gray-500">
//             Enter a topic and click &quot;Generate Course Structure&quot; to create a course outline.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


function Page() {
  return (
    <div className="container mx-auto p-3 max-w-4xl">
      <h1 className="text-2xl font-bold">API Test Page</h1>
      <p>This is a test page for API integration.</p>
    </div>
  );
}
export default Page;