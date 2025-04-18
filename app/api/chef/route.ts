import { NextResponse } from "next/server";
import { runAgent } from "../../../lib/chef";

export async function POST(req: Request) {
  try {
    const { userInput } = await req.json();
    const response = await runAgent(userInput);
    return NextResponse.json({ output: response });
  } catch (error) {
    console.error("Agent Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
