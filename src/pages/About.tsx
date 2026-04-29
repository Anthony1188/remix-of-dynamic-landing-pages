import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const principles = [
  {
    n: "PRN.01",
    t: "Craftsmanship first",
    d: "Every job is treated like a one-of-one restoration. No shortcuts, no checklists — just trained eyes and steady hands.",
  },
  {
    n: "PRN.02",
    t: "Zero compromise on environment",
    d: "We never trade convenience for ecological harm. Dry ice sublimates back into the atmosphere — there is no waste stream to manage.",
  },
  {
    n: "PRN.03",
    t: "Engineered, not improvised",
    d: "Our pressure profiles, nozzles, and pellet sizes are calibrated per surface. Carbon fiber is not gelcoat. A pharma cleanroom is not an engine bay.",
  },
];

const About = () => {
  useEffect(() => {
    document.title = "About — DryJet Solutions";
  }, []);

  return (
    <div>
      <section className="border-b border-border relative overflow-hidden">
        <div className="absolute left-[10%] top-[30%] h-[180px] w-[180px] rounded-full bg-brand-cyan/5 blur-[90px]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32 relative">
          <span className="eyebrow">/ About</span>
          <h1 className="mt-7 font-display uppercase text-[2.4rem] sm:text-[3.2rem] md:text-[4.4rem] leading-[0.95] tracking-[-0.05em] max-w-4xl">
            Built for the <br />
            <span className="text-brand-cyan">discerning few.</span>
          </h1>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-[hsl(216_11%_72%)] leading-relaxed font-light">
            DryJet Solutions was founded by automotive and marine specialists who
            saw water-based cleaning ruin too many irreplaceable assets. We
            assembled the equipment, training, and discipline of European
            preservationists — and brought it to clients who refuse to settle.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24">
          <div className="grid md:grid-cols-3 gap-4">
            {principles.map((p) => (
              <div key={p.t} className="bg-card border border-border p-10 transition-colors hover:border-brand-cyan/30">
                <span className="text-[10px] uppercase font-display text-brand-cyan tracking-[0.18em] bg-brand-cyan/10 border border-brand-cyan/30 px-2 py-1">
                  {p.n}
                </span>
                <h3 className="mt-7 text-base font-display uppercase tracking-tight leading-tight text-foreground">{p.t}</h3>
                <p className="mt-4 text-[hsl(216_11%_72%)] leading-relaxed text-sm font-light">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="font-display uppercase text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] leading-[1.02] tracking-tight">
            We work where <br />
            <span className="text-brand-cyan">others can't.</span>
          </h2>
          <div>
            <p className="text-[hsl(216_11%_72%)] leading-relaxed font-light">
              Marina restrictions on chemical runoff. Concours judges measuring
              factory tolerance. FDA inspectors auditing your line. We operate
              inside the constraints that other cleaners avoid — because dry ice
              doesn't leave evidence behind.
            </p>
            <Link
              to="/contact"
              className="mt-8 group inline-flex items-center gap-4 px-7 py-4 text-[11px] uppercase text-foreground tracking-[0.18em] font-display bg-card/90 border border-border hover-gold"
            >
              <span className="inline-flex items-center gap-3">
                <span className="dot w-1.5 h-1.5 bg-brand-cyan transition-colors duration-300" />
                <span>Talk to our team</span>
              </span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
