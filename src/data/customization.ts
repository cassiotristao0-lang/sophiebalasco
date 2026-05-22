export type AvatarTarget = "sophie" | "pix";
export type ItemRarity = "comum" | "raro" | "epico" | "lendario";

export interface CustomItem {
  id: string;
  target: AvatarTarget;
  category: string;
  name: string;
  emoji: string;
  price: number;
  rarity: ItemRarity;
  unlockHint?: string;
}

export const rarityLabel: Record<ItemRarity, string> = {
  comum: "Comum",
  raro: "Raro",
  epico: "Épico",
  lendario: "Lendário",
};

export const rarityClasses: Record<ItemRarity, string> = {
  comum: "bg-secondary/60 text-foreground",
  raro: "bg-sky/70 text-foreground",
  epico: "bg-magic/15 text-magic",
  lendario: "bg-accent/80 text-accent-foreground",
};

export const customItems: CustomItem[] = [
  // Sophie — cabelos
  { id: "sophie-hair-pink-braids", target: "sophie", category: "Cabelos", name: "Tranças rosas", emoji: "💗", price: 0, rarity: "comum" },
  { id: "sophie-hair-stars", target: "sophie", category: "Cabelos", name: "Tranças com estrelas", emoji: "✨", price: 80, rarity: "raro" },
  { id: "sophie-hair-bows", target: "sophie", category: "Cabelos", name: "Tranças com laços", emoji: "🎀", price: 70, rarity: "comum" },
  { id: "sophie-hair-beads", target: "sophie", category: "Cabelos", name: "Miçangas coloridas", emoji: "🌈", price: 120, rarity: "raro" },

  // Sophie — cabeça
  { id: "sophie-head-gold-crown", target: "sophie", category: "Cabeça", name: "Coroa dourada", emoji: "👑", price: 0, rarity: "comum" },
  { id: "sophie-head-flower-tiara", target: "sophie", category: "Cabeça", name: "Tiara de flores", emoji: "🌸", price: 100, rarity: "raro" },
  { id: "sophie-head-explorer", target: "sophie", category: "Cabeça", name: "Chapéu exploradora", emoji: "🧢", price: 140, rarity: "raro" },
  { id: "sophie-head-legendary-crown", target: "sophie", category: "Cabeça", name: "Coroa lendária", emoji: "💎", price: 500, rarity: "lendario", unlockHint: "Prêmio de campeã do saber" },

  // Sophie — roupas
  { id: "sophie-outfit-princess", target: "sophie", category: "Roupas", name: "Princesa aventureira", emoji: "👗", price: 0, rarity: "comum" },
  { id: "sophie-outfit-school", target: "sophie", category: "Roupas", name: "Uniforme mágico", emoji: "🎒", price: 90, rarity: "comum" },
  { id: "sophie-outfit-scientist", target: "sophie", category: "Roupas", name: "Cientista mirim", emoji: "🥼", price: 180, rarity: "epico" },
  { id: "sophie-outfit-astronaut", target: "sophie", category: "Roupas", name: "Astronauta", emoji: "🧑‍🚀", price: 220, rarity: "epico" },
  { id: "sophie-outfit-hero", target: "sophie", category: "Roupas", name: "Heroína do Saber", emoji: "🦸", price: 300, rarity: "epico" },

  // Sophie — acessórios
  { id: "sophie-acc-book", target: "sophie", category: "Acessórios", name: "Livro encantado", emoji: "📖", price: 60, rarity: "comum" },
  { id: "sophie-acc-wand", target: "sophie", category: "Acessórios", name: "Varinha mágica", emoji: "🪄", price: 130, rarity: "raro" },
  { id: "sophie-acc-map", target: "sophie", category: "Acessórios", name: "Mapa mágico", emoji: "🗺️", price: 110, rarity: "raro" },
  { id: "sophie-acc-lantern", target: "sophie", category: "Acessórios", name: "Lanterna de aventura", emoji: "🔦", price: 100, rarity: "comum" },

  // Sophie — cenário
  { id: "sophie-bg-castle", target: "sophie", category: "Cenário", name: "Castelo encantado", emoji: "🏰", price: 0, rarity: "comum" },
  { id: "sophie-bg-library", target: "sophie", category: "Cenário", name: "Biblioteca mágica", emoji: "📚", price: 160, rarity: "raro" },
  { id: "sophie-bg-forest", target: "sophie", category: "Cenário", name: "Floresta do Inglês", emoji: "🌳", price: 160, rarity: "raro" },
  { id: "sophie-bg-lab", target: "sophie", category: "Cenário", name: "Laboratório", emoji: "🔬", price: 200, rarity: "epico" },

  // Pix
  { id: "pix-glasses-round", target: "pix", category: "Óculos", name: "Óculos sabichão", emoji: "🤓", price: 0, rarity: "comum" },
  { id: "pix-glasses-star", target: "pix", category: "Óculos", name: "Óculos de estrela", emoji: "⭐", price: 100, rarity: "raro" },
  { id: "pix-scarf-purple", target: "pix", category: "Lenços", name: "Lenço roxo", emoji: "🟣", price: 0, rarity: "comum" },
  { id: "pix-scarf-paws", target: "pix", category: "Lenços", name: "Lenço de patinhas", emoji: "🐾", price: 90, rarity: "comum" },
  { id: "pix-hat-professor", target: "pix", category: "Chapéus", name: "Chapéu professor", emoji: "🎓", price: 150, rarity: "raro" },
  { id: "pix-hat-wizard", target: "pix", category: "Chapéus", name: "Chapéu de mago", emoji: "🧙", price: 220, rarity: "epico" },
  { id: "pix-acc-medal", target: "pix", category: "Acessórios", name: "Medalha dourada", emoji: "🏅", price: 180, rarity: "epico" },
  { id: "pix-acc-book", target: "pix", category: "Acessórios", name: "Livrinho do Pix", emoji: "📘", price: 120, rarity: "raro" },
];

export const defaultOwnedItems = customItems.filter(item => item.price === 0).map(item => item.id);

export function getItem(itemId: string) {
  return customItems.find(item => item.id === itemId);
}

export function categoriesFor(target: AvatarTarget) {
  return [...new Set(customItems.filter(item => item.target === target).map(item => item.category))];
}
