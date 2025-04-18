// "use client";

// import { useState, useEffect } from "react";
// import { searchVideos } from "../app/actions/actions";
// import { PlusIcon } from "lucide-react";

// export default function Video_rec(Topic_name: { Topic_name: string }) {
//   const [data, setData] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     console.log(Topic_name.Topic_name);
//     searchVideos(Topic_name.Topic_name)
//       .then((res) => {
//         if (Array.isArray(res.items)) {
//           setData(res.items);
//         } else {
//           console.error("Expected array from searchVideos, got:", res);
//           setData([]);
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching videos:", error);
//         setData([]);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   }, [Topic_name]);

//   return (
//     <>
//       <div>
//         <div className="flex flex-row gap-2">
//           {isLoading ? (
//             <div>Loading videos...</div>
//           ) : Array.isArray(data) && data.length > 0 ? (
//             <>
//               {data.map((video) => (
//                 <div
//                   key={video.id?.videoId}
//                   onClick={() => {
//                     console.log(video.id?.videoId);
//                   }}
//                 >
//                   <img
//                     className="h-18 w-24 hover:[h-26 w-32] "
//                     src={video.snippet?.thumbnails?.high?.url}
//                     alt={video.snippet?.title || "Video thumbnail"}
//                   />
//                 </div>
//               ))}
//               <div className="h-18 w-24 border-2 border-dashed border-blue-400 flex items-center justify-center hover:[transform scale-130] cursor-pointer">
//                 <PlusIcon className="h-18 w-24" />
//               </div>
//             </>
//           ) : (
//             <div>No videos found</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }