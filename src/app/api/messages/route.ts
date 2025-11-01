import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models/message";

export async function GET() {
  try {
    await connectToDatabase();

    const messages = await Message.find().sort({ timestamp: -1 }).limit(100).lean();

    const formattedMessages = messages.map((msg) => ({
      id: msg._id.toString(),
      username: msg.username,
      message: msg.message,
      timestamp: msg.timestamp,
    }));

    return NextResponse.json({ messages: formattedMessages.reverse() }, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { username, message } = body;

    if (!username || typeof username !== "string" || !username.trim()) {
      return NextResponse.json(
        { error: "Username is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    if (username.trim().length > 50) {
      return NextResponse.json(
        { error: "Username cannot exceed 50 characters" },
        { status: 400 }
      );
    }

    if (message.trim().length > 1000) {
      return NextResponse.json(
        { error: "Message cannot exceed 1000 characters" },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      username: username.trim(),
      message: message.trim(),
      timestamp: new Date(),
    });

    const savedMessage = await newMessage.save();

    return NextResponse.json(
      {
        id: savedMessage._id.toString(),
        username: savedMessage.username,
        message: savedMessage.message,
        timestamp: savedMessage.timestamp,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

