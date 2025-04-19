import React from "react";

export default function VideoIdInput(): React.JSX.Element {
  return (
    <div className="relative w-full">
      <input
        type="text"
        name="videoId"
        placeholder="Paste any YouTube URL or video ID"
        className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white border border-gray-300"
        onChange={(e) => {
          const input = e.target.value.trim();

          // Extract YouTube video ID if this is a URL
          if (input.includes("youtube.com") || input.includes("youtu.be")) {
            // Handle different YouTube URL formats
            const patterns = [
              // Standard youtube.com/watch?v=VIDEO_ID
              /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=([^&]+))(?:\S+)?/,
              // Short youtu.be/VIDEO_ID
              /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&/]+)/,
              // Embed youtube.com/embed/VIDEO_ID
              /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&/]+)/,
              // YouTube shorts youtube.com/shorts/VIDEO_ID
              /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&/]+)/,
              // v=VIDEO_ID in query string (catch-all for weird formats)
              /(?:https?:\/\/)?(?:\S+)?[?&]v=([^&]+)(?:\S+)?/,
            ];

            // Try each pattern until we find a match
            for (const pattern of patterns) {
              const match = input.match(pattern);
              if (match && match[1]) {
                // Set the value to just the extracted video ID
                e.target.value = match[1];
                break;
              }
            }
          }
        }}
        required
      />
    
    </div>
  );
}
