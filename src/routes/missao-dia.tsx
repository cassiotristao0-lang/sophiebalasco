import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Check, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { worlds, type Question } from "@/data/worlds";
import { useProgress } from "@/hooks/use-progress";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { toast } from "sonner";

export const Route = createFileRoute("/missao-dia")({
  head: () => ({ meta: [{ title: "Missão do Dia — Sophie" }] }),
  component: MissaoDiaPage,
});

function pickDaily(): Question[] {
  const all: Question[] = worlds.flatMap(w => w.levels.flatMap(l => l.questions));
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const out: Question[] = [];
  for (let i = 0; i < 5 && all.length > 0; i++) {
    out.push(all[(day * 7 + i * 31) % all.length]);
  }
  return out;
}

function MissaoDiaPage() {
  const { progress } = useProgress();
  const todayKey = new Date().toISOString().slice(0, 10);
  const storageKey = `sophie-missao-${todayKey}`;
  const alreadyDone = typeof window !== "undefined" && localStorage.getItem(storageKey) === "done";

  const questions = useMemo(() => pickDaily(), []);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(alreadyDone);

  if (done) {
    return (
      <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
        <Header />
        <section className="rounded-3xl bg-gradient-magic text-primary-foreground p-6 shadow-magic text-center space-y-3">
          <Sparkles className="w-12 h-12 mx-auto" />
          <h2 className="font-display font-extrabold text-2xl">Missão concluída!</h2>
          <p className="text-sm">Você já fez a missão de hoje. Volte amanhã para uma nova! 🌞</p>
          <p className="text-xs">Você tem {progress.coins} moedas mágicas.</p>
          <Link to="/mapa" className="inline-block rounded-2xl bg-white/25 px-4 py-2 font-bold">Ir ao Mapa</Link>
        </section>
      </main>
    );
  }

  const q = questions[idx];
  function handlePick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setCorrect(c => c + 1);
      toast.success("Acertou! ⭐");
    } else {
      toast.error("Quase! Vamos tentar a próxima.");
    }
  }
  function next() {
    if (idx + 1 < questions.length) { setIdx(idx + 1); setPicked(null); }
    else {
      localStorage.setItem(storageKey, "done");
      setDone(true);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <Header />
      <section className="rounded-3xl bg-white shadow-soft p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-muted-foreground">Pergunta {idx + 1} de {questions.length}</span>
          <span className="text-xs font-bold">✅ {correct}</span>
        </div>
        <p className="font-bold text-lg mb-3">{q.prompt}</p>
        <div className="space-y-2">
          {q.options.map((opt, i) => {
            const isCorrect = picked !== null && i === q.answer;
            const isWrong = picked === i && i !== q.answer;
            return (
              <button key={i} onClick={() => handlePick(i)} disabled={picked !== null}
                className={`w-full text-left rounded-2xl px-4 py-3 font-bold shadow-soft transition ${
                  isCorrect ? "bg-success text-white" :
                  isWrong ? "bg-destructive text-white" :
                  "bg-secondary/40 hover:bg-secondary/70"
                }`}>
                {opt}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <div className="mt-3 rounded-2xl bg-secondary/40 p-3 text-sm flex gap-2">
            <CharacterAvatar id="pix" size="sm" />
            <p><strong>Pix diz:</strong> {q.explanation}</p>
          </div>
        )}
      </section>
      {picked !== null && (
        <button onClick={next} className="w-full rounded-2xl bg-gradient-magic text-primary-foreground py-3 font-bold inline-flex justify-center items-center gap-2">
          {idx + 1 < questions.length ? "Próxima" : <>Concluir <Check className="w-5 h-5" /></>}
        </button>
      )}
    </main>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <div>
        <h1 className="font-display text-2xl font-extrabold flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Missão do Dia
        </h1>
        <p className="text-xs text-muted-foreground">5 perguntas mágicas para hoje!</p>
      </div>
    </div>
  );
}
