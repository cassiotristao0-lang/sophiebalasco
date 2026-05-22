import { createFileRoute, Link } from "@tanstack/react-router";
import { CharacterAvatar } from "@/components/CharacterAvatar";
import { useProgress } from "@/hooks/use-progress";
import { categoriesFor, customItems, getItem, rarityClasses, rarityLabel, type AvatarTarget } from "@/data/customization";
import { ArrowLeft, Check, Lock, Sparkles, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/avatar")({
  head: () => ({ meta: [{ title: "Closet Mágico — Sophie" }] }),
  component: AvatarPage,
});

function AvatarPage() {
  const { progress, buyItem, equipItem } = useProgress();
  const [target, setTarget] = useState<AvatarTarget>("sophie");
  const categories = categoriesFor(target);
  const [category, setCategory] = useState(categories[0] ?? "");

  const currentCategories = categoriesFor(target);
  const safeCategory = currentCategories.includes(category) ? category : currentCategories[0];
  const items = useMemo(
    () => customItems.filter(item => item.target === target && item.category === safeCategory),
    [target, safeCategory],
  );

  const equippedItems = Object.values(progress.inventory.equipped)
    .map(getItem)
    .filter(Boolean);

  function handleBuy(itemId: string) {
    const item = getItem(itemId);
    const ok = buyItem(itemId);
    if (ok) toast.success(`${item?.name} comprado!`);
    else toast.error("Moedas insuficientes ou item já comprado.");
  }

  function handleEquip(itemId: string) {
    const item = getItem(itemId);
    equipItem(itemId);
    toast.success(`${item?.name} equipado!`);
  }

  return (
    <main className="min-h-screen px-4 py-6 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Link to="/" className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-extrabold">Closet Mágico</h1>
          <p className="text-xs text-muted-foreground">Personalize Sophie e o Pix com moedas mágicas.</p>
        </div>
      </div>

      <section className="rounded-3xl bg-gradient-magic text-primary-foreground p-5 shadow-magic mb-4 overflow-hidden relative">
        <div className="absolute top-3 right-3 rounded-full bg-white/20 px-3 py-1 text-xs font-bold">🪙 {progress.coins}</div>
        <div className="flex items-end justify-center gap-3 mb-3">
          <CharacterAvatar id="sophie" size="xl" bounce />
          <CharacterAvatar id="pix" size="lg" bounce />
        </div>
        <div className="rounded-2xl bg-white/20 p-3">
          <p className="text-xs font-bold mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> Itens equipados</p>
          <div className="flex flex-wrap gap-1">
            {equippedItems.length ? equippedItems.map(item => (
              <span key={item!.id} className="rounded-full bg-white/25 px-2 py-1 text-xs font-bold">
                {item!.emoji} {item!.name}
              </span>
            )) : <span className="text-xs">Nenhum item equipado ainda.</span>}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <button onClick={() => { setTarget("sophie"); setCategory(categoriesFor("sophie")[0]); }}
          className={`rounded-2xl p-3 font-bold shadow-soft ${target === "sophie" ? "bg-gradient-magic text-primary-foreground" : "bg-white"}`}>
          👑 Sophie
        </button>
        <button onClick={() => { setTarget("pix"); setCategory(categoriesFor("pix")[0]); }}
          className={`rounded-2xl p-3 font-bold shadow-soft ${target === "pix" ? "bg-gradient-sun text-accent-foreground" : "bg-white"}`}>
          🐶 Pix
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
        {currentCategories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold shadow-soft ${safeCategory === cat ? "bg-foreground text-white" : "bg-white"}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {items.map(item => {
          const owned = progress.inventory.owned.includes(item.id);
          const slot = `${item.target}:${item.category}`;
          const equipped = progress.inventory.equipped[slot] === item.id;
          const canBuy = progress.coins >= item.price;
          return (
            <div key={item.id} className="rounded-2xl bg-white shadow-soft p-3 flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl">{item.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm leading-tight">{item.name}</p>
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${rarityClasses[item.rarity]}`}>{rarityLabel[item.rarity]}</span>
                  <span className="text-xs text-muted-foreground">🪙 {item.price}</span>
                </div>
                {item.unlockHint && <p className="text-[10px] text-muted-foreground mt-1">{item.unlockHint}</p>}
              </div>
              {equipped ? (
                <span className="inline-flex items-center gap-1 rounded-xl bg-success text-white px-3 py-2 text-xs font-bold"><Check className="w-4 h-4" /> Usando</span>
              ) : owned ? (
                <button onClick={() => handleEquip(item.id)} className="rounded-xl bg-gradient-magic text-primary-foreground px-3 py-2 text-xs font-bold">Equipar</button>
              ) : (
                <button onClick={() => handleBuy(item.id)} disabled={!canBuy}
                  className="rounded-xl bg-accent text-accent-foreground px-3 py-2 text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1">
                  {canBuy ? <ShoppingBag className="w-4 h-4" /> : <Lock className="w-4 h-4" />} Comprar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
