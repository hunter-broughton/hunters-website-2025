import { NextRequest, NextResponse } from "next/server";

// For static exports, we need to hardcode the production URL
const CHATBOT_API_URL =
  process.env.NODE_ENV === "production"
    ? "https://hunters-website-2025-production.up.railway.app"
    : process.env.CHATBOT_API_URL || "http://localhost:8000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Debug logging
    console.log("CHATBOT_API_URL:", CHATBOT_API_URL);
    console.log("NODE_ENV:", process.env.NODE_ENV);

    // Validate request body
    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Forward request to Python chatbot API
    const response = await fetch(`${CHATBOT_API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: body.message,
        conversation_id: body.conversation_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Chatbot API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);

    // Return a fallback response
    return NextResponse.json({
      response:
        "I'm sorry, I'm currently offline. Please explore Hunter's portfolio directly or try contacting him through the links in the contact section!",
      sources: [],
      conversation_id: `fallback-${Date.now()}`,
      timestamp: new Date().toISOString(),
      confidence: 0.0,
      suggested_questions: [
        "Check out Hunter's projects section",
        "Visit Hunter's skills constellation",
        "Go to the contact page",
      ],
    });
  }
}

export async function GET() {
  try {
    // Health check endpoint
    const response = await fetch(`${CHATBOT_API_URL}/`);

    if (!response.ok) {
      throw new Error("Chatbot API is not available");
    }

    const data = await response.json();
    return NextResponse.json({
      status: "online",
      chatbot_status: data.status,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      status: "offline",
      error: "Chatbot API is not available",
      timestamp: new Date().toISOString(),
    });
  }
}
