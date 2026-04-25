import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import autoImg from "@/assets/service-auto.jpg";
import marineImg from "@/assets/service-marine.jpg";
import coldImg from "@/assets/service-coldchain.jpg";

const sections = [
  {
    no: "01",
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
    no: "02",
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
    no: "03",
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / Services
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[0.95] max-w-4xl">
            Precision cleaning for <span className="text-gradient-brand font-medium">assets that matter</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            One process — solid CO₂ accelerated to supersonic speed — applied
            with the discipline each industry demands.
          </p>
        </div>
      </section>

      {sections.map((s, i) => (
        <section key={s.title} className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative aspect-[4/5] overflow-hidden glass rounded-sm">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
                <span className="absolute top-6 left-6 font-mono text-xs text-primary glass rounded-sm px-3 py-1.5">
                  {s.no} / {sections.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                  {s.tagline}
                </span>
                <h2 className="mt-5 text-4xl md:text-5xl font-light leading-tight">
                  {s.title}
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">{s.body}</p>
                <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                      <span className="text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-10 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                >
                  Request this service <ArrowUpRight size={16} />
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
