import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide a name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    default: "Not Specified",
  },
  topics: {
    type: [String],
    default: [],
  },
  source: {
    type: String,
    default: "unknown",
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
