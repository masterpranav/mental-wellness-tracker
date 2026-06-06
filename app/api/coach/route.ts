import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const body =
    await request.json();

  const apiKey =
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      error:
        "Missing Gemini API key",
    });
  }

  return NextResponse.json({
    advice:
      "AI coaching placeholder",
  });
}