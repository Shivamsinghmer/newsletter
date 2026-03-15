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
      
      // We can also still call n8n if needed, but for now we focus on the requested backend
      if (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL && process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL !== "your_n8n_webhook_url_here") {
        try {
          await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, payload);
        } catch (n8nErr) {
          console.error("n8n sync failed:", n8nErr);
          // Don't fail the whole request if n8n fails but DB succeeded
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
