export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-key";
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_demo";
export const STRIPE_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || "price_demo";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const FREE_TIER_LIMITS = {
  analysesPerMonth: 3,
  queriesPerAnalysis: 5,
  competitors: 2,
};

export const PRO_TIER_LIMITS = {
  analysesPerMonth: Infinity,
  queriesPerAnalysis: 20,
  competitors: 10,
};

export const PRICING = {
  pro: {
    monthly: 49,
    yearly: 470,
  },
};