import { useState } from "react";
import { Search, Filter, X, ChevronRight, Phone, Mail, Calendar, MessageSquare, Tag } from "lucide-react";
import { useLeads } from "../useAdminData";
import type { Lead, LeadStatus } from "../types";
import { LEAD_STATUS_CONFIG, PRIORITY_CONFIG, SERVICE_LABELS, formatDate, formatDateTime, timeAgo } from "../utils";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all",       label: "All Leads" },
  { value: "new",       label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "lost",      label: "Lost" },
];

const SERVICE_OPTIONS = [
  { value: "all",        label: "All Services" },
  { value: "automotive", label: "Automotive" },
  { value: "marine",     label: "Marine & Yacht" },
  { value: "industrial", label: "Industrial" },
];

export default function AdminLeads() {
  const {
    leads, search, setSearch,
    statusFilter, setStatusFilter,
    serviceFilter, setServiceFilter,
    updateStatus, updateNotes, deleteLead,
  } = useLeads();

  const [selected, setSelected] = useState<Lead | null>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");

  function openLead(lead: Lead) {
    setSelected(lead);
    setNotesValue(lead.notes ?? "");
    setEditingNotes(false);
  }

  function saveNotes() {
    if (!selected) return;
    updateNotes(selected.id, notesValue);
    setSelected(prev => prev ? { ...prev, notes: notesValue } : null);
    setEditingNotes(false);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Main panel */}
      <div className={cn("flex flex-col flex-1 min-w-0 transition-all", selected ? "lg:mr-96" : "")}>
        {/* Toolbar */}
        <div className="p-6 pb-4 border-b border-border space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="eyebrow mb-1">CRM</p>
              <h1 className="font-display uppercase text-xl tracking-tight">Leads</h1>
            </div>
            <div className="font-display text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {leads.length} result{leads.length !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, company…"
                className="w-full pl-9 pr-4 py-2 bg-card border border-border text-xs font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/50 transition-colors"
              />
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as LeadStatus | "all")}
              className="px-3 py-2 bg-card border border-border text-xs font-display uppercase tracking-[0.1em] text-foreground focus:outline-none focus:border-brand-cyan/50"
            >
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Service filter */}
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="px-3 py-2 bg-card border border-border text-xs font-display uppercase tracking-[0.1em] text-foreground focus:outline-none focus:border-brand-cyan/50"
            >
              {SERVICE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-border">
                {["Lead", "Service", "Status", "Priority", "Source", "Created", ""].map(h => (
                  <th key={h} className="text-left font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground px-6 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leads.map(lead => {
                const statusCfg = LEAD_STATUS_CONFIG[lead.status];
                const priCfg = PRIORITY_CONFIG[lead.priority];
                const isSelected = selected?.id === lead.id;
                return (
                  <tr
                    key={lead.id}
                    onClick={() => openLead(lead)}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-card/60",
                      isSelected && "bg-brand-cyan/5 border-l-2 border-brand-cyan"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0">
                          <span className="font-display text-[9px] text-brand-cyan uppercase">
                            {lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-muted-foreground font-light">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground capitalize">{SERVICE_LABELS[lead.service_type]}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[9px] font-display uppercase tracking-[0.1em] border ${statusCfg.bg} ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-display text-[10px] uppercase tracking-[0.1em] ${priCfg.color}`}>
                      {priCfg.label}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground capitalize">{lead.source.replace("_", " ")}</td>
                    <td className="px-6 py-4 text-muted-foreground">{timeAgo(lead.created_at)}</td>
                    <td className="px-6 py-4">
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-muted-foreground font-light text-sm">
                    No leads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="fixed right-0 top-14 bottom-0 w-96 border-l border-border bg-card overflow-y-auto z-20">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                <span className="font-display text-[10px] text-brand-cyan uppercase">
                  {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selected.name}</p>
                {selected.company && <p className="text-[10px] text-muted-foreground">{selected.company}</p>}
              </div>
            </div>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-5 space-y-6">
            {/* Status change */}
            <div>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {(["new", "contacted", "qualified", "lost"] as LeadStatus[]).map(s => {
                  const cfg = LEAD_STATUS_CONFIG[s];
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

            {/* Contact info */}
            <div className="space-y-2">
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block">Contact</label>
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-xs text-foreground hover:text-brand-cyan transition-colors">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                {selected.email}
              </a>
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-xs text-foreground hover:text-brand-cyan transition-colors">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                {selected.phone}
              </a>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Service", value: SERVICE_LABELS[selected.service_type] },
                { label: "Priority", value: selected.priority },
                { label: "Source", value: selected.source.replace("_", " ") },
                { label: "Created", value: formatDate(selected.created_at) },
              ].map(d => (
                <div key={d.label}>
                  <p className="font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-1">{d.label}</p>
                  <p className="text-xs text-foreground capitalize font-light">{d.value}</p>
                </div>
              ))}
            </div>

            {/* Follow-up */}
            {selected.follow_up_date && (
              <div className="flex items-center gap-2 p-3 bg-brand-cyan/5 border border-brand-cyan/20">
                <Calendar className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                <div>
                  <p className="font-display text-[9px] uppercase tracking-[0.15em] text-brand-cyan">Follow-up</p>
                  <p className="text-xs text-foreground font-light">{formatDateTime(selected.follow_up_date)}</p>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">
                <MessageSquare className="w-3 h-3 inline mr-1.5" />Message
              </label>
              <p className="text-xs text-muted-foreground font-light leading-relaxed bg-background/50 p-3 border border-border">
                {selected.message}
              </p>
            </div>

            {/* Internal notes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  <Tag className="w-3 h-3 inline mr-1.5" />Internal Notes
                </label>
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
                  {selected.notes || <span className="italic">No notes yet.</span>}
                </p>
              )}
            </div>

            {/* Linked quote */}
            {selected.quote_id && (
              <div className="p-3 bg-brand-gold/5 border border-brand-gold/20 flex items-center justify-between">
                <div>
                  <p className="font-display text-[9px] uppercase tracking-[0.15em] text-brand-gold">Linked Quote</p>
                  <p className="text-xs text-foreground font-light mt-0.5">{selected.quote_id}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-brand-gold" />
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t border-border flex gap-2">
              <button
                onClick={() => { deleteLead(selected.id); setSelected(null); }}
                className="flex-1 py-2 border border-red-400/30 text-[10px] font-display uppercase tracking-[0.1em] text-red-400 hover:bg-red-400/10 transition-colors"
              >
                Delete Lead
              </button>
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 py-2 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/10 transition-colors text-center"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
