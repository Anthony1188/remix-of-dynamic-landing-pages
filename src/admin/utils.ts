import type { LeadStatus, QuoteStatus, ServiceType, Priority } from "./types";

// ─── Formatters ───────────────────────────────────────────────────────────────
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount);
}

export function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(iso));
}

export function formatDateTime(iso: string | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(iso));
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

// ─── Status Config ────────────────────────────────────────────────────────────
export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; color: string; bg: string }> = {
  new:       { label: "New",       color: "text-brand-cyan",  bg: "bg-brand-cyan/10 border-brand-cyan/30" },
  contacted: { label: "Contacted", color: "text-blue-400",    bg: "bg-blue-400/10 border-blue-400/30" },
  qualified: { label: "Qualified", color: "text-brand-gold",  bg: "bg-brand-gold/10 border-brand-gold/30" },
  lost:      { label: "Lost",      color: "text-red-400",     bg: "bg-red-400/10 border-red-400/30" },
};

export const QUOTE_STATUS_CONFIG: Record<QuoteStatus, { label: string; color: string; bg: string }> = {
  pending:   { label: "Pending",   color: "text-yellow-400",  bg: "bg-yellow-400/10 border-yellow-400/30" },
  sent:      { label: "Sent",      color: "text-brand-cyan",  bg: "bg-brand-cyan/10 border-brand-cyan/30" },
  approved:  { label: "Approved",  color: "text-green-400",   bg: "bg-green-400/10 border-green-400/30" },
  declined:  { label: "Declined",  color: "text-red-400",     bg: "bg-red-400/10 border-red-400/30" },
  completed: { label: "Completed", color: "text-brand-gold",  bg: "bg-brand-gold/10 border-brand-gold/30" },
};

export const SERVICE_LABELS: Record<ServiceType, string> = {
  automotive: "Automotive",
  marine:     "Marine & Yacht",
  industrial: "Industrial",
  other:      "Other",
};

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string }> = {
  low:    { label: "Low",    color: "text-muted-foreground" },
  medium: { label: "Medium", color: "text-yellow-400" },
  high:   { label: "High",   color: "text-red-400" },
};
