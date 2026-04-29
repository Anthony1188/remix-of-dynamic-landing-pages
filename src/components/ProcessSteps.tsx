import { motion } from "framer-motion";
import { ClipboardList, Wrench, Truck, CheckCircle2 } from "lucide-react";

const steps = [
  {
    no: "01",
    Icon: ClipboardList,
    title: "Submit a Brief",
    desc: "Fill out our project form with your asset details, service interest, and scope. No commitment required — just the facts.",
  },
  {
    no: "02",
    Icon: Wrench,
    title: "Expert Assessment",
    desc: "A senior DryJet technician reviews your brief and issues a fixed quote within one business day. No hidden fees.",
  },
  {
    no: "03",
    Icon: Truck,
    title: "Mobile Deployment",
    desc: "We come to you — dockside, in your garage, at your facility. Our fully equipped rigs arrive on schedule.",
  },
  {
    no: "04",
    Icon: CheckCircle2,
    title: "Certified Delivery",
    desc: "Every job is documented and signed off by a certified technician. You receive a completion report with before/after notes.",
  },
];

export const ProcessSteps = () => (
  <section className="border-t border-border bg-background relative overflow-hidden">
    <div className="absolute left-[5%] top-[40%] h-[200px] w-[200px] rounded-full bg-brand-cyan/4 blur-[100px]" />
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
      <div className="mb-16">
        <span className="eyebrow">/ How It Works</span>
        <h2 className="mt-6 font-display uppercase text-[2rem] sm:text-[2.5rem] md:text-[3.2rem] leading-none tracking-tight">
          Four steps to <br />
          <span className="text-brand-cyan">factory-floor clean.</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.no}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border p-8 relative group hover:border-brand-cyan/30 transition-colors duration-500"
          >
            {/* Step number watermark */}
            <span className="absolute top-5 right-6 font-display text-[3.5rem] leading-none text-border/60 select-none pointer-events-none">
              {s.no}
            </span>
            <s.Icon size={24} className="text-brand-cyan relative z-10" strokeWidth={1.5} />
            <h3 className="mt-6 font-display uppercase text-[0.95rem] tracking-tight text-foreground relative z-10">
              {s.title}
            </h3>
            <p className="mt-3 text-sm text-[hsl(216_11%_72%)] leading-relaxed font-light relative z-10">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSteps;
