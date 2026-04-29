import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { QuoteWidget } from "@/components/QuoteWidget";

const services = ["Automotive", "Marine & Yacht", "Industrial Cold-Chain", "Other"];

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact — DryJet Solutions";
  }, []);

  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="eyebrow">/ Contact</span>
          <h1 className="mt-7 font-display uppercase text-[2.2rem] sm:text-[2.8rem] md:text-[3.6rem] leading-[0.95] tracking-[-0.05em]">
            Tell us what needs <br />
            <span className="text-brand-cyan">restoring.</span>
          </h1>
          <p className="mt-8 text-[hsl(216_11%_72%)] leading-relaxed font-light">
            Submit a brief, and a senior technician will respond within one
            business day with scope, scheduling, and a fixed quote.
          </p>
          <div className="mt-12 space-y-6">
            {[
              { Icon: Mail, label: "Email", v: "service@dryjetsolutions.com" },
              { Icon: Phone, label: "Phone", v: "+1 (555) 379-5388" },
              { Icon: MapPin, label: "Service area", v: "Mobile · Coastal & inland" },
            ].map(({ Icon, label, v }) => (
              <div key={label} className="flex items-start gap-4">
                <Icon size={16} className="text-brand-cyan mt-1" strokeWidth={1.5} />
                <div>
                  <div className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="text-foreground mt-2 font-light">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-8">
          <QuoteWidget />
          {submitted ? (
            <div className="bg-card border border-border p-10">
              <div className="font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan">
                / Received
              </div>
              <h2 className="mt-4 font-display uppercase text-2xl tracking-tight">Thank you.</h2>
              <p className="mt-4 text-[hsl(216_11%_72%)] font-light">
                Your brief is in our queue. A technician will be in touch within
                one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-display text-brand-cyan hover:text-brand-gold transition-colors"
              >
                Submit another
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3"
            >
              {[
                { name: "name", label: "Full name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: false },
                { name: "asset", label: "Asset / vehicle / facility", type: "text", required: false },
              ].map((f) => (
                <div key={f.name} className="bg-card border border-border px-6 pt-5 pb-4 transition-colors focus-within:border-brand-cyan/45">
                  <label className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {f.label}{f.required && <span className="text-brand-cyan"> *</span>}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className="block w-full mt-2 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              ))}
              <div className="bg-card border border-border px-6 pt-5 pb-4 transition-colors focus-within:border-brand-cyan/45">
                <label className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Service interest
                </label>
                <select
                  name="service"
                  className="block w-full mt-2 bg-transparent border-none outline-none text-foreground"
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-background">{s}</option>
                  ))}
                </select>
              </div>
              <div className="bg-card border border-border px-6 pt-5 pb-4 transition-colors focus-within:border-brand-cyan/45">
                <label className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Project brief
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="block w-full mt-2 bg-transparent border-none outline-none text-foreground resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us about the asset and the desired outcome…"
                />
              </div>
              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center gap-4 px-7 py-5 text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card border border-border hover-gold"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                  <span>Send Brief</span>
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
