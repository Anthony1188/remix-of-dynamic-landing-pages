import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/dryjet-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 md:h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 md:gap-4">
          <img src={logo} alt="DryJet Solutions" className="h-12 md:h-16 w-auto" />
          <span className="font-display text-lg md:text-xl font-semibold tracking-tight leading-none">
            DryJet <span className="text-gradient-brand">Solutions</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <NavLink
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </NavLink>
            );
          })}
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium glass-primary rounded-md hover:brightness-110 transition-all"
        >
          Request Quote
        </Link>
        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center px-5 py-3 text-sm border border-primary/40 text-primary rounded-md"
            >
              Request Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
