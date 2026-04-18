import { Link } from "react-router-dom";
import logo from "@/assets/dryjet-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="DryJet Solutions" className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            Waterless dry ice cleaning and full-spectrum cold-chain solutions
            for the world's most demanding clients.
          </p>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} DRYJET SOLUTIONS — ALL RIGHTS RESERVED
          </p>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            Navigate
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            Contact
          </h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>service@dryjetsolutions.com</li>
            <li>+1 (555) 379-5388</li>
            <li>Mon–Sat · By appointment</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
