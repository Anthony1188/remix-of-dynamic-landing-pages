import { Link } from "react-router-dom";
import { Snowflake } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <Snowflake className="w-5 h-5 text-brand-cyan" strokeWidth={1.5} />
            <span className="font-display uppercase text-[11px] tracking-[0.18em] text-foreground">
              DryJet <span className="text-muted-foreground">|| Solutions</span>
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm text-[hsl(216_11%_72%)] leading-relaxed font-light">
            Waterless dry ice cleaning and full-spectrum cold-chain solutions
            for the world's most demanding clients.
          </p>
          <p className="mt-8 font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} DryJet Solutions — All rights reserved
          </p>
        </div>
        <div>
          <h4 className="font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan mb-5">
            Navigate
          </h4>
          <ul className="space-y-3 text-sm font-light text-[hsl(216_11%_72%)]">
            <li><Link to="/services" className="hover:text-brand-gold transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-brand-gold transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan mb-5">
            Contact
          </h4>
          <ul className="space-y-3 text-sm font-light text-[hsl(216_11%_72%)]">
            <li>service@dryjetsolutions.com</li>
            <li>+1 (555) 379-5388</li>
            <li>Mon–Sat · By appointment</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
