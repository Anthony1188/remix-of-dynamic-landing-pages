export default function AdminSettings() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div>
        <p className="eyebrow mb-3">Configuration</p>
        <h1 className="font-display uppercase text-2xl tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1 font-light">Manage your DryJet Solutions admin preferences.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Business Info */}
        <div className="glass p-6 space-y-5">
          <h2 className="font-display uppercase text-sm tracking-[0.12em]">Business Information</h2>
          {[
            { label: "Company Name", value: "DryJet Solutions" },
            { label: "Contact Email", value: "info@dryjetsolutions.com" },
            { label: "Phone", value: "+1 (813) 555-0100" },
            { label: "Service Area", value: "Tampa Bay, Fort Lauderdale, Miami, FL" },
          ].map(f => (
            <div key={f.label}>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">{f.label}</label>
              <input
                defaultValue={f.value}
                className="w-full px-3 py-2 bg-background border border-border text-xs font-light text-foreground focus:outline-none focus:border-brand-cyan/50 transition-colors"
              />
            </div>
          ))}
          <button className="px-4 py-2 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/10 transition-colors">
            Save Changes
          </button>
        </div>

        {/* Quote Defaults */}
        <div className="glass p-6 space-y-5">
          <h2 className="font-display uppercase text-sm tracking-[0.12em]">Quote Defaults</h2>
          {[
            { label: "Quote Validity (days)", value: "14" },
            { label: "Tax Rate (%)", value: "7" },
            { label: "Currency", value: "USD" },
            { label: "Quote Number Prefix", value: "DJS-2026-" },
          ].map(f => (
            <div key={f.label}>
              <label className="font-display text-[9px] uppercase tracking-[0.18em] text-muted-foreground block mb-1.5">{f.label}</label>
              <input
                defaultValue={f.value}
                className="w-full px-3 py-2 bg-background border border-border text-xs font-light text-foreground focus:outline-none focus:border-brand-cyan/50 transition-colors"
              />
            </div>
          ))}
          <button className="px-4 py-2 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/10 transition-colors">
            Save Changes
          </button>
        </div>

        {/* Supabase Integration */}
        <div className="glass p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display uppercase text-sm tracking-[0.12em]">Supabase Integration</h2>
            <span className="px-2 py-0.5 text-[9px] font-display uppercase tracking-[0.1em] border border-yellow-400/30 bg-yellow-400/10 text-yellow-400">
              Mock Data Mode
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            The dashboard is currently running on local mock data. To connect to your live Supabase database,
            log in to your Supabase project, run the SQL migration to create the <code className="text-brand-cyan">leads</code> and <code className="text-brand-cyan">quotes</code> tables,
            then update the environment variables below.
          </p>
          <div className="bg-background/50 border border-border p-4 font-mono text-[10px] text-muted-foreground space-y-1">
            <p><span className="text-brand-cyan">VITE_SUPABASE_URL</span>=https://nuctewfojowestxvmeuk.supabase.co</p>
            <p><span className="text-brand-cyan">VITE_SUPABASE_ANON_KEY</span>=your-anon-key-here</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-brand-gold/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-gold hover:bg-brand-gold/10 transition-colors">
              View SQL Migration
            </button>
            <button className="px-4 py-2 border border-brand-cyan/40 text-[10px] font-display uppercase tracking-[0.1em] text-brand-cyan hover:bg-brand-cyan/10 transition-colors">
              Test Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
