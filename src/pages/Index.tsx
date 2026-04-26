import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Snowflake, Leaf, Gauge, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-auto.jpg";
import marineImg from "@/assets/service-marine.jpg";
import autoImg from "@/assets/service-auto.jpg";
import coldImg from "@/assets/service-coldchain.jpg";

const services = [
  {
    no: "01",
    title: "Automotive",
    desc: "Concours-level restoration for supercars, classics, and exotic interiors. Engine bays, undercarriages, leather and trim — restored without abrasion.",
    img: autoImg,
    to: "/services",
  },
  {
    no: "02",
    title: "Marine & Yacht",
    desc: "Hull, deck, and engine room cleaning dockside. No runoff, no chemicals, no environmental impact on protected waters.",
    img: marineImg,
    to: "/services",
  },
  {
    no: "03",
    title: "Industrial Cold-Chain",
    desc: "Full-solution provider for food processing, pharmaceutical, and logistics. Sanitation, equipment cleaning, and dry ice supply on demand.",
    img: coldImg,
    to: "/services",
  },
];

const stats = [
  { v: "0L", k: "Water used per job" },
  { v: "100%", k: "Sublimation — no waste" },
  { v: "−78°C", k: "Cleaning temperature" },
  { v: "24/7", k: "Cold-chain support" },
];

const Index = () => {
  useEffect(() => {
    document.title = "DryJet Solutions — Waterless Dry Ice Cleaning";
    const desc =
      "Eco-friendly dry ice blasting for supercars, yachts, and industrial cold-chain. Zero water. Zero residue. Total restoration.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden aurora-bg">
        <div className="absolute inset-0 z-[1]">
          <img
            src={heroImg}
            alt="Dry ice cleaning a supercar"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/55 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        <div className="absolute inset-0 grid-lines opacity-40 z-[2]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-28 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Eco · Waterless · Precision
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight">
              Clean by <span className="text-gradient-brand font-medium">sublimation</span>.
              <br />
              Restored to <em className="not-italic font-normal">factory</em>.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
              DryJet Solutions delivers concours-grade dry ice cleaning for high-end
              automotive, marine, and industrial cold-chain clients. No water. No
              chemicals. No residue.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-4 glass-primary rounded-md font-medium text-sm tracking-wide hover:brightness-110 transition-all group"
              >
                Request a Quote
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-7 py-4 glass rounded-md text-foreground font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 inset-x-0 glass border-x-0 border-b-0">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.k}
                className={`py-6 ${i > 0 ? "md:border-l border-border" : ""} ${i % 2 === 1 ? "border-l border-border md:border-l" : ""}`}
              >
                <div className="font-display text-3xl md:text-4xl font-light text-gradient-brand">
                  {s.v}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / WHY */}
      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
              / The Method
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl font-light leading-tight">
              Solid CO₂ at <span className="text-gradient-brand font-medium">Mach speed</span>.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Pellets of food-grade dry ice are accelerated against the surface,
              sublimating on impact. Contaminants lift away — the substrate
              remains untouched, dry, and ready in a fraction of the time.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { Icon: Leaf, t: "Eco-friendly", d: "No water, no solvents, no secondary waste stream." },
              { Icon: Gauge, t: "Non-abrasive", d: "Safe on carbon fiber, electronics, leather, and gelcoat." },
              { Icon: Snowflake, t: "Sublimating", d: "CO₂ returns to atmosphere — no cleanup of the cleaner." },
              { Icon: ShieldCheck, t: "Insured & certified", d: "Trained technicians, marine-rated equipment, full coverage." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="glass glass-hover rounded-sm p-8">
                <Icon className="text-primary" size={28} strokeWidth={1.5} />
                <h3 className="mt-5 text-lg font-medium">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                / Capabilities
              </span>
              <h2 className="mt-6 text-4xl md:text-5xl font-light leading-tight max-w-2xl">
                Three industries. <span className="text-gradient-brand font-medium">One method.</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
            >
              All services <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link to={s.to} className="group block glass glass-hover rounded-sm overflow-hidden">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      width={1024}
                      height={1280}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                    <span className="absolute top-5 left-5 font-mono text-xs text-primary glass rounded-sm px-2.5 py-1">
                      {s.no}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="absolute top-5 right-5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <h3 className="text-2xl font-medium">{s.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <h2 className="text-4xl md:text-6xl font-light leading-[1.05]">
              Your asset deserves the <span className="text-gradient-brand font-medium">cleanest restoration</span> available.
            </h2>
            <div className="lg:pl-12">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Mobile service across the region. Dockside. In your garage. At
                your facility. Tell us what you need cleaned — we bring the
                jet stream.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-2 px-7 py-4 glass-primary rounded-md font-medium text-sm tracking-wide hover:brightness-110 transition-all group"
              >
                Start a Project
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
