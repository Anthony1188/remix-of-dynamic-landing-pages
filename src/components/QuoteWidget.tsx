import { useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, RotateCcw, Snowflake } from "lucide-react";

type CategoryId = "automotive" | "marine" | "industrial";
type SizeId = "small" | "medium" | "large";
type ConditionId = "light" | "moderate" | "heavy";

const CATEGORIES: {
  id: CategoryId;
  emoji: string;
  title: string;
  desc: string;
  baseRate: number; // USD per hour baseline
}[] = [
  { id: "automotive", emoji: "🚗", title: "Automotive", desc: "Classic restorations & undercarriages", baseRate: 220 },
  { id: "marine", emoji: "🛥️", title: "Marine", desc: "Hull cleaning & engine rooms", baseRate: 285 },
  { id: "industrial", emoji: "🏗️", title: "Industrial", desc: "Production lines & heavy machinery", baseRate: 340 },
];

const SIZES: { id: SizeId; label: string; sub: string; hours: number }[] = [
  { id: "small", label: "Small", sub: "≤ 4 hrs", hours: 3 },
  { id: "medium", label: "Medium", sub: "4–8 hrs", hours: 6 },
  { id: "large", label: "Large", sub: "8+ hrs", hours: 10 },
];

const CONDITIONS: { id: ConditionId; label: string; sub: string; mult: number }[] = [
  { id: "light", label: "Light", sub: "Surface dust", mult: 1.0 },
  { id: "moderate", label: "Moderate", sub: "Grease & grime", mult: 1.25 },
  { id: "heavy", label: "Heavy", sub: "Rust & buildup", mult: 1.55 },
];

export const QuoteWidget = () => {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [size, setSize] = useState<SizeId | null>(null);
  const [condition, setCondition] = useState<ConditionId | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalSteps = 3;
  const progress = (Math.min(step, totalSteps) / totalSteps) * 100;

  const quote = useMemo(() => {
    if (!category || !size || !condition) return null;
    const cat = CATEGORIES.find((c) => c.id === category)!;
    const sz = SIZES.find((s) => s.id === size)!;
    const cn = CONDITIONS.find((c) => c.id === condition)!;
    const subtotal = cat.baseRate * sz.hours * cn.mult;
    const low = Math.round((subtotal * 0.9) / 25) * 25;
    const high = Math.round((subtotal * 1.15) / 25) * 25;
    return { low, high, hours: sz.hours, category: cat.title, size: sz.label, condition: cn.label };
  }, [category, size, condition]);

  const reset = () => {
    setStep(1);
    setCategory(null);
    setSize(null);
    setCondition(null);
    setShowQuote(false);
    setCopied(false);
  };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setShowQuote(true);
    }, 900);
  };

  const copyQuote = async () => {
    if (!quote) return;
    const text = `DryJet Solutions — Estimated Quote
Service: ${quote.category}
Job size: ${quote.size} (~${quote.hours} hrs)
Condition: ${quote.condition}
Estimated range: $${quote.low.toLocaleString()} – $${quote.high.toLocaleString()}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canAdvance =
    (step === 1 && !!category) || (step === 2 && !!size) || (step === 3 && !!condition);

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-5 flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
            / Instant Quote
          </div>
          <h3 className="mt-2 text-2xl font-light leading-tight">
            {showQuote ? "Your estimate" : "Configure your job"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {showQuote
              ? "Indicative range based on 2026 market data."
              : `Step ${Math.min(step, totalSteps)} of ${totalSteps}`}
          </p>
        </div>
        <div className="h-10 w-10 rounded-full glass-primary flex items-center justify-center shrink-0">
          <Snowflake size={18} strokeWidth={1.5} />
        </div>
      </div>

      {/* Progress */}
      <div className="h-[3px] bg-white/5 relative">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(var(--brand-cyan))] to-[hsl(var(--brand-blue))] transition-[width] duration-500"
          style={{ width: `${showQuote ? 100 : progress}%` }}
        />
      </div>

      {/* Body */}
      <div className="p-6">
        {!showQuote && step === 1 && (
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Choose your category
            </div>
            {CATEGORIES.map((c) => {
              const selected = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`w-full text-left rounded-xl px-4 py-4 flex items-center gap-4 transition-all border ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="flex-1">
                    <span className="block text-foreground">{c.title}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{c.desc}</span>
                  </span>
                  {selected && <Check size={16} className="text-primary" />}
                </button>
              );
            })}
          </div>
        )}

        {!showQuote && step === 2 && (
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Estimated job size
            </div>
            {SIZES.map((s) => {
              const selected = size === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSize(s.id)}
                  className={`w-full text-left rounded-xl px-4 py-4 flex items-center justify-between transition-all border ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span>
                    <span className="block text-foreground">{s.label}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{s.sub}</span>
                  </span>
                  {selected && <Check size={16} className="text-primary" />}
                </button>
              );
            })}
          </div>
        )}

        {!showQuote && step === 3 && (
          <div className="space-y-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Surface condition
            </div>
            {CONDITIONS.map((c) => {
              const selected = condition === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCondition(c.id)}
                  className={`w-full text-left rounded-xl px-4 py-4 flex items-center justify-between transition-all border ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
                  }`}
                >
                  <span>
                    <span className="block text-foreground">{c.label}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{c.sub}</span>
                  </span>
                  {selected && <Check size={16} className="text-primary" />}
                </button>
              );
            })}
          </div>
        )}

        {showQuote && quote && (
          <div className="space-y-5">
            <div className="rounded-xl glass-primary p-6 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest opacity-80">
                Estimated range
              </div>
              <div className="mt-2 text-4xl font-light tracking-tight">
                ${quote.low.toLocaleString()}
                <span className="text-2xl opacity-70"> – </span>
                ${quote.high.toLocaleString()}
              </div>
              <div className="mt-2 text-xs opacity-80">
                ~{quote.hours} hrs · {quote.category} · {quote.condition}
              </div>
            </div>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Service</span>
                <span className="text-foreground">{quote.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Job size</span>
                <span className="text-foreground">{quote.size}</span>
              </div>
              <div className="flex justify-between">
                <span>Condition</span>
                <span className="text-foreground">{quote.condition}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <div className="px-6 pb-6 pt-2">
        {!showQuote ? (
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button
              type="button"
              disabled={!canAdvance || generating}
              onClick={() => {
                if (step < totalSteps) setStep((s) => s + 1);
                else generate();
              }}
              className="flex-1 glass-primary rounded-xl py-3 text-sm font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
            >
              {generating ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Calculating
                </>
              ) : step < totalSteps ? (
                <>
                  Continue
                  <ArrowUpRight size={16} />
                </>
              ) : (
                <>
                  Generate Quote
                  <ArrowUpRight size={16} />
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl px-4 py-3 text-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw size={14} />
              Start over
            </button>
            <button
              type="button"
              onClick={copyQuote}
              className="flex-1 glass-primary rounded-xl py-3 text-sm font-medium inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied" : "Copy quote"}
            </button>
          </div>
        )}
      </div>

      <div className="px-6 pb-5 pt-2 border-t border-white/5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
          Powered by DryJet AI · Market Data 2026
        </div>
      </div>
    </div>
  );
};

export default QuoteWidget;
