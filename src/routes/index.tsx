import { createFileRoute, Link } from "@tanstack/react-router";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { useProgress } from "@/hooks/use-progress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Map, Star, Award, Settings, ShieldCheck, Calendar, BookOpen, LogIn, LogOut } from "lucide-react";
import familiaCompleta from "@/assets/familia_completa.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "As Aventuras da Princesa Sophie" },
      { name: "description", content: "Jogo educativo gamificado infantil — aprenda Português, Inglês, Matemática, Ciências e Geografia com a Sophie e o Pix!" },
    ],
  }),
  component: Home,
});

function Home() {
  const { progress } = useProgress();
  const { user } = useAuth();
  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex justify-end mb-2">
        {user ? (
          <button onClick={() => supabase.auth.signOut()}
            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-white shadow-soft active:scale-95">
            <LogOut className="w-3 h-3" /> Sair
          </button>
        ) : (
          <Link to="/login"
            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full bg-white shadow-soft active:scale-95">
            <LogIn className="w-3 h-3" /> Entrar
          </Link>
        )}
      </div>
      <header className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/70 backdrop-blur shadow-soft mb-2">
          <Sparkles className="w-4 h-4 text-magic" />
          <span className="text-xs font-bold text-magic">O Grande Livro do Saber</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight bg-gradient-magic bg-clip-text text-transparent">
          As Aventuras da<br />Princesa Sophie
        </h1>
        {user && (
          <p className="text-xs text-muted-foreground mt-1">Olá, {user.email} 👋</p>
        )}
      </header>

      {/* HERO com a arte oficial da família */}
      <section className="relative rounded-3xl bg-gradient-magic p-2 shadow-magic mb-4 overflow-hidden border-4 border-white">
        <img
          src={familiaCompleta}
          alt="Família da Sophie em aventura educativa"
          className="w-full rounded-[1.35rem] object-cover shadow-soft"
          loading="eager"
        />
        <div className="absolute left-3 right-3 bottom-3 rounded-2xl bg-white/85 backdrop-blur px-3 py-2 shadow-soft">
          <p className="text-center font-display font-extrabold text-sm text-magic">
            Sophie, Pix e a família prontos para aprender brincando! 👑🐾
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-3xl bg-white p-3 shadow-soft flex items-center gap-2">
          <CharacterAvatar id="sophie" size="lg" fullBody />
          <div>
            <p className="font-display font-extrabold text-sm">Princesa Sophie</p>
            <p className="text-xs text-muted-foreground">Tranças rosas, coroa e coragem.</p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-3 shadow-soft flex items-center gap-2">
          <CharacterAvatar id="pix" size="lg" fullBody />
          <div>
            <p className="font-display font-extrabold text-sm">Pix Sabichão</p>
            <p className="text-xs text-muted-foreground">Golden com óculos e dicas.</p>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="grid grid-cols-3 gap-2 mb-5">
        <StatCard icon="⭐" label="Estrelas" value={progress.totalStars} />
        <StatCard icon="🪙" label="Moedas" value={progress.coins} />
        <StatCard icon="🏅" label="Medalhas" value={progress.medals.length} />
      </section>

      {/* Botões principais */}
      <section className="grid grid-cols-2 gap-3">
        <BigButton to="/mapa" icon={<Map className="w-6 h-6" />} label="Jogar" sub="Mapa dos Mundos" primary />
        <BigButton to="/em-breve" icon={<Calendar className="w-6 h-6" />} label="Missão do Dia" sub="5 perguntas" />
        <BigButton to="/mapa" icon={<BookOpen className="w-6 h-6" />} label="Meus Mundos" sub={`${progress.medals.length}/9 conquistados`} />
        <BigButton to="/em-breve" icon={<Star className="w-6 h-6" />} label="Revisar" sub="Pratique mais!" />
        <BigButton to="/medalhas" icon={<Award className="w-6 h-6" />} label="Minhas Medalhas" sub="Coleção" />
        <BigButton to="/avatar" icon={<Sparkles className="w-6 h-6" />} label="Avatar" sub="Personalize" />
        <BigButton to="/em-breve" icon={<ShieldCheck className="w-6 h-6" />} label="Área dos Pais" sub="Protegida" />
        <BigButton to="/em-breve" icon={<Settings className="w-6 h-6" />} label="Ajustes" sub="Sons, etc." />
      </section>

      <footer className="text-center text-xs text-muted-foreground mt-6">
        Feito com 💖 para a Sophie
      </footer>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white shadow-soft p-3 text-center">
      <div className="text-2xl">{icon}</div>
      <div className="font-display font-extrabold text-lg leading-none">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</div>
    </div>
  );
}

function BigButton({
  to, icon, label, sub, primary,
}: { to: string; icon: React.ReactNode; label: string; sub: string; primary?: boolean }) {
  return (
    <Link
      to={to}
      className={`group rounded-2xl p-4 text-left transition-transform active:scale-95 shadow-soft ${
        primary
          ? "bg-gradient-magic text-primary-foreground shadow-magic col-span-2"
          : "bg-white text-foreground hover:bg-secondary/40"
      }`}
    >
      <div className={`mb-2 inline-flex items-center justify-center w-10 h-10 rounded-xl ${primary ? "bg-white/20" : "bg-secondary/60"}`}>
        {icon}
      </div>
      <div className="font-display font-bold text-base leading-tight">{label}</div>
      <div className={`text-xs ${primary ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{sub}</div>
    </Link>
  );
}
