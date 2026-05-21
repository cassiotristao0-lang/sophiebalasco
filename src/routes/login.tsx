import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Mail, Lock, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — Sophie" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/" });
  }, [session, loading, navigate]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null); setInfo(null); setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { name },
          },
        });
        if (error) throw error;
        setInfo("Cadastro feito! Verifique seu e-mail para confirmar a conta.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur shadow-soft mb-3">
          <Sparkles className="w-4 h-4 text-magic" />
          <span className="text-xs font-bold text-magic">Área dos Pais</span>
        </div>
        <h1 className="font-display text-3xl font-extrabold bg-gradient-magic bg-clip-text text-transparent">
          {mode === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Acompanhe a aventura da sua criança 💖
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full rounded-3xl bg-white p-6 shadow-magic space-y-4">
        {mode === "signup" && (
          <Field label="Seu nome" icon={<Sparkles className="w-4 h-4" />}>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              placeholder="Ex.: Camila" className="w-full bg-transparent outline-none" />
          </Field>
        )}
        <Field label="E-mail" icon={<Mail className="w-4 h-4" />}>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="voce@email.com" className="w-full bg-transparent outline-none" />
        </Field>
        <Field label="Senha" icon={<Lock className="w-4 h-4" />}>
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres" className="w-full bg-transparent outline-none" />
        </Field>

        {error && (
          <div className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive p-3 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
          </div>
        )}
        {info && (
          <div className="rounded-xl bg-success/15 text-foreground p-3 text-sm">{info}</div>
        )}

        <button type="submit" disabled={busy}
          className="w-full py-3 rounded-2xl bg-gradient-magic text-primary-foreground font-bold shadow-magic disabled:opacity-60 active:scale-95 transition-transform">
          {busy ? "Aguarde…" : mode === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <div className="flex items-center justify-between text-sm pt-1">
          <button type="button" onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); setInfo(null); }}
            className="font-bold text-magic">
            {mode === "login" ? "Criar conta" : "Já tenho conta"}
          </button>
          {mode === "login" && (
            <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground">
              Esqueci a senha
            </Link>
          )}
        </div>
      </form>

      <Link to="/" className="mt-4 text-xs text-muted-foreground">← Voltar</Link>
    </main>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="mt-1 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 border border-border focus-within:border-primary transition-colors">
        <span className="text-muted-foreground">{icon}</span>
        {children}
      </div>
    </label>
  );
}
