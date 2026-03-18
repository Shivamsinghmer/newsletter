import { 
  Bot, 
  Cpu, 
  DollarSign, 
  TrendingUp, 
  Megaphone, 
  ShoppingCart, 
  Globe, 
  HeartPulse, 
  Beaker, 
  Gamepad2, 
  Rocket 
} from "lucide-react";

export const TOPICS = [
  { id: "ai", icon: Bot, name: "AI & Technology", desc: "Latest in AI, LLMs, and tech innovation" },
  { id: "tech", icon: Cpu, name: "Tech & Gadgets", desc: "Consumer tech, hardware, and software releases" },
  { id: "finance", icon: DollarSign, name: "Business & Finance", desc: "Markets, money, and economic trends" },
  { id: "crypto", icon: TrendingUp, name: "Stock Market & Crypto", desc: "Equities, crypto prices, and trading news" },
  { id: "marketing", icon: Megaphone, name: "Marketing & Copywriting", desc: "Conversion, direct response, and brand strategy" },
  { id: "ecommerce", icon: ShoppingCart, name: "eCommerce & DTC", desc: "Shopify, ads, and brand building" },
  { id: "world", icon: Globe, name: "World News & Politics", desc: "Global headlines and political developments" },
  { id: "health", icon: HeartPulse, name: "Health & Wellness", desc: "Science-backed health and performance" },
  { id: "science", icon: Beaker, name: "Science & Research", desc: "Breakthroughs, studies, and discoveries" },
  { id: "gaming", icon: Gamepad2, name: "Gaming, Film & Culture", desc: "Games, movies, and pop culture" },
  { id: "startups", icon: Rocket, name: "Startups & VC Funding", desc: "Funding rounds, exits, and founder stories" },
];
