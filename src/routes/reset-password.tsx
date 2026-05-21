import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Nova senha — Sophie" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Aguarda Supabase processar o token de recovery no hash da URL
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    // se já está logado (hash já processado), libera
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 6) { setError("A senha precisa de pelo menos 6 caracteres."); return; }
    if (password !== confirm) { setError("As senhas não conferem."); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
      setTimeout(() => navigate({ to: "/" }), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
      <h1 className="font-display text-3xl font-extrabold mb-5 text-center bg-gradient-magic bg-clip-text text-transparent">
        Criar nova senha
      </h1>

      <form onSubmit={handleSubmit} className="w-full rounded-3xl bg-white p-6 shadow-magic space-y-4">
        {!ready ? (
          <p className="text-center text-sm text-muted-foreground">Validando link… ✨</p>
        ) : done ? (
          <p className="text-center text-sm">✅ Senha alterada! Redirecionando…</p>
        ) : (
          <>
            <PasswordField label="Nova senha" value={password} onChange={setPassword} />
            <PasswordField label="Confirme a senha" value={confirm} onChange={setConfirm} />
            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive p-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
              </div>
            )}
            <button type="submit" disabled={busy}
              className="w-full py-3 rounded-2xl bg-gradient-magic text-primary-foreground font-bold shadow-magic disabled:opacity-60 active:scale-95 transition-transform">
              {busy ? "Salvando…" : "Salvar senha"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}

function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 border border-border">
        <Lock className="w-4 h-4 text-muted-foreground" />
        <input type="password" required minLength={6} value={value} onChange={e => onChange(e.target.value)}
          className="w-full bg-transparent outline-none" />
      </div>
    </label>
  );
}
