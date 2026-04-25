import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const principles = [
  {
    n: "01",
    t: "Craftsmanship first",
    d: "Every job is treated like a one-of-one restoration. No shortcuts, no checklists — just trained eyes and steady hands.",
  },
  {
    n: "02",
    t: "Zero compromise on environment",
    d: "We never trade convenience for ecological harm. Dry ice sublimates back into the atmosphere — there is no waste stream to manage.",
  },
  {
    n: "03",
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 md:py-32">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            / About
          </span>
          <h1 className="mt-6 text-5xl md:text-7xl font-light leading-[0.95] max-w-4xl">
            Built for the <span className="text-gradient-brand font-medium">discerning few</span>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed">
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
              <div key={p.t} className="glass glass-hover rounded-sm p-10">
                <span className="font-mono text-xs text-primary">{p.n}</span>
                <h3 className="mt-6 text-2xl font-medium leading-tight">{p.t}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed text-sm">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="text-4xl md:text-5xl font-light leading-tight">
            We work where <span className="text-gradient-brand font-medium">others can't</span>.
          </h2>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Marina restrictions on chemical runoff. Concours judges measuring
              factory tolerance. FDA inspectors auditing your line. We operate
              inside the constraints that other cleaners avoid — because dry ice
              doesn't leave evidence behind.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm text-primary"
            >
              Talk to our team <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
