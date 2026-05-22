import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Music, Volume2, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const KEY = "sophie-ajustes-v1";

interface Settings {
  music: boolean;
  sfx: boolean;
  notifications: boolean;
  volume: number;
}

const defaults: Settings = { music: true, sfx: true, notifications: false, volume: 60 };

export const Route = createFileRoute("/ajustes")({
  head: () => ({ meta: [{ title: "Ajustes — Sophie" }] }),
  component: AjustesPage,
});

function AjustesPage() {
  const [s, setS] = useState<Settings>(defaults);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setS({ ...defaults, ...JSON.parse(raw) });
    } catch {}
  }, []);

  function update(patch: Partial<Settings>) {
    const next = { ...s, ...patch };
    setS(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Ajustes</h1>
          <p className="text-xs text-muted-foreground">Personalize a aventura.</p>
        </div>
      </div>

      <section className="rounded-3xl bg-white shadow-soft p-4 space-y-4">
        <Toggle icon={<Music className="w-5 h-5" />} label="Música de fundo"
          checked={s.music} onChange={v => update({ music: v })} />
        <Toggle icon={<Volume2 className="w-5 h-5" />} label="Efeitos sonoros"
          checked={s.sfx} onChange={v => update({ sfx: v })} />
        <Toggle icon={<Bell className="w-5 h-5" />} label="Lembrete da missão diária"
          checked={s.notifications} onChange={v => update({ notifications: v })} />

        <div>
          <label className="text-sm font-bold flex items-center justify-between mb-1">
            <span>Volume</span><span className="text-muted-foreground">{s.volume}%</span>
          </label>
          <input type="range" min={0} max={100} value={s.volume}
            onChange={e => update({ volume: Number(e.target.value) })}
            className="w-full accent-[hsl(var(--magic))]" />
        </div>

        <button onClick={() => { setS(defaults); localStorage.setItem(KEY, JSON.stringify(defaults)); toast.success("Restaurado!"); }}
          className="w-full rounded-2xl bg-secondary py-3 font-bold">
          Restaurar padrão
        </button>
      </section>
    </main>
  );
}

function Toggle({ icon, label, checked, onChange }:
  { icon: React.ReactNode; label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="flex items-center gap-2 font-bold text-sm">
        <span className="w-9 h-9 rounded-xl bg-gradient-magic text-primary-foreground flex items-center justify-center">{icon}</span>
        {label}
      </span>
      <span className={`relative w-12 h-7 rounded-full transition ${checked ? "bg-gradient-magic" : "bg-muted"}`}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={e => onChange(e.target.checked)} />
        <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${checked ? "left-6" : "left-1"}`} />
      </span>
    </label>
  );
}
