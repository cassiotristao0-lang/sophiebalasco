import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getWorld } from "@/data/worlds";
import { characters } from "@/data/characters";
import { useProgress } from "@/hooks/use-progress";
import { useState } from "react";
import { ArrowLeft, Check, X, Lightbulb, Sparkles, Star } from "lucide-react";

export const Route = createFileRoute("/fase/$worldId/$levelId")({
  component: FaseView,
  notFoundComponent: () => <p className="p-6">Fase não encontrada.</p>,
});

function FaseView() {
  const { worldId, levelId } = Route.useParams();
  const world = getWorld(Number(worldId));
  const level = world?.levels.find(x => x.id === Number(levelId));
  const navigate = useNavigate();
  const { recordLevel } = useProgress();
  if (!world || !level) return <p className="p-6">Fase não encontrada.</p>;
  const guide = characters[world.guide];

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [usedHint, setUsedHint] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [pointsNoHint, setPointsNoHint] = useState(0);
  const [done, setDone] = useState(false);

  const q = level.questions[idx];
  const isLast = idx === level.questions.length - 1;

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setCorrectCount(c => c + 1);
      if (!usedHint) setPointsNoHint(p => p + 1);
    }
  }

  function next() {
    if (isLast) {
      const total = level!.questions.length;
      const correct = correctCount;
      const pct = Math.round((correct / total) * 100);
      const coins = correct * 10 + pointsNoHint * 5 + (pct === 100 ? 50 : 0);
      recordLevel(world!.id, level!.id, pct, coins);
      setDone(true);
    } else {
      setIdx(i => i + 1);
      setPicked(null);
      setUsedHint(false);
      setShowHint(false);
    }
  }

  if (done) {
    const total = level.questions.length;
    const pct = Math.round((correctCount / total) * 100);
    const stars = pct >= 90 ? 3 : pct >= 80 ? 2 : pct >= 70 ? 1 : 0;
    const passed = pct >= 70;
    return (
      <main className="min-h-screen px-4 py-6 max-w-md mx-auto flex flex-col items-center justify-center text-center">
        <div className="text-7xl animate-pop mb-2">{passed ? "🎉" : "💪"}</div>
        <h1 className="font-display text-3xl font-extrabold mb-1">
          {passed ? "Você brilhou, princesa!" : "Quase lá, Sophie!"}
        </h1>
        <p className="text-muted-foreground mb-4">
          {passed ? "A página do livro foi recuperada!" : "Errar faz parte da aventura. Tente de novo!"}
        </p>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(i => (
            <Star key={i} className={`w-12 h-12 ${i <= stars ? "fill-gold text-gold animate-pop" : "text-border"}`}
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <div className="rounded-2xl bg-white shadow-soft p-4 w-full mb-4 grid grid-cols-3 gap-2 text-center">
          <div><div className="text-2xl">✅</div><div className="font-bold">{correctCount}/{total}</div><div className="text-xs text-muted-foreground">Acertos</div></div>
          <div><div className="text-2xl">📊</div><div className="font-bold">{pct}%</div><div className="text-xs text-muted-foreground">Nota</div></div>
          <div><div className="text-2xl">🪙</div><div className="font-bold">+{correctCount * 10 + pointsNoHint * 5 + (pct === 100 ? 50 : 0)}</div><div className="text-xs text-muted-foreground">Moedas</div></div>
        </div>
        <div className="flex gap-2 w-full">
          <Link to="/mundo/$worldId" params={{ worldId: String(world.id) }}
            className="flex-1 py-3 rounded-2xl bg-white shadow-soft font-bold text-center">Voltar</Link>
          <button onClick={() => { setIdx(0); setPicked(null); setCorrectCount(0); setPointsNoHint(0); setUsedHint(false); setShowHint(false); setDone(false); }}
            className="flex-1 py-3 rounded-2xl bg-gradient-magic text-primary-foreground shadow-magic font-bold">Jogar de novo</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-4 max-w-md mx-auto">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-3">
        <button onClick={() => navigate({ to: "/mundo/$worldId", params: { worldId: String(world.id) } })}
          className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Fase {level.id} — {level.name}</p>
          <div className="h-2 bg-secondary rounded-full overflow-hidden mt-1">
            <div className="h-full bg-gradient-magic transition-all" style={{ width: `${((idx + (picked !== null ? 1 : 0)) / level.questions.length) * 100}%` }} />
          </div>
        </div>
        <span className="text-xs font-bold text-muted-foreground">{idx + 1}/{level.questions.length}</span>
      </div>

      {/* Guide bubble */}
      <div className="flex items-center gap-2 mb-3 bg-white rounded-2xl p-2 shadow-soft">
        <CharacterAvatar id={guide.id} size="sm" />
        <p className="text-xs font-bold text-foreground">{guide.name} está com você!</p>
      </div>

      {/* Question */}
      <div className="rounded-3xl bg-white p-5 shadow-soft mb-3">
        <p className="font-display text-lg font-bold leading-tight">{q.prompt}</p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-3">
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const isCorrect = i === q.answer;
          const reveal = picked !== null;
          const colors = !reveal
            ? "bg-white hover:bg-secondary/40 active:scale-[0.98]"
            : isCorrect
              ? "bg-success text-white"
              : isPicked
                ? "bg-destructive text-white"
                : "bg-white opacity-60";
          return (
            <button key={i} onClick={() => pick(i)} disabled={picked !== null}
              className={`w-full flex items-center gap-3 rounded-2xl p-3 text-left font-bold shadow-soft transition-all ${colors}`}>
              <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center text-sm">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{opt}</span>
              {reveal && isCorrect && <Check className="w-5 h-5" />}
              {reveal && isPicked && !isCorrect && <X className="w-5 h-5" />}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {picked === null && (
        <button
          onClick={() => { setShowHint(true); setUsedHint(true); }}
          className="w-full flex items-center gap-2 rounded-2xl bg-gradient-sun p-3 font-bold text-accent-foreground shadow-soft active:scale-95"
        >
          <Lightbulb className="w-5 h-5" />
          Dica do Pix 🐶
        </button>
      )}

      {showHint && picked === null && (
        <div className="mt-3 rounded-2xl bg-accent/40 p-3 flex items-start gap-2 animate-pop">
          <div className="text-3xl">🐶</div>
          <div>
            <p className="text-xs font-bold text-magic">Pix sussurra:</p>
            <p className="text-sm">{q.hint}</p>
          </div>
        </div>
      )}

      {/* Explanation + next */}
      {picked !== null && (
        <div className="mt-3 rounded-2xl bg-secondary/60 p-3 animate-pop">
          <p className="text-xs font-bold text-magic flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Por quê?
          </p>
          <p className="text-sm">{q.explanation}</p>
          <button onClick={next}
            className="mt-3 w-full py-3 rounded-2xl bg-gradient-magic text-primary-foreground font-bold shadow-magic active:scale-95">
            {isLast ? "Ver resultado" : "Próxima pergunta"}
          </button>
        </div>
      )}
    </main>
  );
}
