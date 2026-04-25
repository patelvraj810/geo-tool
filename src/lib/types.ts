export interface GeoAnalysis {
  id: string;
  brandName: string;
  website: string;
  queries: SearchQuery[];
  overallScore: number;
  factNodes: FactNode[];
  recommendations: Recommendation[];
  competitorGaps: CompetitorGap[];
  createdAt: string;
}

export interface SearchQuery {
  id: string;
  query: string;
  platforms: PlatformResult[];
  mentioned: boolean;
  averagePosition: number;
  averageConfidence: number;
}

export interface PlatformResult {
  platform: "chatgpt" | "claude" | "perplexity" | "gemini";
  mentioned: boolean;
  position: number | null;
  confidence: number;
  snippet: string;
  sources: string[];
}

export interface FactNode {
  type: FactNodeType;
  label: string;
  citabilityScore: number;
  currentPresence: number;
  suggestion: string;
}

export type FactNodeType =
  | "definition"
  | "statistic"
  | "comparison"
  | "differentiator"
  | "expertise"
  | "howto"
  | "faq"
  | "testimonial"
  | "award"
  | "pricing";

export const FACT_NODE_LABELS: Record<FactNodeType, string> = {
  definition: "Clear Definition",
  statistic: "Key Statistics",
  comparison: "Comparisons",
  differentiator: "Unique Differentiators",
  expertise: "Expertise Signals",
  howto: "How-To Guides",
  faq: "FAQ Content",
  testimonial: "Testimonials/Reviews",
  award: "Awards & Recognition",
  pricing: "Pricing Transparency",
};

export interface Recommendation {
  id: string;
  priority: "high" | "medium" | "low";
  category: string;
  title: string;
  description: string;
  impact: number;
  effort: number;
  actionItems: string[];
}

export interface CompetitorGap {
  competitorName: string;
  mentionedIn: string[];
  theirAdvantage: string;
  yourOpportunity: string;
}

export interface CitationSource {
  name: string;
  url: string;
  type: "authoritative" | "industry" | "community" | "media";
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: string;
}

export const CITATION_SOURCES: CitationSource[] = [
  { name: "Wikipedia", url: "https://wikipedia.org", type: "authoritative", difficulty: "hard", estimatedTime: "2-4 weeks" },
  { name: "Crunchbase", url: "https://crunchbase.com", type: "industry", difficulty: "easy", estimatedTime: "1-2 days" },
  { name: "G2", url: "https://g2.com", type: "industry", difficulty: "easy", estimatedTime: "3-5 days" },
  { name: "Reddit", url: "https://reddit.com", type: "community", difficulty: "medium", estimatedTime: "1-2 weeks" },
  { name: "Quora", url: "https://quora.com", type: "community", difficulty: "easy", estimatedTime: "2-3 days" },
  { name: "TechCrunch", url: "https://techcrunch.com", type: "media", difficulty: "hard", estimatedTime: "3-6 weeks" },
  { name: "Forbes", url: "https://forbes.com", type: "media", difficulty: "hard", estimatedTime: "4-8 weeks" },
  { name: "HARO", url: "https://connectively.us", type: "media", difficulty: "medium", estimatedTime: "1-3 weeks" },
  { name: "Product Hunt", url: "https://producthunt.com", type: "industry", difficulty: "easy", estimatedTime: "1-2 days" },
  { name: "Yelp", url: "https://yelp.com", type: "community", difficulty: "easy", estimatedTime: "2-3 days" },
  { name: "Better Business Bureau", url: "https://bbb.org", type: "authoritative", difficulty: "medium", estimatedTime: "1-2 weeks" },
  { name: "Google Scholar", url: "https://scholar.google.com", type: "authoritative", difficulty: "hard", estimatedTime: "2-4 weeks" },
];