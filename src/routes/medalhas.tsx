import { createFileRoute, Link } from "@tanstack/react-router";
import { useProgress } from "@/hooks/use-progress";
import { medalRarityClasses, medals } from "@/data/medals";
import { ArrowLeft, Award, Star } from "lucide-react";

export const Route = createFileRoute("/medalhas")({
  head: () => ({ meta: [{ title: "Sala de Troféus — Sophie" }] }),
  component: MedalhasPage,
});

function MedalhasPage() {
  const { progress } = useProgress();
  const earnedMap = new Map(progress.medals.map(medal => [medal.id, medal.earnedAt]));
  const earnedCount = progress.medals.length;

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Sala de Troféus</h1>
          <p className="text-xs text-muted-foreground">Medalhas, estrelas e conquistas da Sophie.</p>
        </div>
      </div>

      <section className="grid grid-cols-3 gap-2 mb-4">
        <Stat icon="🏅" label="Medalhas" value={`${earnedCount}/${medals.length}`} />
        <Stat icon="⭐" label="Estrelas" value={String(progress.totalStars)} />
        <Stat icon="🌟" label="Perfeitas" value={String(progress.totalGoldenStars)} />
      </section>

      <div className="rounded-3xl bg-gradient-sun p-4 shadow-soft mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5" />
          <h2 className="font-display font-extrabold">Como ganhar mais?</h2>
        </div>
        <p className="text-sm font-bold text-accent-foreground/80">
          Complete mundos, faça 3 estrelas, acerte fases sem dica do Pix e revise fases antigas para virar Princesa do Saber.
        </p>
      </div>

      <div className="space-y-2">
        {medals.map(medal => {
          const earnedAt = earnedMap.get(medal.id);
          const earned = Boolean(earnedAt);
          return (
            <div key={medal.id} className={`rounded-2xl p-3 shadow-soft flex items-center gap-3 ${earned ? "bg-white" : "bg-white/60 opacity-70"}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${earned ? "bg-accent/40" : "bg-muted"}`}>
                {earned ? medal.icon : "🔒"}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm leading-tight">{medal.name}</p>
                  {earned && <Star className="w-4 h-4 fill-gold text-gold" />}
                </div>
                <p className="text-xs text-muted-foreground">{medal.description}</p>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${medalRarityClasses[medal.rarity]}`}>{medal.rarity.toUpperCase()}</span>
                  <span className="text-[10px] font-bold text-muted-foreground">+{medal.rewardCoins} moedas</span>
                </div>
                {earnedAt && <p className="text-[10px] text-success font-bold mt-1">Conquistada em {new Date(earnedAt).toLocaleDateString("pt-BR")}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="font-display font-extrabold text-lg leading-none">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}
