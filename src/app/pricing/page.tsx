import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "3 analyses per month",
      "5 queries per analysis",
      "2 competitor gaps",
      "Fact-Node analysis",
      "Citation source list",
      "Basic recommendations",
    ],
    cta: "Start Free",
    href: "/analyze",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: [
      "Unlimited analyses",
      "20 queries per analysis",
      "10 competitor gaps",
      "Full Fact-Node analysis",
      "Priority citation sources",
      "Advanced recommendations",
      "30/90-day action plans",
      "Score trend tracking",
      "PDF/HTML report export",
      "Email alerts on score changes",
    ],
    cta: "Start 14-Day Free Trial",
    href: "/analyze",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 animate-fade-in">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold">Simple Pricing</h1>
        <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
          Start free, upgrade when you need more depth. No credit card required for the free tier.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`glass-card p-8 relative ${plan.highlight ? "border-[var(--primary)] shadow-lg shadow-[var(--primary)]/10" : ""}`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <div className="mt-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-[var(--muted)]">{plan.period}</span>
            </div>
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <span className="text-[var(--success)] shrink-0">✓</span>
                  <span className="text-[var(--muted)]">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href={plan.href}
              className={`mt-8 block text-center rounded-lg py-3 text-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                  : "border border-[var(--card-border)] text-white hover:bg-[var(--card)]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-lg font-semibold mb-2">Frequently Asked Questions</h3>
        <div className="mx-auto max-w-2xl space-y-4 mt-6">
          {[
            { q: "What is Generative Engine Optimization?", a: "GEO is the practice of optimizing your brand's visibility in AI-generated answers from models like ChatGPT, Claude, Perplexity, and Gemini. Unlike traditional SEO for search engines, GEO focuses on making your content citable by AI models." },
            { q: "How does the free tier work?", a: "You get 3 free analyses per month with up to 5 queries each. No credit card required. Perfect for getting started with GEO." },
            { q: "Can I cancel my Pro subscription?", a: "Yes, you can cancel anytime. Your Pro access continues until the end of your billing period." },
            { q: "How accurate are the AI visibility results?", a: "We query real AI models (ChatGPT, Claude, Perplexity, Gemini) and analyze their actual responses. Results reflect what users see when they ask these questions." },
          ].map((faq) => (
            <div key={faq.q} className="glass-card p-4">
              <h4 className="font-medium text-sm">{faq.q}</h4>
              <p className="text-sm text-[var(--muted)] mt-1">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}