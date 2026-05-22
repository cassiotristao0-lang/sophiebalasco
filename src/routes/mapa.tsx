import { createFileRoute, Link } from "@tanstack/react-router";
import { worlds } from "@/data/worlds";
import { characters } from "@/data/characters";
import { useProgress, levelKey, isWorldCompleted } from "@/hooks/use-progress";
import { ArrowLeft, Lock, Star } from "lucide-react";

export const Route = createFileRoute("/mapa")({
  head: () => ({ meta: [{ title: "Mapa dos Mundos — Sophie" }] }),
  component: MapaMundos,
});

function MapaMundos() {
  const { progress } = useProgress();
  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Mapa dos Mundos</h1>
          <p className="text-xs text-muted-foreground">Escolha uma aventura!</p>
        </div>
      </div>

      <div className="space-y-3">
        {worlds.map((w, idx) => {
          const prevDone = idx === 0 || isWorldCompleted(progress, worlds[idx - 1].id);
          const completedLevels = w.levels.filter(l => progress.levels[levelKey(w.id, l.id)]?.completed).length;
          const stars = w.levels.reduce((s, l) => s + (progress.levels[levelKey(w.id, l.id)]?.stars ?? 0), 0);
          const pct = Math.round((completedLevels / w.levels.length) * 100);
          const guide = characters[w.guide];
          const locked = !prevDone;

          return (
            <Link
              key={w.id}
              to="/mundo/$worldId"
              params={{ worldId: String(w.id) }}
              
              className={`block rounded-3xl bg-gradient-to-br ${w.gradient} p-4 shadow-magic relative overflow-hidden ${locked ? "opacity-60 pointer-events-none" : "active:scale-[0.98] transition-transform"}`}
            >
              <div className="flex items-center gap-3">
                <div className="text-5xl drop-shadow-lg">{w.icon}</div>
                <div className="flex-1 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-white/25 px-2 py-0.5 rounded-full">Mundo {w.id}</span>
                    {locked && <Lock className="w-4 h-4" />}
                  </div>
                  <h3 className="font-display font-extrabold text-lg leading-tight">{w.name}</h3>
                  <p className="text-xs text-white/80">Guia: {guide.name}</p>
                  {isWorldCompleted(progress, w.id) && <p className="text-xs font-bold mt-1">🏅 Mundo concluído!</p>}
                </div>
                <img src={guide.image} alt={guide.name} loading="lazy" className="w-16 h-16 object-contain drop-shadow-lg" />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs font-bold text-white">{pct}%</span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-white" /> {stars}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
