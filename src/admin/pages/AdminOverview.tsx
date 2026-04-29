import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { TrendingUp, Users, FileText, DollarSign, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { useDashboardStats } from "../useAdminData";
import { mockLeads, mockQuotes } from "../mockData";
import { formatCurrency, formatDate, LEAD_STATUS_CONFIG, QUOTE_STATUS_CONFIG, timeAgo } from "../utils";

export default function AdminOverview() {
  const { stats, leadsOverTime, revenueOverTime, serviceBreakdown } = useDashboardStats();

  const recentLeads = [...mockLeads].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);
  const recentQuotes = [...mockQuotes].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <p className="eyebrow mb-3">Dashboard</p>
        <h1 className="font-display uppercase text-2xl tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1 font-light">
          {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(new Date())}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Leads",
            value: stats.total_leads,
            sub: `${stats.new_leads} new`,
            change: `+${stats.leads_change_pct}%`,
            icon: Users,
            color: "text-brand-cyan",
            positive: true,
          },
          {
            label: "Open Quotes",
            value: stats.pending_quotes,
            sub: `${stats.approved_quotes} approved`,
            change: `${stats.total_quotes} total`,
            icon: FileText,
            color: "text-brand-gold",
            positive: true,
          },
          {
            label: "Revenue (MTD)",
            value: formatCurrency(stats.revenue_this_month),
            sub: "This month",
            change: `+${stats.revenue_change_pct}%`,
            icon: DollarSign,
            color: "text-green-400",
            positive: true,
          },
          {
            label: "Conversion Rate",
            value: `${stats.conversion_rate}%`,
            sub: "Lead → Quote",
            change: "+4% vs last mo.",
            icon: TrendingUp,
            color: "text-blue-400",
            positive: true,
          },
        ].map((kpi) => (
          <div key={kpi.label} className="glass p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-display text-2xl tracking-tight text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground font-light mt-0.5">{kpi.sub}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="w-3 h-3 text-green-400" />
              <span className="text-[10px] font-display text-green-400">{kpi.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="eyebrow mb-1">Revenue</p>
              <h3 className="font-display uppercase text-sm tracking-tight">Monthly Revenue Trend</h3>
            </div>
            <span className="font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(204 100% 81%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(204 100% 81%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 11% 11%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(216 11% 70%)", fontFamily: "Michroma" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(216 11% 70%)", fontFamily: "Michroma" }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: "hsl(220 11% 5%)", border: "1px solid hsl(220 11% 11%)", borderRadius: 0, fontFamily: "Michroma", fontSize: 11 }}
                formatter={(v: number) => [formatCurrency(v), "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="hsl(204 100% 81%)" strokeWidth={1.5} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Breakdown Pie */}
        <div className="glass p-6">
          <div className="mb-6">
            <p className="eyebrow mb-1">Services</p>
            <h3 className="font-display uppercase text-sm tracking-tight">Revenue by Service</h3>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                {serviceBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "hsl(220 11% 5%)", border: "1px solid hsl(220 11% 11%)", borderRadius: 0, fontFamily: "Michroma", fontSize: 11 }}
                formatter={(v: number) => [`${v}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {serviceBreakdown.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="font-light text-muted-foreground">{s.name}</span>
                </div>
                <span className="font-display text-[10px] text-foreground">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leads + Quotes Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads Over Time Bar Chart */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="eyebrow mb-1">Pipeline</p>
              <h3 className="font-display uppercase text-sm tracking-tight">Leads vs Quotes</h3>
            </div>
            <Link to="/admin/leads" className="font-display text-[9px] uppercase tracking-[0.15em] text-brand-cyan hover:text-brand-gold transition-colors">
              View All →
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={leadsOverTime} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 11% 11%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(216 11% 70%)", fontFamily: "Michroma" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(216 11% 70%)", fontFamily: "Michroma" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(220 11% 5%)", border: "1px solid hsl(220 11% 11%)", borderRadius: 0, fontFamily: "Michroma", fontSize: 11 }} />
              <Bar dataKey="leads" fill="hsl(204 100% 81% / 0.7)" name="Leads" />
              <Bar dataKey="quotes" fill="hsl(36 47% 62% / 0.7)" name="Quotes" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="eyebrow mb-1">Activity</p>
              <h3 className="font-display uppercase text-sm tracking-tight">Recent Leads</h3>
            </div>
            <Link to="/admin/leads" className="font-display text-[9px] uppercase tracking-[0.15em] text-brand-cyan hover:text-brand-gold transition-colors">
              View All →
            </Link>
          </div>
          <div className="space-y-3">
            {recentLeads.map(lead => {
              const cfg = LEAD_STATUS_CONFIG[lead.status];
              return (
                <div key={lead.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-7 h-7 bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-display text-[9px] text-brand-cyan uppercase">
                      {lead.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-medium text-foreground truncate">{lead.name}</p>
                      <span className={`shrink-0 px-1.5 py-0.5 text-[9px] font-display uppercase tracking-[0.1em] border ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-light truncate">{lead.service_type} · {timeAgo(lead.created_at)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="eyebrow mb-1">Quotes</p>
            <h3 className="font-display uppercase text-sm tracking-tight">Recent Quotes</h3>
          </div>
          <Link to="/admin/quotes" className="font-display text-[9px] uppercase tracking-[0.15em] text-brand-cyan hover:text-brand-gold transition-colors">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {["Quote #", "Client", "Service", "Total", "Status", "Date"].map(h => (
                  <th key={h} className="text-left font-display text-[9px] uppercase tracking-[0.15em] text-muted-foreground pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentQuotes.map(q => {
                const cfg = QUOTE_STATUS_CONFIG[q.status];
                return (
                  <tr key={q.id} className="hover:bg-card/50 transition-colors">
                    <td className="py-3 pr-4 font-display text-[10px] text-brand-cyan">{q.quote_number}</td>
                    <td className="py-3 pr-4 font-light text-foreground">{q.client_name}</td>
                    <td className="py-3 pr-4 text-muted-foreground capitalize">{q.service_type}</td>
                    <td className="py-3 pr-4 font-display text-[11px]">{formatCurrency(q.total)}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 text-[9px] font-display uppercase tracking-[0.1em] border ${cfg.bg} ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{formatDate(q.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
