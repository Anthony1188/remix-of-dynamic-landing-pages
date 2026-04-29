import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: "T.01",
    quote:
      "They cleaned my 1969 Ferrari Dino engine bay without removing a single component. The result was factory-floor perfect. I've never seen anything like it.",
    name: "Marcus R.",
    role: "Private Collector · Scottsdale, AZ",
  },
  {
    id: "T.02",
    quote:
      "Our 78-foot sportfish had a bilge that hadn't been properly cleaned in six years. DryJet Solutions came dockside, used zero chemicals, and left no waste in the water. Remarkable.",
    name: "Capt. James T.",
    role: "Yacht Owner · Fort Lauderdale, FL",
  },
  {
    id: "T.03",
    quote:
      "We run a pharmaceutical cold-chain facility under FDA oversight. DryJet's protocols are the only cleaning service that meets our sanitation standards without downtime.",
    name: "Dr. Alicia M.",
    role: "Operations Director · Tampa, FL",
  },
];

export const Testimonials = () => (
  <section className="border-t border-border bg-background relative overflow-hidden">
    <div className="absolute right-[5%] top-[30%] h-[200px] w-[200px] rounded-full bg-brand-gold/5 blur-[100px]" />
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
        <div>
          <span className="eyebrow">/ Client Testimonials</span>
          <h2 className="mt-6 font-display uppercase text-[2rem] sm:text-[2.5rem] md:text-[3.2rem] leading-none tracking-tight">
            Trusted by the <br />
            <span className="text-brand-cyan">most demanding clients.</span>
          </h2>
        </div>
        <div className="flex gap-2 mb-2">
          <div className="w-2 h-2 bg-border" />
          <div className="w-2 h-2 bg-brand-cyan" />
          <div className="w-2 h-2 bg-brand-gold" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="bg-card border border-border p-8 flex flex-col gap-6 hover:border-brand-cyan/30 transition-colors duration-500"
          >
            <div className="flex items-start justify-between">
              <Quote size={20} className="text-brand-cyan/50" strokeWidth={1.5} />
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {t.id}
              </span>
            </div>
            <p className="text-[hsl(216_11%_78%)] leading-relaxed font-light text-sm flex-1">
              "{t.quote}"
            </p>
            <div className="border-t border-border pt-5">
              <div className="font-display text-[11px] uppercase tracking-[0.15em] text-foreground">
                {t.name}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-display">
                {t.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
