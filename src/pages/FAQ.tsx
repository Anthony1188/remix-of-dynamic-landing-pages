import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    category: "The Technology",
    items: [
      {
        q: "What is dry ice blasting?",
        a: "Dry ice blasting accelerates pellets of solid CO₂ (dry ice) to supersonic speeds using compressed air. On impact, the pellets sublimate — transitioning directly from solid to gas — lifting contaminants from the substrate without leaving any secondary residue. The result is a dry, clean surface with zero water or chemical waste.",
      },
      {
        q: "Is it safe for sensitive surfaces like carbon fiber, leather, or electronics?",
        a: "Yes. Dry ice blasting is non-abrasive and non-conductive. Our technicians calibrate pellet size, pressure, and nozzle distance per surface type. Carbon fiber, Alcantara, gelcoat, and sealed electronics are all within our service envelope — we've cleaned them hundreds of times.",
      },
      {
        q: "Does dry ice blasting use water?",
        a: "No. Zero water is used in the process. The CO₂ pellets sublimate on contact, leaving the surface completely dry. This makes it ideal for environments where moisture is a concern — engine bays, electrical panels, and pharmaceutical equipment.",
      },
      {
        q: "What happens to the CO₂ after cleaning?",
        a: "It returns to the atmosphere as gas. Dry ice is made from recaptured CO₂ that would otherwise be released during industrial processes, so using it for cleaning has a net-neutral carbon footprint. There is no secondary waste stream to manage.",
      },
    ],
  },
  {
    category: "Services & Pricing",
    items: [
      {
        q: "How do I get a quote?",
        a: "Use our online QuoteWidget on the Contact page to receive an instant estimate. For a binding fixed quote, submit a project brief and a senior technician will respond within one business day with scope, scheduling, and pricing.",
      },
      {
        q: "Do you offer mobile service?",
        a: "Yes — all of our services are mobile. We come to your garage, marina slip, facility, or job site. We operate across the Tampa Bay region and surrounding coastal areas, with extended coverage available for large-scale industrial contracts.",
      },
      {
        q: "What is your pricing structure?",
        a: "We price per project, not per hour. After reviewing your brief, we issue a fixed quote that covers labor, equipment, and travel within our service area. There are no hidden fees. Automotive jobs typically start at $1,100; marine and industrial projects are quoted individually based on scope.",
      },
      {
        q: "Do you offer service contracts for industrial clients?",
        a: "Yes. We offer recurring service agreements for cold-chain, pharmaceutical, and food processing clients that require scheduled sanitation cycles. Contact us to discuss cadence, SLA terms, and volume pricing.",
      },
    ],
  },
  {
    category: "Logistics & Compliance",
    items: [
      {
        q: "Are you insured?",
        a: "Yes. DryJet Solutions carries full commercial general liability insurance and marine-rated equipment coverage. Certificates of insurance are available upon request for marina operators, facility managers, and corporate clients.",
      },
      {
        q: "Can you operate in FDA-regulated or pharmaceutical environments?",
        a: "Yes. Our industrial cold-chain protocols are designed for regulated environments. We follow documented cleaning procedures, maintain technician certification records, and can provide compliance documentation for audit purposes.",
      },
      {
        q: "What is your service area?",
        a: "Our primary service area is the Tampa Bay region and Florida's Gulf Coast. We regularly serve clients in Sarasota, Fort Myers, Naples, and the Florida Keys. For large industrial contracts, we can mobilize nationally.",
      },
      {
        q: "How long does a typical job take?",
        a: "Automotive jobs typically take 3–6 hours depending on scope. Marine jobs range from 4–10 hours. Industrial sanitation projects are scheduled based on facility size and production windows. We work within your schedule to minimize downtime.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="font-display text-[0.9rem] uppercase tracking-tight text-foreground group-hover:text-brand-cyan transition-colors duration-300">
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted-foreground shrink-0 mt-0.5 transition-transform duration-300 ${open ? "rotate-180 text-brand-cyan" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm text-[hsl(216_11%_72%)] leading-relaxed font-light">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ — DryJet Solutions";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute left-[10%] top-[30%] h-[180px] w-[180px] rounded-full bg-brand-cyan/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
          <span className="eyebrow">/ FAQ</span>
          <h1 className="mt-7 font-display uppercase text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] leading-[0.95] tracking-[-0.05em] max-w-4xl">
            Questions, <br />
            <span className="text-brand-cyan">answered precisely.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-[hsl(216_11%_72%)] leading-relaxed font-light">
            Everything you need to know about dry ice blasting, our service
            process, pricing, and compliance — answered by our senior technicians.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqs.map((section, si) => (
        <section key={section.category} className="border-b border-border">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-1">
                {`SEC.0${si + 1}`}
              </span>
              <h2 className="mt-6 font-display uppercase text-xl tracking-tight text-foreground">
                {section.category}
              </h2>
            </div>
            <div className="lg:col-span-8">
              {section.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <h2 className="font-display uppercase text-[2rem] sm:text-[2.6rem] md:text-[3.4rem] leading-[1.02] tracking-tight">
              Still have questions? <br />
              <span className="text-brand-cyan">Talk to a technician.</span>
            </h2>
            <div className="lg:pl-12">
              <p className="text-[hsl(216_11%_72%)] text-base leading-relaxed font-light">
                Our team responds to every inquiry within one business day. No
                sales scripts — just honest answers from the people who do the work.
              </p>
              <Link
                to="/contact"
                className="mt-8 group inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card/90 border border-border hover-gold"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                  <span>Contact Us</span>
                </span>
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
