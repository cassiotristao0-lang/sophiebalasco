import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, ArrowLeft, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Recuperar senha — Sophie" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null); setBusy(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo deu errado.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto">
      <h1 className="font-display text-3xl font-extrabold mb-2 text-center bg-gradient-magic bg-clip-text text-transparent">
        Recuperar senha
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-5">
        Te enviaremos um link mágico no seu e-mail ✨
      </p>

      <form onSubmit={handleSubmit} className="w-full rounded-3xl bg-white p-6 shadow-magic space-y-4">
        {sent ? (
          <p className="text-center text-sm">
            📬 Verifique seu e-mail! Enviamos um link para criar uma nova senha.
          </p>
        ) : (
          <>
            <label className="block">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">E-mail</span>
              <div className="mt-1 flex items-center gap-2 rounded-xl bg-muted px-3 py-2.5 border border-border">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="voce@email.com" className="w-full bg-transparent outline-none" />
              </div>
            </label>

            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-destructive/10 text-destructive p-3 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /><span>{error}</span>
              </div>
            )}

            <button type="submit" disabled={busy}
              className="w-full py-3 rounded-2xl bg-gradient-magic text-primary-foreground font-bold shadow-magic disabled:opacity-60 active:scale-95 transition-transform">
              {busy ? "Enviando…" : "Enviar link"}
            </button>
          </>
        )}
      </form>

      <Link to="/login" className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
    </main>
  );
}
