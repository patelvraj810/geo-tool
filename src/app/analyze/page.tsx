"use client";

import { useState } from "react";
import { analyzeBrand } from "@/lib/analyzer";
import type { GeoAnalysis, FactNode } from "@/lib/types";
import { FACT_NODE_LABELS } from "@/lib/types";

type Tab = "overview" | "queries" | "factnodes" | "recommendations" | "competitors" | "sources";

function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "var(--success)" : score >= 40 ? "var(--warning)" : "var(--danger)";

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--card-border)" strokeWidth="6" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }}
        />
      </svg>
      <div className="score-ring-text">
        <div className="text-3xl font-bold" style={{ color }}>{score}</div>
        <div className="text-xs text-[var(--muted)]">GEO Score</div>
      </div>
    </div>
  );
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = score >= 70 ? "var(--success)" : score >= 40 ? "var(--warning)" : "var(--danger)";
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--background)] border border-[var(--card-border)]">
      <span className="text-sm">{label}</span>
      <span className="font-bold" style={{ color }}>{score}/100</span>
    </div>
  );
}

function ProgressBar({ value, max = 100, label }: { value: number; max?: number; label: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span className="text-[var(--muted)]">{value}%</span>
      </div>
      <div className="progress-bar h-2">
        <div className="progress-bar-fill h-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function PlatformIcon({ platform }: { platform: string }) {
  const icons: Record<string, string> = { chatgpt: "🤖", claude: "🧠", perplexity: "🔎", gemini: "💎" };
  return <span title={platform}>{icons[platform] || "🌐"}</span>;
}

export default function AnalyzePage() {
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [queriesInput, setQueriesInput] = useState("");
  const [analysis, setAnalysis] = useState<GeoAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");

  const handleAnalyze = () => {
    if (!brandName.trim() || !queriesInput.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const queries = queriesInput
        .split("\n")
        .map((q) => q.trim())
        .filter(Boolean);
      const result = analyzeBrand(brandName.trim(), website.trim() || `https://${brandName.trim().toLowerCase().replace(/\s+/g, "")}.com`, queries);
      setAnalysis(result);
      setLoading(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mb-6 h-16 w-16 mx-auto rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin" />
          <h2 className="text-2xl font-bold">Analyzing {brandName}...</h2>
          <p className="mt-2 text-[var(--muted)]">Querying ChatGPT, Claude, Perplexity, and Gemini</p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-[var(--muted)]">
            <span>🤖 ChatGPT</span>
            <span>🧠 Claude</span>
            <span>🔎 Perplexity</span>
            <span>💎 Gemini</span>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 animate-fade-in">
        <h1 className="text-3xl font-bold text-center mb-2">Analyze Your AI Visibility</h1>
        <p className="text-center text-[var(--muted)] mb-10">
          Enter your brand name, website, and the queries you want to be mentioned for.
        </p>

        <div className="glass-card p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Brand Name *</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Stripe, Notion, Acme Corp"
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourbrand.com"
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Search Queries * <span className="text-[var(--muted)]">(one per line, up to 5 free)</span>
            </label>
            <textarea
              value={queriesInput}
              onChange={(e) => setQueriesInput(e.target.value)}
              placeholder={`best project management tools\ntop CRM software for startups\nalternatives to Jira`}
              rows={4}
              className="w-full rounded-lg border border-[var(--card-border)] bg-[var(--background)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none resize-y"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!brandName.trim() || !queriesInput.trim()}
            className="w-full rounded-lg bg-[var(--primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Run Free Analysis →
          </button>

          <p className="text-xs text-[var(--muted)] text-center">
            Free: 3 analyses/month, 5 queries per analysis.{" "}
            <a href="/pricing" className="text-[var(--primary-light)] hover:underline">Upgrade to Pro</a> for unlimited.
          </p>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "queries", label: "Query Results" },
    { key: "factnodes", label: "Fact Nodes" },
    { key: "recommendations", label: "Recommendations" },
    { key: "competitors", label: "Competitor Gaps" },
    { key: "sources", label: "Citation Sources" },
  ];

  const mentionRate = analysis.queries.filter((q) => q.mentioned).length / analysis.queries.length;
  const avgPosition = analysis.queries.filter((q) => q.mentioned).length > 0
    ? (analysis.queries.filter((q) => q.mentioned).reduce((s, q) => s + q.averagePosition, 0) / analysis.queries.filter((q) => q.mentioned).length).toFixed(1)
    : "N/A";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{analysis.brandName} — GEO Analysis</h1>
          <p className="text-sm text-[var(--muted)]">{analysis.website} · {new Date(analysis.createdAt).toLocaleDateString()}</p>
        </div>
        <button
          onClick={() => { setAnalysis(null); }}
          className="rounded-lg border border-[var(--card-border)] px-4 py-2 text-sm hover:bg-[var(--card)] transition-colors"
        >
          New Analysis
        </button>
      </div>

      {/* Score + Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="glass-card p-6 flex flex-col items-center">
          <ScoreRing score={analysis.overallScore} />
          <p className="mt-2 text-sm text-[var(--muted)]">Overall GEO Score</p>
        </div>
        <div className="glass-card p-6 space-y-3">
          <h3 className="text-sm font-medium text-[var(--muted)]">Key Metrics</h3>
          <ScoreBadge score={Math.round(mentionRate * 100)} label="Mention Rate" />
          <ScoreBadge score={analysis.overallScore} label="GEO Score" />
          <div className="text-sm text-[var(--muted)]">
            Avg Position: <span className="text-white font-medium">{avgPosition}</span>
          </div>
        </div>
        <div className="glass-card p-6 space-y-3">
          <h3 className="text-sm font-medium text-[var(--muted)]">Mention by Platform</h3>
          {["chatgpt", "claude", "perplexity", "gemini"].map((p) => {
            const results = analysis.queries.map((q) => q.platforms.find((pl) => pl.platform === p));
            const mentions = results.filter((r) => r?.mentioned).length;
            return (
              <div key={p} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <PlatformIcon platform={p} /> {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
                <span className={mentions > 0 ? "text-[var(--success)]" : "text-[var(--danger)]"}>
                  {mentions}/{analysis.queries.length}
                </span>
              </div>
            );
          })}
        </div>
        <div className="glass-card p-6 space-y-3">
          <h3 className="text-sm font-medium text-[var(--muted)]">Top Priority</h3>
          {analysis.recommendations.slice(0, 3).map((r) => (
            <div key={r.id} className="text-sm">
              <div className="flex items-center gap-2">
                <span className={`inline-block h-2 w-2 rounded-full ${r.priority === "high" ? "bg-[var(--danger)]" : r.priority === "medium" ? "bg-[var(--warning)]" : "bg-[var(--success)]"}`} />
                <span className="font-medium">{r.title}</span>
              </div>
              <p className="text-xs text-[var(--muted)] ml-4 mt-0.5">Impact: {r.impact}/100</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--card-border)] mb-6 overflow-x-auto">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[var(--primary)] text-[var(--primary-light)]"
                  : "border-transparent text-[var(--muted)] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Executive Summary</h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              <strong className="text-white">{analysis.brandName}</strong> has a GEO Score of{" "}
              <strong className="text-white">{analysis.overallScore}/100</strong>. Your brand is mentioned in{" "}
              <strong className="text-white">{Math.round(mentionRate * 100)}%</strong> of AI-generated responses across
              the {analysis.queries.length} queries analyzed. The average position when mentioned is{" "}
              <strong className="text-white">{avgPosition}</strong>. Key opportunities for improvement include strengthening
              your citation presence on authoritative platforms and creating more structured, citable content.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Strengths</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {analysis.factNodes.filter((n) => n.citabilityScore >= 60).slice(0, 3).map((n) => (
                  <li key={n.type} className="flex items-start gap-2">
                    <span className="text-[var(--success)]">✓</span>
                    <span>Strong {FACT_NODE_LABELS[n.type as keyof typeof FACT_NODE_LABELS]} presence (score: {n.citabilityScore})</span>
                  </li>
                ))}
                {analysis.queries.filter((q) => q.mentioned && q.averagePosition <= 2).map((q) => (
                  <li key={q.id} className="flex items-start gap-2">
                    <span className="text-[var(--success)]">✓</span>
                    <span>Ranking #1-2 for &ldquo;{q.query}&rdquo;</span>
                  </li>
                ))}
                {analysis.factNodes.filter((n) => n.citabilityScore >= 60).length === 0 && analysis.queries.filter((q) => q.mentioned && q.averagePosition <= 2).length === 0 && (
                  <li className="text-sm text-[var(--muted)]">Focus on building citable content first</li>
                )}
              </ul>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Wins</h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {analysis.recommendations.filter((r) => r.effort <= 2).slice(0, 4).map((r) => (
                  <li key={r.id} className="flex items-start gap-2">
                    <span className="text-[var(--warning)]">⚡</span>
                    <span>{r.title} (impact: {r.impact})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {tab === "queries" && (
        <div className="space-y-4 animate-fade-in">
          {analysis.queries.map((q) => (
            <div key={q.id} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-semibold">&ldquo;{q.query}&rdquo;</h3>
                  <span className={`text-sm ${q.mentioned ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                    {q.mentioned ? "✓ Mentioned" : "✗ Not mentioned"}
                  </span>
                </div>
                {q.mentioned && (
                  <div className="text-sm text-[var(--muted)]">
                    Avg Position: <span className="text-white font-medium">{q.averagePosition}</span> · Confidence:{" "}
                    <span className="text-white font-medium">{(q.averageConfidence * 100).toFixed(0)}%</span>
                  </div>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {q.platforms.map((p) => (
                  <div key={p.platform} className={`rounded-lg border p-3 ${p.mentioned ? "border-[var(--success)]/30 bg-[var(--success)]/5" : "border-[var(--card-border)]"}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <PlatformIcon platform={p.platform} />
                      <span className="text-sm font-medium">{p.platform.charAt(0).toUpperCase() + p.platform.slice(1)}</span>
                      <span className={`ml-auto text-xs ${p.mentioned ? "text-[var(--success)]" : "text-[var(--danger)]"}`}>
                        {p.mentioned ? "✓" : "✗"}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--muted)] line-clamp-3">{p.snippet}</p>
                    {p.mentioned && (
                      <div className="mt-2 text-xs text-[var(--muted)]">
                        Position: #{p.position} · Confidence: {(p.confidence * 100).toFixed(0)}%
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "factnodes" && (
        <div className="space-y-4 animate-fade-in">
          <div className="glass-card p-4 text-sm text-[var(--muted)]">
            Fact Nodes are citable content types that AI models reference. Higher citability = more likely to be cited.
          </div>
          {analysis.factNodes.map((fn) => (
            <div key={fn.type} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold">{FACT_NODE_LABELS[fn.type as keyof typeof FACT_NODE_LABELS]}</h3>
                  <span className="text-xs text-[var(--muted)] capitalize">{fn.type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-[var(--muted)]">Citability:</span>{" "}
                    <span className={`font-bold ${fn.citabilityScore >= 70 ? "text-[var(--success)]" : fn.citabilityScore >= 40 ? "text-[var(--warning)]" : "text-[var(--danger)]"}`}>
                      {fn.citabilityScore}/100
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="text-[var(--muted)]">Presence:</span>{" "}
                    <span className="font-medium">{fn.currentPresence}%</span>
                  </div>
                </div>
              </div>
              <ProgressBar label="Citability Score" value={fn.citabilityScore} />
              <div className="mt-3">
                <ProgressBar label="Current Presence" value={fn.currentPresence} />
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{fn.suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "recommendations" && (
        <div className="space-y-4 animate-fade-in">
          {analysis.recommendations.map((r, i) => (
            <div key={r.id} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-block h-2 w-2 rounded-full ${r.priority === "high" ? "bg-[var(--danger)]" : r.priority === "medium" ? "bg-[var(--warning)]" : "bg-[var(--success)]"}`} />
                    <span className="text-xs uppercase tracking-wide text-[var(--muted)]">{r.priority} priority</span>
                    <span className="text-xs text-[var(--muted)]">· {r.category}</span>
                  </div>
                  <h3 className="font-semibold">{r.title}</h3>
                </div>
                <div className="flex items-center gap-3 text-sm shrink-0">
                  <span className="text-[var(--muted)]">Impact: <strong className="text-white">{r.impact}</strong></span>
                  <span className="text-[var(--muted)]">Effort: <strong className="text-white">{r.effort}/5</strong></span>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] mb-4">{r.description}</p>
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-[var(--muted)] uppercase tracking-wide">Action Items</h4>
                {r.actionItems.map((item, j) => (
                  <div key={j} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <span className="text-[var(--primary-light)] shrink-0">→</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "competitors" && (
        <div className="space-y-4 animate-fade-in">
          {analysis.competitorGaps.length > 0 ? (
            analysis.competitorGaps.map((gap, i) => (
              <div key={i} className="glass-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🏢</span>
                  <h3 className="font-semibold">{gap.competitorName}</h3>
                  <span className="text-xs text-[var(--muted)]">Competitor</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/20 p-4">
                    <h4 className="text-sm font-medium text-[var(--danger)] mb-2">Their Advantage</h4>
                    <p className="text-sm text-[var(--muted)]">{gap.theirAdvantage}</p>
                  </div>
                  <div className="rounded-lg bg-[var(--success)]/10 border border-[var(--success)]/20 p-4">
                    <h4 className="text-sm font-medium text-[var(--success)] mb-2">Your Opportunity</h4>
                    <p className="text-sm text-[var(--muted)]">{gap.yourOpportunity}</p>
                  </div>
                </div>
                <div className="mt-3 text-sm text-[var(--muted)]">
                  Mentioned on: <span className="text-white">{gap.mentionedIn.join(", ")}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-card p-8 text-center">
              <p className="text-[var(--muted)]">No significant competitor gaps detected — your brand has strong visibility!</p>
            </div>
          )}
        </div>
      )}

      {tab === "sources" && (
        <div className="animate-fade-in">
          <div className="glass-card p-4 text-sm text-[var(--muted)] mb-6">
            These are authoritative sources that AI models cite. Building presence on these platforms improves your AI visibility.
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Wikipedia", type: "Authoritative", difficulty: "Hard", time: "2-4 weeks", icon: "📚" },
              { name: "Crunchbase", type: "Industry", difficulty: "Easy", time: "1-2 days", icon: "🏢" },
              { name: "G2", type: "Industry", difficulty: "Easy", time: "3-5 days", icon: "⭐" },
              { name: "Reddit", type: "Community", difficulty: "Medium", time: "1-2 weeks", icon: "💬" },
              { name: "Quora", type: "Community", difficulty: "Easy", time: "2-3 days", icon: "❓" },
              { name: "TechCrunch", type: "Media", difficulty: "Hard", time: "3-6 weeks", icon: "📰" },
              { name: "Forbes", type: "Media", difficulty: "Hard", time: "4-8 weeks", icon: "💼" },
              { name: "HARO", type: "Media", difficulty: "Medium", time: "1-3 weeks", icon: "🎤" },
              { name: "Product Hunt", type: "Industry", difficulty: "Easy", time: "1-2 days", icon: "🚀" },
              { name: "Yelp", type: "Community", difficulty: "Easy", time: "2-3 days", icon: "📍" },
              { name: "BBB", type: "Authoritative", difficulty: "Medium", time: "1-2 weeks", icon: "✅" },
              { name: "Google Scholar", type: "Authoritative", difficulty: "Hard", time: "2-4 weeks", icon: "🎓" },
            ].map((src) => (
              <div key={src.name} className="glass-card p-4 hover:border-[var(--primary)] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{src.icon}</span>
                  <h4 className="font-medium">{src.name}</h4>
                </div>
                <div className="space-y-1 text-sm text-[var(--muted)]">
                  <div className="flex justify-between">
                    <span>Type</span>
                    <span className="text-white">{src.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty</span>
                    <span className={src.difficulty === "Easy" ? "text-[var(--success)]" : src.difficulty === "Medium" ? "text-[var(--warning)]" : "text-[var(--danger)]"}>
                      {src.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. Time</span>
                    <span className="text-white">{src.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}