export interface SubscribePayload {
  fullName: string;
  email: string;
  role: string;
  topics: string[];
  subscribedAt: string;
  source: "hero_card" | "footer_cta" | "mobile_sticky" | "hero_inline";
}
