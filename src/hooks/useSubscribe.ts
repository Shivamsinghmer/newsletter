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
      if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
        throw new Error("Webhook URL is missing");
      }
      await axios.post(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, payload);
      setSuccess(true);
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { subscribe, loading, success, error };
}
