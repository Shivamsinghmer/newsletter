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

    await connectDB();

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
    console.error("Subscription error:", error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again later." },
      { status: 500 }
    );
  }
}
