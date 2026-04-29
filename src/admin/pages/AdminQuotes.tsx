import { useState } from "react";
import { Search, X, ChevronRight, Phone, Mail, MapPin, Calendar, FileText, DollarSign } from "lucide-react";
import { useQuotes } from "../useAdminData";
import type { Quote, QuoteStatus } from "../types";
import { QUOTE_STATUS_CONFIG, SERVICE_LABELS, formatCurrency, formatDate, formatDateTime, timeAgo } from "../utils";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { value: QuoteStatus | "all"; label: string }[] = [
  { value: "all",       label: "All Quotes" },
  { value: "pending",   label: "Pending" },
  { value: "sent",      label: "Sent" },
  { value: "approved",  label: "Approved" },
  { value: "declined",  label: "Declined" },
  { value: "completed", label: "Completed" },
];

export default function AdminQuotes() {
  const {
    quotes, search, setSearch,
    statusFilter, setStatusFilter,
    updateStatus, updateNotes,
  } = useQuotes();

  const [selected, setSelected] = useState<Quote | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  function openQuote(q: Quote) {
    setSelected(q);
    setNotesValue(q.internal_notes ?? "");
    setEditingNotes(false);
  }

  function saveNotes() {
    if (!selected) return;
    updateNotes(selected.id, notesValue);
    setSelected(prev => prev ? { ...prev, internal_notes: notesValue } : null);
    setEditingNotes(false);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Main panel */}
      <div className={cn("flex flex-col flex-1 min-w-0 transition-all", selected ? "lg:mr-[28rem]" : "")}>
        {/* Toolbar */}
        <div className="p-6 pb-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow mb-1">Finance</p>
              <h1 className="font-display uppercase text-xl tracking-tight">Quotes</h1>
            </div>
            <div className="font-display text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {quotes.length} result{quotes.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search client, quote number…"
                className="w-full pl-9 pr-4 py-2 bg-card border border-border text-xs font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/50 transition-colors"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as QuoteStatus | "all")}
              className="px-3 py-2 bg-card border border-border text-xs font-display uppercase tracking-[0.1em] text-foreground focus:outline-none focus:border-brand-cyan/50"
            >
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-border">
                {["Quote #", "Client", "Service", "Total", "Status", "Valid Until", ""].map(h => (
                  <th key={h} className="text-left font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {quotes.map(q => {
                const cfg = QUOTE_STATUS_CONFIG[q.status];
                const isSelected = selected?.id === q.id;
                const isExpired = q.valid_until && new Date(q.valid_until) < new Date() && q.status !== "completed" && q.status !== "approved";
                return (
                  <tr
                    key={q.id}
                    onClick={() => openQuote(q)}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-card/60",
                      isSelected && "bg-brand-cyan/5 border-l-2 border-brand-cyan"
                    )}
                  >
                    <td className="px-6 py-4 font-display text-[10px] text-brand-cyan">{q.quote_number}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{q.client_name}</p>
                      {q.client_company && <p className="text-muted-foreground font-light">{q.client_company}</p>}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{SERVICE_LABELS[q.service_type]}</td>
                    <td className="px-6 py-4 font-display text-[11px] text-foreground">{formatCurrency(q.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[9px] font-display uppercase tracking-[0.1em] border ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className={cn("px-6 py-4", isExpired ? "text-red-400" : "text-muted-foreground")}>
                      {formatDate(q.valid_until)}
                      {isExpired && <span className="ml-1 text-[9px]">(expired)</span>}
                    </td>
                    <td className="px-6 py-4">
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-muted-foreground font-light text-sm">
                    No quotes match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed right-0 top-14 bottom-0 w-[28rem] border-l border-border bg-card overflow-y-auto z-20">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <p className="font-display text-[9px] uppercase tracking-[0.18em] text-brand-cyan">{selected.quote_number}</p>
              <p className="text-sm font-medium text-foreground mt-0.5">{selected.client_name}</p>
              {selected.client_company && <p className="text-[10px] text-muted-foreground">{selected.client_company}</p>}
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-6">
            {/* Status workflow */}
            <div>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">Update Status</label>
              <div className="flex flex-wrap gap-2">
                {(["pending", "sent", "approved", "declined", "completed"] as QuoteStatus[]).map(s => {
                  const cfg = QUOTE_STATUS_CONFIG[s];
                  return (
                    <button
                      key={s}
                      onClick={() => { updateStatus(selected.id, s); setSelected(prev => prev ? { ...prev, status: s } : null); }}
                      className={cn(
                        "px-2.5 py-1 text-[9px] font-display uppercase tracking-[0.1em] border transition-all",
                        selected.status === s ? `${cfg.bg} ${cfg.color}` : "border-border text-muted-foreground hover:border-border/80"
                      )}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block">Client Contact</label>
              <a href={`mailto:${selected.client_email}`} className="flex items-center gap-2 text-xs text-foreground hover:text-brand-cyan transition-colors">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                {selected.client_email}
              </a>
              <a href={`tel:${selected.client_phone}`} className="flex items-center gap-2 text-xs text-foreground hover:text-brand-cyan transition-colors">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                {selected.client_phone}
              </a>
              {selected.location && (
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span className="font-light">{selected.location}</span>
                </div>
              )}
            </div>

            {/* Service details */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Service", value: SERVICE_LABELS[selected.service_type] },
                { label: "Created", value: formatDate(selected.created_at) },
                { label: "Valid Until", value: formatDate(selected.valid_until) },
                { label: "Scheduled", value: formatDate(selected.scheduled_date) },
              ].map(d => (
                <div key={d.label}>
                  <p className="font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{d.label}</p>
                  <p className="text-xs text-foreground font-light">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Asset description */}
            <div>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">Asset / Scope</label>
              <p className="text-xs text-muted-foreground font-light leading-relaxed bg-background/50 p-3 border border-border">
                {selected.asset_description}
              </p>
            </div>

            {/* Line items */}
            <div>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-3">
                <DollarSign className="w-3 h-3 inline mr-1" />Line Items
              </label>
              <div className="space-y-2">
                {selected.line_items.map(item => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <p className="text-foreground font-light">{item.description}</p>
                      {item.quantity > 1 && (
                        <p className="text-muted-foreground text-[10px]">{item.quantity} × {formatCurrency(item.unit_price)}</p>
                      )}
                    </div>
                    <p className={cn("font-display text-[11px] shrink-0", item.total < 0 ? "text-red-400" : "text-foreground")}>
                      {formatCurrency(item.total)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(selected.subtotal)}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Tax (7%)</span>
                  <span>{formatCurrency(selected.tax)}</span>
                </div>
                <div className="flex justify-between text-sm font-display text-foreground pt-1">
                  <span className="uppercase tracking-[0.1em] text-[11px]">Total</span>
                  <span className="text-brand-gold">{formatCurrency(selected.total)}</span>
                </div>
              </div>
            </div>

            {/* Client notes */}
            {selected.client_notes && (
              <div>
                <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">Client Notes</label>
                <p className="text-xs text-muted-foreground font-light leading-relaxed bg-background/50 p-3 border border-border">
                  {selected.client_notes}
                </p>
              </div>
            )}

            {/* Internal notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Internal Notes</label>
                {!editingNotes && (
                  <button onClick={() => setEditingNotes(true)} className="font-display text-[9px] uppercase tracking-[0.1em] text-brand-cyan hover:text-brand-gold transition-colors">
                    Edit
                  </button>
                )}
              </div>
              {editingNotes ? (
                <div className="space-y-2">
                  <textarea
                    value={notesValue}
                    onChange={e => setNotesValue(e.target.value)}
                    rows={4}
                    className="w-full p-3 bg-background border border-brand-cyan/40 text-xs font-light text-foreground focus:outline-none resize-none"
                    placeholder="Add internal notes…"
                  />
                  <div className="flex gap-2">
                    <button onClick={saveNotes} className="px-3 py-1.5 bg-brand-cyan/10 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/20 transition-colors">
                      Save
                    </button>
                    <button onClick={() => setEditingNotes(false)} className="px-3 py-1.5 border border-border text-[10px] font-display uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground font-light leading-relaxed bg-background/50 p-3 border border-border min-h-[60px]">
                  {selected.internal_notes || <span className="italic">No notes yet.</span>}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-border flex gap-2">
              <a
                href={`mailto:${selected.client_email}?subject=Quote ${selected.quote_number} — DryJet Solutions`}
                className="flex-1 py-2 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-center"
              >
                Email Client
              </a>
              <button className="flex-1 py-2 border border-brand-gold/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-gold hover:bg-brand-gold/10 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
