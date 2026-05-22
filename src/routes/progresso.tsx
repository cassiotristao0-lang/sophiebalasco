import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Award, Coins, Target, Brain, Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/use-progress";
import { worlds } from "@/data/worlds";

export const Route = createFileRoute("/progresso")({
  head: () => ({ meta: [{ title: "Meu Progresso — Sophie" }] }),
  component: ProgressoPage,
});

function ProgressoPage() {
  const { progress } = useProgress();
  const accuracy =
    progress.stats.totalCorrect + progress.stats.totalWrong > 0
      ? Math.round(
          (progress.stats.totalCorrect /
            (progress.stats.totalCorrect + progress.stats.totalWrong)) *
            100,
        )
      : 0;

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Meu Progresso</h1>
          <p className="text-xs text-muted-foreground">Veja a jornada da Sophie!</p>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 mb-5">
        <StatBig icon={<Star className="w-5 h-5" />} label="Estrelas" value={progress.totalStars} />
        <StatBig icon={<Sparkles className="w-5 h-5" />} label="Estrelas Douradas" value={progress.totalGoldenStars} />
        <StatBig icon={<Coins className="w-5 h-5" />} label="Moedas" value={progress.coins} />
        <StatBig icon={<Award className="w-5 h-5" />} label="Medalhas" value={progress.medals.length} />
        <StatBig icon={<Target className="w-5 h-5" />} label="Fases concluídas" value={progress.stats.totalLevelsCompleted} />
        <StatBig icon={<Brain className="w-5 h-5" />} label="Precisão" value={`${accuracy}%`} />
      </section>

      <section className="rounded-3xl bg-white shadow-soft p-4 mb-4">
        <h2 className="font-display font-extrabold text-lg mb-3">Mundos</h2>
        <div className="space-y-2">
          {worlds.map(world => {
            const total = world.levels.length;
            const done = world.levels.filter(l => progress.levels[`${world.id}-${l.id}`]?.completed).length;
            const pct = Math.round((done / total) * 100);
            return (
              <div key={world.id} className="rounded-2xl bg-secondary/40 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">{world.icon} {world.name}</span>
                  <span className="text-xs font-bold text-muted-foreground">{done}/{total}</span>
                </div>
                <div className="h-2 rounded-full bg-white overflow-hidden">
                  <div className="h-full bg-gradient-magic" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl bg-white shadow-soft p-4">
        <h2 className="font-display font-extrabold text-lg mb-2">Respostas</h2>
        <p className="text-sm">✅ Acertos: <strong>{progress.stats.totalCorrect}</strong></p>
        <p className="text-sm">❌ Erros: <strong>{progress.stats.totalWrong}</strong></p>
        <p className="text-sm">💡 Dicas do Pix usadas: <strong>{progress.stats.totalHints}</strong></p>
      </section>
    </main>
  );
}

function StatBig({ icon, label, value }: { icon: React.ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-magic text-primary-foreground flex items-center justify-center">{icon}</div>
      <div>
        <div className="font-display font-extrabold text-lg leading-none">{value}</div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}
