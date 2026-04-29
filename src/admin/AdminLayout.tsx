import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, FileText, Settings,
  Snowflake, Menu, X, LogOut, Bell, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", label: "Overview",  icon: LayoutDashboard, end: true },
  { to: "/admin/leads",  label: "Leads",    icon: Users },
  { to: "/admin/quotes", label: "Quotes",   icon: FileText },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "flex flex-col border-r border-border bg-card transition-all duration-300 shrink-0",
          sidebarOpen ? "w-56" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
          <Snowflake className="w-5 h-5 text-brand-cyan shrink-0" strokeWidth={1.5} />
          {sidebarOpen && (
            <span className="font-display uppercase text-[10px] tracking-[0.18em] text-foreground truncate">
              DryJet <span className="text-muted-foreground">Admin</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 text-xs font-display uppercase tracking-[0.12em] transition-colors",
                  isActive
                    ? "text-brand-cyan bg-brand-cyan/8 border-l-2 border-brand-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                )
              }
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 py-4 border-t border-border space-y-1">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-display uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            {sidebarOpen && <span>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border flex items-center gap-4 px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-display uppercase tracking-[0.15em] text-muted-foreground">
            <span>DryJet Solutions</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Admin</span>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-cyan rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                <span className="font-display text-[9px] uppercase text-brand-cyan">AT</span>
              </div>
              <span className="font-display text-[10px] uppercase tracking-[0.12em] text-muted-foreground hidden sm:block">
                Anthony T.
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
