"use client";

import Link from "next/link";

const features = [
  {
    icon: "🔍",
    title: "LLM Visibility Tracker",
    desc: "See if ChatGPT, Claude, Perplexity, and Gemini mention your brand when users ask about your industry.",
  },
  {
    icon: "📊",
    title: "Fact-Node Analysis",
    desc: "10 citable content types scored for how well AI models can reference them — from definitions to pricing.",
  },
  {
    icon: "🎯",
    title: "Citation Strategy Engine",
    desc: "Prioritized recommendations with 30/90-day action plans targeting the sources AI models actually cite.",
  },
  {
    icon: "🏆",
    title: "Competitor Gap Analysis",
    desc: "See who AI models recommend instead of you — and how to close the gap.",
  },
  {
    icon: "📈",
    title: "GEO Score",
    desc: "A single 0-100 score measuring your brand's generative engine visibility with trend tracking.",
  },
  {
    icon: "⚡",
    title: "Action Items",
    desc: "Concrete, prioritized steps ranked by impact and effort so you know exactly what to do next.",
  },
];

const platforms = [
  { name: "ChatGPT", color: "#10a37f", icon: "🤖" },
  { name: "Claude", color: "#d97706", icon: "🧠" },
  { name: "Perplexity", color: "#2563eb", icon: "🔎" },
  { name: "Gemini", color: "#4285f4", icon: "💎" },
];

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/10 to-transparent" />
        <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 text-center relative">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--muted)]">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            Generative Engine Optimization
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Is Your Brand Visible to{" "}
            <span className="gradient-text">AI?</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)] max-w-2xl mx-auto">
            When someone asks ChatGPT, Claude, Perplexity, or Gemini about your industry — do they mention you? 
            GEO Tool analyzes your AI visibility and gives you a roadmap to get cited.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/analyze"
              className="rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] transition-colors animate-pulse-glow"
            >
              Analyze Your Brand — Free
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-lg border border-[var(--card-border)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
            >
              How It Works
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <span>{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">How GEO Tool Helps</h2>
          <p className="mt-4 text-[var(--muted)] max-w-2xl mx-auto">
            From visibility tracking to actionable strategies — everything you need to appear in AI-generated answers.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6 hover:border-[var(--primary)] transition-colors">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center">
        <div className="glass-card p-12">
          <h2 className="text-3xl font-bold">3 Free Analyses Per Month</h2>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
            No credit card required. Enter your brand name and a few queries, and get your GEO Score in seconds.
          </p>
          <Link
            href="/analyze"
            className="mt-8 inline-block rounded-lg bg-[var(--primary)] px-8 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] transition-colors"
          >
            Start Your First Analysis →
          </Link>
        </div>
      </section>
    </div>
  );
}