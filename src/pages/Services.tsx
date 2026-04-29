import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Check } from "lucide-react";
import autoImg from "@/assets/service-auto.jpg";
import marineImg from "@/assets/service-marine.jpg";
import coldImg from "@/assets/service-coldchain.jpg";

const sections = [
  {
    no: "SVC.01",
    title: "Automotive",
    tagline: "Concours-grade. Carbon-safe.",
    img: autoImg,
    body: "We service supercars, classics, vintage exotics, and luxury SUVs. Our technicians treat every chassis like it's headed for Pebble Beach.",
    items: [
      "Engine bay restoration (no masking)",
      "Undercarriage & suspension cleaning",
      "Interior leather, Alcantara & trim",
      "Wheel & brake caliper detailing",
      "Pre-sale concours preparation",
      "Carbon fiber & ceramic-safe",
    ],
  },
  {
    no: "SVC.02",
    title: "Marine & Yacht",
    tagline: "Dockside. Zero runoff.",
    img: marineImg,
    body: "Operate within marine-protected waters with confidence. Dry ice leaves no chemicals in the harbor and no abrasion on gelcoat.",
    items: [
      "Hull & gelcoat restoration",
      "Teak deck cleaning",
      "Engine room degreasing",
      "Bilge & propeller service",
      "Aluminum & stainless polishing prep",
      "Fully insured marina operations",
    ],
  },
  {
    no: "SVC.03",
    title: "Industrial Cold-Chain",
    tagline: "Full-solution provider.",
    img: coldImg,
    body: "From food processing lines to pharmaceutical clean rooms, we deliver cleaning, sanitation, and on-demand dry ice supply for your supply chain.",
    items: [
      "Production line sanitation",
      "Cold storage & freezer cleaning",
      "Pharmaceutical-grade protocols",
      "Pelletized dry ice delivery",
      "Cold-chain logistics support",
      "24/7 emergency response",
    ],
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Services — DryJet Solutions";
  }, []);

  return (
    <div>
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute right-[10%] top-[20%] h-[180px] w-[180px] rounded-full bg-brand-blue/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
          <span className="eyebrow">/ Services</span>
          <h1 className="mt-7 font-display uppercase text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] leading-[0.95] tracking-[-0.05em] max-w-4xl">
            Precision cleaning for <br />
            <span className="text-brand-cyan">assets that matter.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-[hsl(216_11%_72%)] leading-relaxed font-light">
            One process — solid CO₂ accelerated to supersonic speed — applied
            with the discipline each industry demands.
          </p>
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={s.title} className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover opacity-80 grayscale-[0.3]"
                  loading="lazy"
                />
                <span className="absolute top-6 left-6 text-[10px] uppercase font-display text-brand-cyan tracking-[0.18em] bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-1">
                  {s.no}
                </span>
              </div>
              <div>
                <span className="font-display text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                  {s.tagline}
                </span>
                <h2 className="mt-5 font-display uppercase text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.02] tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-6 text-[hsl(216_11%_72%)] leading-relaxed font-light">{s.body}</p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-light">
                      <Check size={14} className="text-brand-cyan mt-1 shrink-0" strokeWidth={2.5} />
                      <span className="text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-10 group inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card/90 border border-border hover-gold"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                    <span>Request this service</span>
                  </span>
                  <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Services;
