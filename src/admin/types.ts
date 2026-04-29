// ─── Admin Data Types ────────────────────────────────────────────────────────
// These types mirror the Supabase schema. When connecting to Supabase,
// replace the mock store with the generated Database types.

export type LeadStatus = "new" | "contacted" | "qualified" | "lost";
export type QuoteStatus = "pending" | "sent" | "approved" | "declined" | "completed";
export type ServiceType = "automotive" | "marine" | "industrial" | "other";
export type Priority = "low" | "medium" | "high";

export interface Lead {
  id: string;
  created_at: string;
  updated_at: string;
  // Contact info
  name: string;
  email: string;
  phone: string;
  company?: string;
  // Lead details
  service_type: ServiceType;
  message: string;
  source: "contact_form" | "quote_widget" | "referral" | "direct";
  status: LeadStatus;
  priority: Priority;
  // Admin notes
  notes?: string;
  assigned_to?: string;
  follow_up_date?: string;
  // Linked quote
  quote_id?: string;
}

export interface Quote {
  id: string;
  created_at: string;
  updated_at: string;
  // Reference
  quote_number: string;
  lead_id?: string;
  // Client info
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company?: string;
  // Service details
  service_type: ServiceType;
  asset_description: string;
  location: string;
  scheduled_date?: string;
  // Pricing
  line_items: QuoteLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  // Status
  status: QuoteStatus;
  valid_until?: string;
  // Notes
  internal_notes?: string;
  client_notes?: string;
}

export interface QuoteLineItem {
  id: string;
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  leads_this_week: number;
  leads_change_pct: number;
  total_quotes: number;
  pending_quotes: number;
  approved_quotes: number;
  total_revenue: number;
  revenue_this_month: number;
  revenue_change_pct: number;
  conversion_rate: number;
}
