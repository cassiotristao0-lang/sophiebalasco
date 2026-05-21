import { createFileRoute, Link } from "@tanstack/react-router";
import { getWorld } from "@/data/worlds";
import { characters } from "@/data/characters";
import { useProgress, levelKey } from "@/hooks/use-progress";
import { ArrowLeft, Lock, Star, Play } from "lucide-react";

export const Route = createFileRoute("/mundo/$worldId")({
  head: ({ params }) => {
    const w = getWorld(Number(params.worldId));
    return { meta: [{ title: w ? `${w.name} — Sophie` : "Mundo" }] };
  },
  component: MundoView,
  notFoundComponent: () => <p className="p-6">Mundo não encontrado.</p>,
});

function MundoView() {
  const { worldId } = Route.useParams();
  const world = getWorld(Number(worldId));
  if (!world) return <p className="p-6">Mundo não encontrado.</p>;
  const { progress } = useProgress();
  const guide = characters[world.guide];

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/mapa" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold leading-tight">{world.name}</h1>
          <p className="text-xs text-muted-foreground">{world.description}</p>
        </div>
      </div>

      <div className={`rounded-3xl bg-gradient-to-br ${world.gradient} p-5 shadow-magic mb-5 text-white`}>
        <div className="flex items-center gap-3">
          <div className="text-5xl">{guide.emoji}</div>
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">Seu guia neste mundo</p>
            <p className="font-display font-extrabold text-lg">{guide.name}</p>
            <p className="text-sm italic">"{guide.catchphrase}"</p>
          </div>
        </div>
      </div>

      <h2 className="font-display font-bold mb-2 text-foreground">Fases</h2>
      <div className="space-y-2">
        {world.levels.map((level, idx) => {
          const lp = progress.levels[levelKey(world.id, level.id)];
          const prevDone = idx === 0 || progress.levels[levelKey(world.id, world.levels[idx - 1].id)]?.completed;
          const locked = !prevDone;
          return (
            <Link
              key={level.id}
              to="/fase/$worldId/$levelId"
              params={{ worldId: String(world.id), levelId: String(level.id) }}
              disabled={locked}
              className={`flex items-center gap-3 rounded-2xl bg-white p-3 shadow-soft ${locked ? "opacity-50 pointer-events-none" : "active:scale-[0.98] transition-transform"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-lg ${lp?.completed ? "bg-success text-white" : "bg-secondary"}`}>
                {locked ? <Lock className="w-5 h-5" /> : level.id}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{level.name}</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3].map(i => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i <= (lp?.stars ?? 0) ? "fill-gold text-gold" : "text-border"}`} />
                  ))}
                </div>
              </div>
              <Play className="w-5 h-5 text-primary" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
