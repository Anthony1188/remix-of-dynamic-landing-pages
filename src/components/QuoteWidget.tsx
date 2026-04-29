import { useState } from "react";
import { ChevronRight, Download, RotateCcw, Snowflake, Zap } from "lucide-react";
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
    <div className="bg-card border border-border overflow-hidden">
      {/* Brand hero */}
      <div className="bg-background px-6 py-8 flex items-center justify-center border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 border border-brand-cyan/40 bg-card flex items-center justify-center text-brand-cyan">
            <Snowflake size={18} strokeWidth={1.5} />
          </div>
          <div className="leading-none">
            <div className="font-display text-xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-ice">
              DRYJET
            </div>
            <div className="mt-2 font-display text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Solutions
            </div>
          </div>
        </div>
      </div>

      {!estimate ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <div className="font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan">
              / Technician Analysis
            </div>
            <h3 className="mt-3 font-display uppercase text-lg leading-tight tracking-tight">
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
            className="w-full group bg-card border border-border py-4 px-5 inline-flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.18em] font-display text-foreground hover-gold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-foreground/20 border-t-brand-cyan animate-spin" />
                Analyzing project…
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-3">
                  <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                  <span>Get my DryJet quote</span>
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="p-6 space-y-5">
          <div className="bg-background border border-brand-cyan/40 p-6">
            <div className="flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan">
              <Zap size={12} />
              Official estimate for {estimate.customer}
            </div>
            <div className="mt-4 font-display text-3xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-ice">
              ${estimate.low.toLocaleString()}
              <span className="text-2xl text-muted-foreground"> – </span>
              ${estimate.high.toLocaleString()}
            </div>
            <div className="mt-3 text-xs text-muted-foreground font-light">
              ~{estimate.hours} hrs · {estimate.category} · Ref {estimate.reference}
            </div>
          </div>

          <div className="space-y-2 text-xs text-muted-foreground font-light">
            <SummaryRow label="Asset" value={estimate.asset} />
            <SummaryRow label="Email" value={estimate.email} />
            <SummaryRow label="Issued" value={estimate.date} />
          </div>

          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={downloadPdf}
              className="w-full group bg-card border border-border py-3.5 px-5 inline-flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] font-display text-foreground hover-gold"
            >
              <Download size={14} />
              Download official PDF report
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full py-3 px-5 border border-border bg-background/40 hover:bg-card transition-colors inline-flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.18em] font-display text-muted-foreground"
            >
              <RotateCcw size={12} />
              Cancel & start a new quote
            </button>
          </div>
        </div>
      )}

      <div className="px-6 pb-5 pt-4 border-t border-border">
        <div className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center">
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
  <div className="border border-border bg-background/40 px-4 pt-3 pb-3 focus-within:border-brand-cyan/45 transition-colors">
    <label className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      {label}
      {required && <span className="text-brand-cyan"> *</span>}
    </label>
    <div className="mt-2">{children}</div>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between gap-4">
    <span>{label}</span>
    <span className="text-foreground text-right truncate max-w-[60%]">{value}</span>
  </div>
);

export default QuoteWidget;
