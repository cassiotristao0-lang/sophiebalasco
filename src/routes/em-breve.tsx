import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/em-breve")({
  component: () => (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto text-center">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold mb-6">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <div className="text-7xl mb-3 animate-float">🐶✨</div>
      <h1 className="font-display text-2xl font-extrabold">Em breve!</h1>
      <p className="text-muted-foreground mt-2">
        O Pix está preparando essa parte com muito carinho. Aguarde a próxima etapa do jogo!
      </p>
    </main>
  ),
});
