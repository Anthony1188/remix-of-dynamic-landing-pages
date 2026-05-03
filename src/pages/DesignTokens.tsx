import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

const swatches: { name: string; varName: string; fg?: string }[] = [
  { name: "Background", varName: "--background", fg: "--foreground" },
  { name: "Foreground", varName: "--foreground", fg: "--background" },
  { name: "Card", varName: "--card", fg: "--card-foreground" },
  { name: "Popover", varName: "--popover", fg: "--popover-foreground" },
  { name: "Primary", varName: "--primary", fg: "--primary-foreground" },
  { name: "Secondary", varName: "--secondary", fg: "--secondary-foreground" },
  { name: "Muted", varName: "--muted", fg: "--muted-foreground" },
  { name: "Accent (Gold)", varName: "--accent", fg: "--accent-foreground" },
  { name: "Destructive", varName: "--destructive", fg: "--destructive-foreground" },
  { name: "Border", varName: "--border", fg: "--foreground" },
  { name: "Input", varName: "--input", fg: "--foreground" },
  { name: "Ring", varName: "--ring", fg: "--background" },
];

const brand: { name: string; varName: string }[] = [
  { name: "Brand Cyan", varName: "--brand-cyan" },
  { name: "Brand Blue", varName: "--brand-blue" },
  { name: "Brand Ice", varName: "--brand-ice" },
  { name: "Brand Gold", varName: "--brand-gold" },
];

function Swatch({ label, varName, fg }: { label: string; varName: string; fg?: string }) {
  return (
    <div className="glass p-0 overflow-hidden">
      <div
        className="h-24 w-full flex items-end justify-between px-3 py-2 font-mono text-[11px]"
        style={{
          backgroundColor: `hsl(var(${varName}))`,
          color: fg ? `hsl(var(${fg}))` : undefined,
        }}
      >
        <span>{label}</span>
        <span>{varName}</span>
      </div>
    </div>
  );
}

export default function DesignTokens() {
  const [light, setLight] = useState(false);
  return (
    <div className={`aurora-bg ${light ? "theme-light" : ""}`}>
      <div className="grid-lines">
        <div className="container mx-auto px-4 py-16 md:py-24 space-y-16">
          <header className="space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-4">
                <div className="eyebrow">Design Tokens</div>
                <h1 className="text-4xl md:text-6xl font-display text-balance">
                  DryJet <span className="text-gradient-brand">System Preview</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl font-sans-body">
                  Verify colors, typography, borders, and card surfaces against the
                  template across all sections.
                </p>
              </div>
              <div className="glass flex items-center gap-3 px-4 py-3">
                <Moon className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={light}
                  onCheckedChange={setLight}
                  aria-label="Toggle light theme"
                />
                <Sun className="h-4 w-4 text-muted-foreground" />
                <span className="font-mono text-[11px] text-muted-foreground ml-1">
                  {light ? "LIGHT" : "DARK"}
                </span>
              </div>
            </div>
          </header>

          {/* Brand colors */}
          <section className="space-y-6">
            <div className="eyebrow">Brand Palette</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brand.map((b) => (
                <Swatch key={b.varName} label={b.name} varName={b.varName} fg="--background" />
              ))}
            </div>
          </section>

          {/* Semantic tokens */}
          <section className="space-y-6">
            <div className="eyebrow">Semantic Tokens</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {swatches.map((s) => (
                <Swatch key={s.varName} label={s.name} varName={s.varName} fg={s.fg} />
              ))}
            </div>
          </section>

          {/* Gradients */}
          <section className="space-y-6">
            <div className="eyebrow">Gradients</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass p-0 overflow-hidden">
                <div className="h-28" style={{ background: "var(--gradient-brand)" }} />
                <div className="px-4 py-3 font-mono text-xs text-muted-foreground">--gradient-brand</div>
              </div>
              <div className="glass p-0 overflow-hidden">
                <div
                  className="h-28"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(var(--brand-gold)), hsl(36 60% 78%))",
                  }}
                />
                <div className="px-4 py-3 font-mono text-xs text-muted-foreground">gold gradient</div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <div className="eyebrow">Typography</div>
            <div className="glass p-8 space-y-6">
              <div>
                <div className="font-mono text-[11px] text-muted-foreground mb-2">Display — Michroma</div>
                <h1 className="font-display text-5xl md:text-6xl">DryJet Solutions</h1>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground mb-2">H2</div>
                <h2 className="font-display text-3xl md:text-4xl">Engineered Performance</h2>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground mb-2">H3</div>
                <h3 className="font-display text-2xl">Industrial Precision</h3>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground mb-2">Body — Inter</div>
                <p className="font-sans-body text-base text-foreground/90 max-w-2xl">
                  The quick brown fox jumps over the lazy dog. 0123456789 — body
                  copy uses Inter for highly legible reading at long lengths.
                </p>
                <p className="font-sans-body text-sm text-muted-foreground mt-2 max-w-2xl">
                  Muted body — secondary descriptions and supporting text.
                </p>
              </div>
              <div>
                <div className="font-mono text-[11px] text-muted-foreground mb-2">Mono — JetBrains Mono</div>
                <p className="font-mono text-sm">
                  const tokens = {`{ radius: 0, accent: "#9ED8FF" }`};
                </p>
              </div>
              <div>
                <div className="eyebrow">Eyebrow Label</div>
              </div>
            </div>
          </section>

          {/* Cards / Surfaces */}
          <section className="space-y-6">
            <div className="eyebrow">Surfaces & Cards</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="glass p-6 space-y-2">
                <div className="font-mono text-[11px] text-muted-foreground">.glass</div>
                <h4 className="font-display text-lg">Default Panel</h4>
                <p className="text-sm text-muted-foreground font-sans-body">
                  Hairline border, near-black fill with subtle blur.
                </p>
              </div>
              <div className="glass-strong p-6 space-y-2">
                <div className="font-mono text-[11px] text-muted-foreground">.glass-strong</div>
                <h4 className="font-display text-lg">Strong Panel</h4>
                <p className="text-sm text-muted-foreground font-sans-body">
                  Solid card with stronger blur for elevated surfaces.
                </p>
              </div>
              <div className="glass-primary p-6 space-y-2">
                <div className="font-mono text-[11px] text-muted-foreground">.glass-primary</div>
                <h4 className="font-display text-lg">Primary Panel</h4>
                <p className="text-sm text-muted-foreground font-sans-body">
                  Cyan-tinted border for highlighted content.
                </p>
              </div>
              <div className="glass glass-hover p-6 space-y-2">
                <div className="font-mono text-[11px] text-muted-foreground">.glass-hover</div>
                <h4 className="font-display text-lg">Hover Cyan</h4>
                <p className="text-sm text-muted-foreground font-sans-body">Border lights up on hover.</p>
              </div>
              <div className="glass hover-gold p-6 space-y-2 cursor-pointer">
                <div className="font-mono text-[11px] text-muted-foreground">.hover-gold</div>
                <h4 className="font-display text-lg flex items-center gap-2">
                  <span className="dot inline-block w-1.5 h-1.5 bg-foreground" />
                  Hover Gold
                </h4>
                <p className="text-sm text-muted-foreground font-sans-body">CTA-style gold hover state.</p>
              </div>
              <div className="grid-lines border border-border p-6 space-y-2">
                <div className="font-mono text-[11px] text-muted-foreground">.grid-lines</div>
                <h4 className="font-display text-lg">Grid Texture</h4>
                <p className="text-sm text-muted-foreground font-sans-body">Technical background overlay.</p>
              </div>
            </div>
          </section>

          {/* Borders & radius */}
          <section className="space-y-6">
            <div className="eyebrow">Borders & Radius</div>
            <div className="glass p-8 space-y-4">
              <div className="flex flex-wrap gap-6 items-end">
                <div className="space-y-2">
                  <div className="h-16 w-24 border border-border bg-card" />
                  <div className="font-mono text-[11px] text-muted-foreground">--radius: 0</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 w-24 border border-[hsl(var(--brand-cyan))] bg-card" />
                  <div className="font-mono text-[11px] text-muted-foreground">cyan border</div>
                </div>
                <div className="space-y-2">
                  <div className="h-16 w-24 border border-[hsl(var(--brand-gold))] bg-card" />
                  <div className="font-mono text-[11px] text-muted-foreground">gold border</div>
                </div>
                <div
                  className="h-16 w-24 bg-card border border-border"
                  style={{ boxShadow: "var(--shadow-glow)" }}
                />
                <div className="font-mono text-[11px] text-muted-foreground">--shadow-glow</div>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <div className="eyebrow">Buttons</div>
            <div className="glass p-8 flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}