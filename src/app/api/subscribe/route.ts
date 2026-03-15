import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, role, topics, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    try {
      await connectDB();
    } catch (connError: any) {
      console.error("MongoDB Connection Error:", connError.message);
      return NextResponse.json(
        { error: "Database connection failed. Please ensure environment variables are set." },
        { status: 500 }
      );
    }

    // Check if subscriber already exists
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      // Update existing subscriber topics if they are adding more
      existingSubscriber.topics = Array.from(new Set([...existingSubscriber.topics, ...topics]));
      await existingSubscriber.save();
      
      return NextResponse.json(
        { message: "Subscription updated successfully", subscriber: existingSubscriber },
        { status: 200 }
      );
    }

    // Create new subscriber
    const newSubscriber = await Subscriber.create({
      fullName,
      email,
      role,
      topics,
      source,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Subscribed successfully", subscriber: newSubscriber },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Subscription API execution error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
