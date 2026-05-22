import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useProgress } from "@/hooks/use-progress";
import { toast } from "sonner";

const PIN = "2024";

export const Route = createFileRoute("/pais")({
  head: () => ({ meta: [{ title: "Área dos Pais — Sophie" }] }),
  component: PaisPage,
});

function PaisPage() {
  const { user } = useAuth();
  const { progress, reset } = useProgress();
  const [pin, setPin] = useState("");
  const [ok, setOk] = useState(false);

  function handleEnter(e: React.FormEvent) {
    e.preventDefault();
    if (pin === PIN) { setOk(true); toast.success("Bem-vindo(a) papai/mamãe!"); }
    else toast.error("PIN incorreto.");
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Área dos Pais</h1>
          <p className="text-xs text-muted-foreground">Espaço protegido para a família.</p>
        </div>
      </div>

      {!ok ? (
        <form onSubmit={handleEnter} className="rounded-3xl bg-white shadow-soft p-5 text-center space-y-3">
          <ShieldCheck className="w-10 h-10 mx-auto text-magic" />
          <p className="text-sm">Digite o PIN dos pais para continuar.</p>
          <input
            type="password" inputMode="numeric" value={pin} onChange={e => setPin(e.target.value)}
            placeholder="• • • •" maxLength={6}
            className="w-full text-center text-2xl tracking-widest rounded-2xl border-2 border-secondary px-4 py-3 font-bold"
          />
          <button type="submit" className="w-full rounded-2xl bg-gradient-magic text-primary-foreground py-3 font-bold">
            Entrar
          </button>
          <p className="text-[10px] text-muted-foreground">Dica: o PIN inicial é {PIN}</p>
        </form>
      ) : (
        <div className="space-y-4">
          <section className="rounded-3xl bg-white shadow-soft p-4">
            <h2 className="font-display font-extrabold text-lg mb-2">Conta</h2>
            {user ? (
              <>
                <p className="text-sm mb-2">Logado como <strong>{user.email}</strong></p>
                <button onClick={() => supabase.auth.signOut()}
                  className="inline-flex items-center gap-1 rounded-xl bg-secondary px-3 py-2 text-sm font-bold">
                  <LogOut className="w-4 h-4" /> Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-1 rounded-xl bg-gradient-magic text-primary-foreground px-3 py-2 text-sm font-bold">
                <LogIn className="w-4 h-4" /> Entrar / Cadastrar
              </Link>
            )}
          </section>

          <section className="rounded-3xl bg-white shadow-soft p-4">
            <h2 className="font-display font-extrabold text-lg mb-2">Resumo da Sophie</h2>
            <ul className="text-sm space-y-1">
              <li>⭐ {progress.totalStars} estrelas conquistadas</li>
              <li>🏅 {progress.medals.length} medalhas</li>
              <li>🪙 {progress.coins} moedas mágicas</li>
              <li>✅ {progress.stats.totalCorrect} acertos · ❌ {progress.stats.totalWrong} erros</li>
              <li>📚 {progress.stats.totalLevelsCompleted} fases concluídas</li>
            </ul>
          </section>

          <section className="rounded-3xl bg-white shadow-soft p-4">
            <h2 className="font-display font-extrabold text-lg mb-2">Gerenciar</h2>
            <button
              onClick={() => {
                if (confirm("Tem certeza que deseja reiniciar o progresso?")) {
                  reset(); toast.success("Progresso reiniciado.");
                }
              }}
              className="w-full rounded-2xl bg-destructive text-white py-3 font-bold">
              Reiniciar progresso
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
