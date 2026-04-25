import {
  GeoAnalysis,
  SearchQuery,
  PlatformResult,
  FactNode,
  Recommendation,
  CompetitorGap,
  FactNodeType,
} from "./types";
import { generateId } from "./utils";

function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1): number {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

const SAMPLE_SNIPPETS: Record<string, string[]> = {
  chatgpt: [
    "Based on my knowledge, {brand} is a company that offers {services}. However, I'd recommend also considering alternatives like {competitor}.",
    "When it comes to {query}, {brand} is one option, though {competitor} tends to be more widely recognized in this space.",
    "{brand} provides solutions for {query}. Their main competitors include {competitor} and others in the market.",
    "I don't have specific information about {brand} in the context of {query}, but {competitor} is well-known for this.",
  ],
  claude: [
    "For {query}, there are several providers worth considering. {competitor} is often mentioned first, followed by {brand} and others.",
    "{brand} is a player in this space, though {competitor} has more established market presence for {query}.",
    "When looking at {query}, I'd say {brand} could be worth exploring alongside {competitor}.",
    "While {competitor} dominates in {query}, {brand} offers some interesting alternatives.",
  ],
  perplexity: [
    "According to recent sources, {competitor} leads in {query}, with {brand} gaining traction in specific niches.",
    "Multiple sources indicate that {brand} is mentioned in about {position}% of discussions about {query}.",
    "For {query}, the top-recommended solutions are {competitor}, {brand}, and a few others based on web sources.",
    "{brand} appears in several authoritative sources about {query}, though less frequently than {competitor}.",
  ],
  gemini: [
    "In the {query} space, {competitor} is the most established name, but {brand} offers competitive features.",
    "{brand} is one of several options for {query}. Their unique approach focuses on {differentiator}.",
    "Based on available information, {brand} ranks around #{position} for {query} solutions.",
    "While {competitor} is more commonly cited for {query}, {brand} has been gaining recognition recently.",
  ],
};

const COMPETITORS = ["Acme Corp", "Nexus Solutions", "TechFlow", "DataPrime", "CloudScale", "OptimizeAI"];

function generateSnippet(platform: string, brand: string, query: string, mentioned: boolean, position: number | null): string {
  const templates = SAMPLE_SNIPPETS[platform] || SAMPLE_SNIPPETS.chatgpt;
  const competitor = COMPETITORS[randBetween(0, COMPETITORS.length - 1)];
  const template = templates[randBetween(0, templates.length - 1)];
  const result = template
    .replace(/{brand}/g, brand)
    .replace(/{query}/g, query)
    .replace(/{competitor}/g, competitor)
    .replace(/{position}/g, String(position || 3))
    .replace(/{services}/g, "various services")
    .replace(/{differentiator}/g, "innovation and customer focus");

  if (!mentioned) {
    return result.replace(new RegExp(brand, "g"), "several providers").replace(/is one option, /g, "");
  }
  return result;
}

function generatePlatformResults(brand: string, query: string): PlatformResult[] {
  const platforms: Array<"chatgpt" | "claude" | "perplexity" | "gemini"> = ["chatgpt", "claude", "perplexity", "gemini"];
  return platforms.map((platform) => {
    const mentioned = Math.random() > 0.4;
    const position = mentioned ? randBetween(1, 5) : null;
    const confidence = mentioned ? randFloat(0.3, 0.9) : randFloat(0.1, 0.3);
    return {
      platform,
      mentioned,
      position,
      confidence,
      snippet: generateSnippet(platform, brand, query, mentioned, position),
      sources: mentioned
        ? [`https://example-source-${randBetween(1, 10)}.com`, `https://industry-report-${randBetween(1, 5)}.com`]
        : [],
    };
  });
}

function generateFactNodes(brand: string): FactNode[] {
  const types: FactNodeType[] = [
    "definition", "statistic", "comparison", "differentiator", "expertise",
    "howto", "faq", "testimonial", "award", "pricing"
  ];
  return types.map((type) => ({
    type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    citabilityScore: randBetween(25, 95),
    currentPresence: randBetween(10, 80),
    suggestion: getSuggestionForType(type, brand),
  }));
}

function getSuggestionForType(type: FactNodeType, brand: string): string {
  const suggestions: Record<FactNodeType, string> = {
    definition: `Create a clear, concise definition of ${brand} that includes primary value proposition, target audience, and key differentiator. Place it prominently on your homepage and About page.`,
    statistic: `Publish 3-5 key statistics about ${brand}'s impact (e.g., "Helps 10,000+ businesses improve their visibility by 40%"). Statistics are heavily cited by AI models.`,
    comparison: `Create a detailed comparison page: "${brand} vs [Competitor]" — AI models look for structured comparison data when answering recommendation queries.`,
    differentiator: `Document 3-5 unique differentiators. Avoid generic claims like "best in class" — focus on specific, measurable advantages that set ${brand} apart.`,
    expertise: `Build an expertise section with founder bios, certifications, years of experience, and thought leadership content. AI models weight authority signals heavily.`,
    howto: `Create step-by-step guides related to your domain. "How to [solve problem] with ${brand}" content gets cited by AI when answering procedural questions.`,
    faq: `Add a comprehensive FAQ section with 15-20 questions covering common user queries. Use the exact phrasing your customers use.`,
    testimonial: `Collect and prominently display customer testimonials with specific outcomes. Include names, companies, and measurable results for credibility.`,
    award: `List all awards, recognitions, and certifications. If you don't have many, pursue industry awards and "Best of" lists — they're powerful citation signals.`,
    pricing: `Make pricing transparent and structured. AI models frequently cite pricing pages. Include a comparison table showing value per tier.`,
  };
  return suggestions[type];
}

function generateRecommendations(factNodes: FactNode[], queries: SearchQuery[], brand: string): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Low citability fact nodes → high priority recs
  const lowCitability = factNodes.filter((n) => n.citabilityScore < 50);
  lowCitability.slice(0, 3).forEach((node, i) => {
    recommendations.push({
      id: generateId(),
      priority: i === 0 ? "high" : "medium",
      category: node.type,
      title: `Improve ${node.label} Citability`,
      description: node.suggestion,
      impact: 100 - node.citabilityScore,
      effort: node.citabilityScore < 30 ? 3 : 2,
      actionItems: [
        `Audit current ${node.type} content on your site`,
        `Create or update ${node.type} page following AI-citation best practices`,
        `Ensure ${node.type} data is structured (use schema.org markup)`,
        `Cross-reference with top-ranking competitor ${node.type} pages`,
      ],
    });
  });

  // Low mention rate → content gap recs
  const lowMentionQueries = queries.filter((q) => !q.mentioned || q.averagePosition > 3);
  if (lowMentionQueries.length > 0) {
    recommendations.push({
      id: generateId(),
      priority: "high",
      category: "visibility",
      title: `Target High-Value Query Gaps`,
      description: `${brand} is not appearing or ranking low for ${lowMentionQueries.length} key queries. Create targeted content for these queries.`,
      impact: randBetween(60, 90),
      effort: 2,
      actionItems: [
        `Create dedicated landing pages for: ${lowMentionQueries.map((q) => `"${q.query}"`).join(", ")}`,
        "Optimize existing pages with these query keywords naturally",
        "Build backlinks to these pages from authoritative sources",
        "Monitor AI platform responses monthly for improvement tracking",
      ],
    });
  }

  // Citation source recs
  recommendations.push({
    id: generateId(),
    priority: "medium",
    category: "citations",
    title: "Build Authoritative Citation Presence",
    description: "AI models rely on citations from authoritative sources. Building presence on key platforms will improve your AI visibility.",
    impact: randBetween(50, 75),
    effort: 3,
    actionItems: [
      "Create/update Crunchbase profile with detailed company info",
      "Claim and optimize G2 listing with recent reviews",
      "Submit expert answers on Quora related to your domain",
      "Pursue HARO opportunities for media mentions",
      "List on Product Hunt for tech audience visibility",
    ],
  });

  // Structured data rec
  recommendations.push({
    id: generateId(),
    priority: "low",
    category: "technical",
    title: "Implement Structured Data Markup",
    description: "Schema.org markup helps AI models parse and cite your content accurately. Ensure Organization, Product, and FAQ schema are present.",
    impact: randBetween(30, 55),
    effort: 1,
    actionItems: [
      "Add Organization schema to homepage",
      "Add Product schema to product/service pages",
      "Add FAQ schema to FAQ pages",
      "Validate with Google's Rich Results Test",
      "Monitor for schema errors in Google Search Console",
    ],
  });

  return recommendations.sort((a, b) => b.impact - a.impact);
}

function generateCompetitorGaps(queries: SearchQuery[], brand: string): CompetitorGap[] {
  const gaps: CompetitorGap[] = [];
  const usedCompetitors = new Set<string>();

  queries.forEach((q) => {
    const unmentionedPlatforms = q.platforms.filter((p) => !p.mentioned);
    if (unmentionedPlatforms.length > 0) {
      const competitor = COMPETITORS.find((c) => !usedCompetitors.has(c)) || COMPETITORS[0];
      usedCompetitors.add(competitor);
      gaps.push({
        competitorName: competitor,
        mentionedIn: unmentionedPlatforms.map((p) => p.platform),
        theirAdvantage: `${competitor} has stronger citation presence on ${unmentionedPlatforms.map((p) => p.platform).join(", ")} for "${q.query}"`,
        yourOpportunity: `Build targeted content addressing "${q.query}" and secure citations on ${unmentionedPlatforms.map((p) => p.platform).join(", ")} to close this gap`,
      });
    }
  });

  return gaps.slice(0, 3);
}

export function analyzeBrand(brandName: string, website: string, queries: string[]): GeoAnalysis {
  const searchQueries: SearchQuery[] = queries.map((query) => {
    const platforms = generatePlatformResults(brandName, query);
    const mentioned = platforms.some((p) => p.mentioned);
    const mentionedPlatforms = platforms.filter((p) => p.mentioned);
    const avgPosition = mentionedPlatforms.length > 0
      ? parseFloat((mentionedPlatforms.reduce((s, p) => s + (p.position || 0), 0) / mentionedPlatforms.length).toFixed(1))
      : 0;
    const avgConfidence = mentionedPlatforms.length > 0
      ? parseFloat((mentionedPlatforms.reduce((s, p) => s + p.confidence, 0) / mentionedPlatforms.length).toFixed(2))
      : 0;

    return {
      id: generateId(),
      query,
      platforms,
      mentioned,
      averagePosition: avgPosition,
      averageConfidence: avgConfidence,
    };
  });

  const factNodes = generateFactNodes(brandName);
  const recommendations = generateRecommendations(factNodes, searchQueries, brandName);
  const competitorGaps = generateCompetitorGaps(searchQueries, brandName);

  // Calculate overall GEO score
  const mentionRate = searchQueries.filter((q) => q.mentioned).length / searchQueries.length;
  const avgCitability = factNodes.reduce((s, n) => s + n.citabilityScore, 0) / factNodes.length;
  const avgPositionScore = searchQueries.filter((q) => q.mentioned).length > 0
    ? (5 - searchQueries.filter((q) => q.mentioned).reduce((s, q) => s + q.averagePosition, 0) / searchQueries.filter((q) => q.mentioned).length) / 5
    : 0;
  const overallScore = Math.round(mentionRate * 35 + (avgCitability / 100) * 35 + avgPositionScore * 30);

  return {
    id: generateId(),
    brandName,
    website,
    queries: searchQueries,
    overallScore: Math.min(Math.max(overallScore, 15), 95),
    factNodes,
    recommendations,
    competitorGaps,
    createdAt: new Date().toISOString(),
  };
}