import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / Contact
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-light leading-[0.95]">
            Tell us what needs <span className="text-gradient-brand font-medium">restoring</span>.
          </h1>
          <p className="mt-8 text-muted-foreground leading-relaxed">
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
                <Icon size={18} className="text-primary mt-1" strokeWidth={1.5} />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {label}
                  </div>
                  <div className="text-foreground mt-1">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="glass rounded-lg p-10">
              <div className="font-mono text-xs uppercase tracking-widest text-primary">
                / Received
              </div>
              <h2 className="mt-4 text-3xl font-light">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">
                Your brief is in our queue. A technician will be in touch within
                one business day.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 inline-flex items-center gap-2 text-sm text-primary"
              >
                Submit another <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              {[
                { name: "name", label: "Full name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: false },
                { name: "asset", label: "Asset / vehicle / facility", type: "text", required: false },
              ].map((f) => (
                <div key={f.name} className="glass rounded-lg px-6 pt-5 pb-4 focus-within:bg-white/10 transition-colors">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {f.label}{f.required && <span className="text-primary"> *</span>}
                  </label>
                  <input
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    className="block w-full mt-1.5 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              ))}
              <div className="glass rounded-lg px-6 pt-5 pb-4 focus-within:bg-white/10 transition-colors">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Service interest
                </label>
                <select
                  name="service"
                  className="block w-full mt-1.5 bg-transparent border-none outline-none text-foreground"
                >
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-background">{s}</option>
                  ))}
                </select>
              </div>
              <div className="glass rounded-lg px-6 pt-5 pb-4 focus-within:bg-white/10 transition-colors">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Project brief
                </label>
                <textarea
                  name="message"
                  rows={5}
                  className="block w-full mt-1.5 bg-transparent border-none outline-none text-foreground resize-none placeholder:text-muted-foreground/50"
                  placeholder="Tell us about the asset and the desired outcome…"
                />
              </div>
              <button
                type="submit"
                className="w-full glass-primary rounded-lg py-5 font-medium text-sm tracking-wide hover:brightness-110 transition-all inline-flex items-center justify-center gap-2 group"
              >
                Send Brief
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
