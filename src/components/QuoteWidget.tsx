import { useState } from "react";
import { ArrowUpRight, Download, RotateCcw, Snowflake, Zap } from "lucide-react";
import jsPDF from "jspdf";

type CategoryId = "automotive" | "marine" | "industrial";

const CATEGORIES: {
  id: CategoryId;
  label: string;
  baseRate: number; // USD per estimated hour
  baseHours: number;
}[] = [
  { id: "automotive", label: "Automotive", baseRate: 220, baseHours: 5 },
  { id: "marine", label: "Marine / Vessel", baseRate: 285, baseHours: 7 },
  { id: "industrial", label: "Industrial / Heavy", baseRate: 340, baseHours: 9 },
];

interface Estimate {
  reference: string;
  low: number;
  high: number;
  hours: number;
  customer: string;
  email: string;
  category: string;
  asset: string;
  scope: string;
  date: string;
}

export const QuoteWidget = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<CategoryId>("automotive");
  const [asset, setAsset] = useState("");
  const [scope, setScope] = useState("");
  const [generating, setGenerating] = useState(false);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const buildEstimate = (): Estimate => {
    const cat = CATEGORIES.find((c) => c.id === category)!;
    // Rough "intelligence": longer scope description bumps hours.
    const scopeFactor = Math.min(1.6, 1 + scope.trim().split(/\s+/).filter(Boolean).length / 80);
    const hours = Math.max(2, Math.round(cat.baseHours * scopeFactor));
    const subtotal = cat.baseRate * hours;
    const low = Math.round((subtotal * 0.9) / 25) * 25;
    const high = Math.round((subtotal * 1.2) / 25) * 25;
    const reference = `DJ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    return {
      reference,
      low,
      high,
      hours,
      customer: name.trim(),
      email: email.trim(),
      category: cat.label,
      asset: asset.trim() || "—",
      scope: scope.trim() || "—",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setEstimate(buildEstimate());
      setGenerating(false);
    }, 1100);
  };

  const reset = () => {
    setEstimate(null);
  };

  const downloadPdf = () => {
    if (!estimate) return;
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    const pageWidth = doc.internal.pageSize.getWidth();

    // Header bar
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pageWidth, 90, "F");
    doc.setTextColor(56, 189, 248);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("DRYJET", 40, 50);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("SOLUTIONS  ·  Official Estimate", 40, 68);
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.text(`Ref: ${estimate.reference}`, pageWidth - 40, 50, { align: "right" });
    doc.text(estimate.date, pageWidth - 40, 68, { align: "right" });

    // Body
    doc.setTextColor(20, 20, 20);
    let y = 130;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Estimate Summary", 40, y);
    y += 24;

    const row = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(90, 90, 90);
      doc.text(label.toUpperCase(), 40, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);
      const lines = doc.splitTextToSize(value, pageWidth - 220);
      doc.text(lines, 220, y);
      y += Math.max(20, lines.length * 14);
    };

    row("Customer", estimate.customer);
    row("Email", estimate.email);
    row("Category", estimate.category);
    row("Asset", estimate.asset);
    row("Scope", estimate.scope);
    row("Estimated hours", `~${estimate.hours} hours`);

    y += 16;
    doc.setDrawColor(220, 220, 220);
    doc.line(40, y, pageWidth - 40, y);
    y += 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(20, 20, 20);
    doc.text("Estimated Range", 40, y);
    doc.setFontSize(20);
    doc.setTextColor(37, 99, 235);
    doc.text(
      `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}`,
      pageWidth - 40,
      y,
      { align: "right" },
    );

    y += 50;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(110, 110, 110);
    const disclaimer =
      "Estimate based on 2026 market data and the details provided. Final pricing confirmed after on-site assessment by a senior DryJet technician. Valid for 30 days from the date above.";
    doc.text(doc.splitTextToSize(disclaimer, pageWidth - 80), 40, y);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    doc.text(
      "DryJet Solutions LLC  ·  Tampa Bay Operations  ·  service@dryjetsolutions.com",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 30,
      { align: "center" },
    );

    doc.save(`DryJet-Estimate-${estimate.reference}.pdf`);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Brand hero */}
      <div className="bg-black px-6 py-8 flex items-center justify-center border-b border-[hsl(var(--brand-cyan))]/40">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full glass-primary flex items-center justify-center">
            <Snowflake size={20} strokeWidth={1.5} />
          </div>
          <div className="leading-none">
            <div className="text-2xl font-semibold tracking-[0.2em] text-gradient-brand">
              DRYJET
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
              Solutions
            </div>
          </div>
        </div>
      </div>

      {!estimate ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
              / Technician Analysis
            </div>
            <h3 className="mt-2 text-2xl font-light leading-tight">
              Submit your project for an expert quote.
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Customer name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your full name"
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
              />
            </Field>
            <Field label="Email address" required>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Asset category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="w-full bg-transparent border-none outline-none text-foreground"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-background">
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Asset details">
              <input
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                placeholder="e.g. 1967 Mustang chassis"
                className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
              />
            </Field>
          </div>

          <Field label="Project scope & description">
            <textarea
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              rows={4}
              placeholder="Describe the surfaces, contamination, access constraints, and desired outcome…"
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={generating || !name.trim() || !email.trim()}
            className="w-full glass-primary rounded-xl py-4 font-medium text-sm tracking-wide hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            {generating ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Analyzing project…
              </>
            ) : (
              <>
                Get my DryJet quote
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-6 space-y-5">
          <div className="rounded-xl glass-primary p-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest opacity-80">
              <Zap size={12} />
              Official estimate for {estimate.customer}
            </div>
            <div className="mt-3 text-4xl font-light tracking-tight">
              ${estimate.low.toLocaleString()}
              <span className="text-2xl opacity-70"> – </span>
              ${estimate.high.toLocaleString()}
            </div>
            <div className="mt-2 text-xs opacity-80">
              ~{estimate.hours} hrs · {estimate.category} · Ref {estimate.reference}
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground">
            <SummaryRow label="Asset" value={estimate.asset} />
            <SummaryRow label="Email" value={estimate.email} />
            <SummaryRow label="Issued" value={estimate.date} />
          </div>

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={downloadPdf}
              className="w-full glass-primary rounded-xl py-3.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:brightness-110 transition-all"
            >
              <Download size={16} />
              Download official PDF report
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full rounded-xl py-3 text-sm border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors inline-flex items-center justify-center gap-2 text-muted-foreground"
            >
              <RotateCcw size={14} />
              Cancel & start a new quote
            </button>
          </div>
        </div>
      )}

      <div className="px-6 pb-5 pt-2 border-t border-white/5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center">
          DryJet Solutions LLC · Tampa Bay Operations
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 pt-3 pb-3 focus-within:border-primary/60 focus-within:bg-white/[0.06] transition-colors">
    <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {label}
      {required && <span className="text-primary"> *</span>}
    </label>
    <div className="mt-1.5">{children}</div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span>{label}</span>
    <span className="text-foreground text-right truncate max-w-[60%]">{value}</span>
  </div>
);

export default QuoteWidget;
