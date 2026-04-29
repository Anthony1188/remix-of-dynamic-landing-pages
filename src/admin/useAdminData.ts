import { useState, useCallback } from "react";
import type { Lead, Quote, LeadStatus, QuoteStatus } from "./types";
import { mockLeads, mockQuotes, mockStats, leadsOverTime, revenueOverTime, serviceBreakdown } from "./mockData";

// ─── Leads Hook ───────────────────────────────────────────────────────────────
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  const filtered = leads.filter(l => {
    const matchSearch =
      !search ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    const matchService = serviceFilter === "all" || l.service_type === serviceFilter;
    return matchSearch && matchStatus && matchService;
  });

  const updateStatus = useCallback((id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status, updated_at: new Date().toISOString() } : l));
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, notes, updated_at: new Date().toISOString() } : l));
  }, []);

  const deleteLead = useCallback((id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  }, []);

  return {
    leads: filtered,
    allLeads: leads,
    search, setSearch,
    statusFilter, setStatusFilter,
    serviceFilter, setServiceFilter,
    updateStatus,
    updateNotes,
    deleteLead,
  };
}

// ─── Quotes Hook ──────────────────────────────────────────────────────────────
export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");

  const filtered = quotes.filter(q => {
    const matchSearch =
      !search ||
      q.client_name.toLowerCase().includes(search.toLowerCase()) ||
      q.quote_number.toLowerCase().includes(search.toLowerCase()) ||
      (q.client_company ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = useCallback((id: string, status: QuoteStatus) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status, updated_at: new Date().toISOString() } : q));
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, internal_notes: notes, updated_at: new Date().toISOString() } : q));
  }, []);

  return {
    quotes: filtered,
    allQuotes: quotes,
    search, setSearch,
    statusFilter, setStatusFilter,
    updateStatus,
    updateNotes,
  };
}

// ─── Dashboard Stats Hook ─────────────────────────────────────────────────────
export function useDashboardStats() {
  return {
    stats: mockStats,
    leadsOverTime,
    revenueOverTime,
    serviceBreakdown,
  };
}
