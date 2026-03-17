import axios from "axios";
import { useState } from "react";
import { SubscribePayload } from "@/types/newsletter";

export function useSubscribe() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (payload: SubscribePayload) => {
    setLoading(true);
    setError(null);
    try {
      // Call our local MongoDB backend
      const response = await axios.post("/api/subscribe", payload);
      
      // Call n8n webhook
      if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
        try {
          // Sending the full payload which includes fullName and email as requested
          await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
            name: payload.fullName,
            email: payload.email,
          });
        } catch (n8nErr) {
          console.error("n8n sync failed:", n8nErr);
        }
      }
      
      setSuccess(true);
    } catch (err: any) {
      const message = err.response?.data?.error || "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, success, error };
}
