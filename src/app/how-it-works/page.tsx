import Link from "next/link";

const steps = [
  {
    step: 1,
    title: "Enter Your Brand",
    desc: "Provide your brand name, website, and the search queries you want to appear in.",
    icon: "✏️",
  },
  {
    step: 2,
    title: "AI Visibility Scan",
    desc: "We query ChatGPT, Claude, Perplexity, and Gemini with your queries and check if your brand is mentioned.",
    icon: "🔍",
  },
  {
    step: 3,
    title: "Fact-Node Analysis",
    desc: "10 citable content types are scored for how well AI models can reference your brand's information.",
    icon: "📊",
  },
  {
    step: 4,
    title: "Get Your GEO Score",
    desc: "A single 0-100 score combining mention rate, position, confidence, and citability — your generative engine visibility.",
    icon: "📈",
  },
  {
    step: 5,
    title: "Action Plan",
    desc: "Prioritized recommendations ranked by impact and effort, with 30/90-day action plans and citation source targets.",
    icon: "🎯",
  },
];

const platforms = [
  { name: "ChatGPT", desc: "Powered by GPT-4o-mini. We check if your brand appears in ChatGPT's answers and at what position.", icon: "🤖" },
  { name: "Claude", desc: "Anthropic's Claude AI. We analyze its responses for brand mentions and citation patterns.", icon: "🧠" },
  { name: "Perplexity", desc: "AI search engine with source citations. We track which sources Perplexity cites for your queries.", icon: "🔎" },
  { name: "Gemini", desc: "Google's Gemini model. We check visibility across Google's AI-generated search results.", icon: "💎" },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">How GEO Tool Works</h1>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
          From brand name to actionable AI visibility strategy in under 60 seconds.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8 mb-20">
        {steps.map((s, i) => (
          <div key={s.step} className="flex gap-6 items-start">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/20 text-2xl shrink-0">
                {s.icon}
              </div>
              {i < steps.length - 1 && (
                <div className="w-px h-12 bg-[var(--card-border)] mt-2" />
              )}
            </div>
            <div className="pt-1">
              <div className="text-xs text-[var(--primary-light)] mb-1">Step {s.step}</div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] mt-1">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Platforms */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-8">Platforms We Analyze</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {platforms.map((p) => (
            <div key={p.name} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="text-lg font-semibold">{p.name}</h3>
              </div>
              <p className="text-sm text-[var(--muted)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Fact Nodes */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-center mb-4">10 Fact-Node Content Types</h2>
        <p className="text-center text-[var(--muted)] mb-8 max-w-xl mx-auto">
          AI models cite specific types of structured content. We score your brand across these 10 citable categories.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "📝", label: "Clear Definition", desc: "Concise brand definition with value prop" },
            { icon: "📊", label: "Key Statistics", desc: "Quantifiable metrics and outcomes" },
            { icon: "⚖️", label: "Comparisons", desc: "Structured comparison data" },
            { icon: "🏆", label: "Differentiators", desc: "Unique, measurable advantages" },
            { icon: "🎓", label: "Expertise Signals", desc: "Founder bios, certs, thought leadership" },
            { icon: "📋", label: "How-To Guides", desc: "Step-by-step procedural content" },
            { icon: "❓", label: "FAQ Content", desc: "Questions in natural user phrasing" },
            { icon: "⭐", label: "Testimonials", desc: "Specific outcome-based reviews" },
            { icon: "🏅", label: "Awards & Recognition", desc: "Industry awards and certifications" },
            { icon: "💰", label: "Pricing Transparency", desc: "Clear, structured pricing info" },
          ].map((fn) => (
            <div key={fn.label} className="flex items-start gap-3 glass-card p-3">
              <span className="text-lg shrink-0">{fn.icon}</span>
              <div>
                <div className="text-sm font-medium">{fn.label}</div>
                <div className="text-xs text-[var(--muted)]">{fn.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <div className="glass-card p-12">
          <h2 className="text-3xl font-bold">Ready to Check Your AI Visibility?</h2>
          <p className="mt-4 text-[var(--muted)]">Free to start. No credit card required.</p>
          <Link
            href="/analyze"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] transition-colors"
          >
            Analyze Your Brand →
          </Link>
        </div>
      </div>
    </div>
  );
}