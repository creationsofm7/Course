import { NextRequest } from "next/server";
import { runAgent } from "../../../lib/chef";

export async function POST(req: NextRequest) {
  const { userInput } = await req.json();

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of runAgent(userInput)) {
          const data = JSON.stringify(chunk);
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        controller.enqueue(encoder.encode(`data: [ERROR] ${errorMessage}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
