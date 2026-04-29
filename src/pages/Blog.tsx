import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Tag } from "lucide-react";

const posts = [
  {
    id: "blog-01",
    no: "ART.01",
    date: "April 22, 2026",
    category: "Technology",
    title: "Why Dry Ice Blasting Is the Future of Precision Cleaning",
    excerpt:
      "Traditional cleaning methods — pressure washing, chemical solvents, abrasive blasting — all leave something behind. Water, residue, micro-abrasions. Dry ice blasting leaves nothing. Here's the science behind why.",
    readTime: "5 min read",
  },
  {
    id: "blog-02",
    no: "ART.02",
    date: "April 10, 2026",
    category: "Automotive",
    title: "Preparing a Concours Car: What Judges Actually Look For",
    excerpt:
      "Concours d'Elegance judging goes far beyond paint. Engine bays, undercarriages, firewall stampings — every surface tells a story. We break down what the top judges scrutinize and how DryJet gets you there.",
    readTime: "7 min read",
  },
  {
    id: "blog-03",
    no: "ART.03",
    date: "March 28, 2026",
    category: "Marine",
    title: "Zero-Runoff Cleaning in Protected Marine Environments",
    excerpt:
      "Many marinas now prohibit chemical cleaning agents due to environmental regulations. Dry ice blasting is the only method that satisfies both the marina operator and the vessel owner — no runoff, no permits, no compromise.",
    readTime: "6 min read",
  },
  {
    id: "blog-04",
    no: "ART.04",
    date: "March 14, 2026",
    category: "Industrial",
    title: "FDA Compliance and Cold-Chain Sanitation: A Practical Guide",
    excerpt:
      "Food processing and pharmaceutical facilities face increasing FDA scrutiny on sanitation protocols. We outline how dry ice blasting fits into a compliant cleaning program — and what documentation you need to maintain.",
    readTime: "8 min read",
  },
  {
    id: "blog-05",
    no: "ART.05",
    date: "February 27, 2026",
    category: "Technology",
    title: "The Physics of Sublimation: How CO₂ Does the Work",
    excerpt:
      "When a dry ice pellet strikes a contaminated surface at Mach speed, three simultaneous forces act on the contaminant: thermal shock, kinetic impact, and sublimation expansion. Understanding these forces explains why nothing else compares.",
    readTime: "4 min read",
  },
  {
    id: "blog-06",
    no: "ART.06",
    date: "February 12, 2026",
    category: "Automotive",
    title: "Engine Bay Restoration Without Masking: Is It Possible?",
    excerpt:
      "Every detailer will tell you to mask everything before cleaning an engine bay. With dry ice blasting, masking is optional — not mandatory. Here's why, and what the exceptions are.",
    readTime: "5 min read",
  },
];

const categoryColors: Record<string, string> = {
  Technology: "text-brand-cyan border-brand-cyan/30 bg-brand-cyan/10",
  Automotive: "text-brand-gold border-brand-gold/30 bg-brand-gold/10",
  Marine: "text-[hsl(204_100%_73%)] border-[hsl(204_100%_73%)]/30 bg-[hsl(204_100%_73%)]/10",
  Industrial: "text-[hsl(216_11%_72%)] border-border bg-card",
};

const Blog = () => {
  useEffect(() => {
    document.title = "Insights — DryJet Solutions";
  }, []);

  const [featured, ...rest] = posts;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute right-[10%] top-[20%] h-[180px] w-[180px] rounded-full bg-brand-blue/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
          <span className="eyebrow">/ Insights</span>
          <h1 className="mt-7 font-display uppercase text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] leading-[0.95] tracking-[-0.05em] max-w-4xl">
            Knowledge from the <br />
            <span className="text-brand-cyan">field.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-[hsl(216_11%_72%)] leading-relaxed font-light">
            Technical articles, industry guides, and case studies from DryJet
            Solutions' senior technicians and operations team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="group bg-card border border-border p-10 md:p-14 hover:border-brand-cyan/30 transition-colors duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-brand-cyan/60 via-brand-blue/30 to-transparent" />
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span
                className={`font-display text-[10px] uppercase tracking-[0.2em] px-2 py-1 border ${categoryColors[featured.category] ?? ""}`}
              >
                {featured.category}
              </span>
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {featured.no}
              </span>
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                <Calendar size={10} /> {featured.date}
              </span>
            </div>
            <h2 className="font-display uppercase text-[1.6rem] sm:text-[2rem] md:text-[2.6rem] leading-[1.02] tracking-tight text-foreground group-hover:text-brand-cyan transition-colors duration-500 max-w-3xl">
              {featured.title}
            </h2>
            <p className="mt-6 max-w-2xl text-[hsl(216_11%_72%)] leading-relaxed font-light">
              {featured.excerpt}
            </p>
            <div className="mt-8 flex items-center gap-6">
              <span className="font-display text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {featured.readTime}
              </span>
              <Link
                to={`/insights/${featured.id}`}
                className="group/btn inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] font-display text-brand-cyan hover:text-brand-gold transition-colors"
              >
                Read article
                <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-card border border-border p-8 flex flex-col hover:border-brand-cyan/30 transition-colors duration-500"
              >
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span
                    className={`font-display text-[9px] uppercase tracking-[0.2em] px-2 py-1 border ${categoryColors[post.category] ?? ""}`}
                  >
                    {post.category}
                  </span>
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1">
                    <Tag size={9} /> {post.no}
                  </span>
                </div>
                <h3 className="font-display uppercase text-[0.95rem] leading-tight tracking-tight text-foreground group-hover:text-brand-cyan transition-colors duration-500 flex-1">
                  {post.title}
                </h3>
                <p className="mt-4 text-sm text-[hsl(216_11%_72%)] leading-relaxed font-light line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="font-display text-[9px] uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-1.5">
                    <Calendar size={9} /> {post.date}
                  </span>
                  <Link
                    to={`/insights/${post.id}`}
                    className="group/btn inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-display text-brand-cyan hover:text-brand-gold transition-colors"
                  >
                    Read
                    <ChevronRight size={12} className="transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
