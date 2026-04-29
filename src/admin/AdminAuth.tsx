import { useState } from "react";
import { Snowflake, Lock, Eye, EyeOff } from "lucide-react";

// Simple client-side PIN guard. Replace with Supabase Auth in production.
const ADMIN_PIN = "dryjet2026";

interface AdminAuthProps {
  children: React.ReactNode;
}

export function AdminAuth({ children }: AdminAuthProps) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("dj_admin") === "1");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showPin, setShowPin] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("dj_admin", "1");
      setAuthed(true);
    } else {
      setError("Incorrect access code. Please try again.");
      setPin("");
    }
  }

  if (authed) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Animated grid bg */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "linear-gradient(hsl(204 100% 81%) 1px, transparent 1px), linear-gradient(90deg, hsl(204 100% 81%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 border border-brand-cyan/30 flex items-center justify-center mb-4">
            <Snowflake className="w-5 h-5 text-brand-cyan" strokeWidth={1.5} />
          </div>
          <p className="font-display uppercase text-[10px] tracking-[0.25em] text-muted-foreground">DryJet Solutions</p>
          <h1 className="font-display uppercase text-lg tracking-[0.12em] mt-1">Admin Access</h1>
        </div>

        <form onSubmit={handleSubmit} className="glass p-8 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
            <p className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Secure Area</p>
          </div>

          <div>
            <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-2">Access Code</label>
            <div className="relative">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={e => { setPin(e.target.value); setError(""); }}
                placeholder="Enter access code"
                autoFocus
                className="w-full px-4 py-3 bg-background border border-border text-sm font-light text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand-cyan/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPin(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-[10px] text-red-400 mt-2 font-light">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-cyan/10 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.2em] text-brand-cyan hover:bg-brand-cyan/20 transition-all"
          >
            Enter Dashboard
          </button>

          <p className="text-[9px] text-muted-foreground font-light text-center leading-relaxed">
            Default code: <span className="text-brand-cyan font-display">dryjet2026</span><br />
            Change this in AdminAuth.tsx before going live.
          </p>
        </form>
      </div>
    </div>
  );
}
