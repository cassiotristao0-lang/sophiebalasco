export type MedalRarity = "comum" | "raro" | "epico" | "lendario";

export interface MedalDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: MedalRarity;
  rewardCoins: number;
  worldId?: number;
}

export const medalRarityClasses: Record<MedalRarity, string> = {
  comum: "bg-secondary/60 text-foreground",
  raro: "bg-sky/70 text-foreground",
  epico: "bg-magic/15 text-magic",
  lendario: "bg-accent/80 text-accent-foreground",
};

export const medals: MedalDefinition[] = [
  { id: "world-1", name: "Medalha das Palavras", description: "Concluir o Reino das Palavras Perdidas.", icon: "📖", rarity: "raro", rewardCoins: 100, worldId: 1 },
  { id: "world-2", name: "Medalha do Inglês Mágico", description: "Concluir a Floresta do Inglês Mágico.", icon: "🌳", rarity: "raro", rewardCoins: 100, worldId: 2 },
  { id: "world-3", name: "Medalha dos Números", description: "Concluir a Montanha dos Números.", icon: "🏔️", rarity: "raro", rewardCoins: 100, worldId: 3 },
  { id: "world-4", name: "Medalha dos Mapas", description: "Concluir o Mapa Encantado do Vô Antônio.", icon: "🗺️", rarity: "raro", rewardCoins: 100, worldId: 4 },
  { id: "world-5", name: "Medalha da Natureza", description: "Concluir o Laboratório da Natureza.", icon: "🌱", rarity: "raro", rewardCoins: 100, worldId: 5 },
  { id: "world-6", name: "Medalha da Arena", description: "Vencer a Arena do Primo Bernardo.", icon: "⚡", rarity: "epico", rewardCoins: 200, worldId: 6 },
  { id: "world-7", name: "Medalha dos Livros", description: "Concluir a Ilha dos Livros Encantados.", icon: "📚", rarity: "epico", rewardCoins: 200, worldId: 7 },
  { id: "world-8", name: "Medalha Bilíngue", description: "Concluir o Reino Bilíngue da Sophie.", icon: "🗣️", rarity: "epico", rewardCoins: 200, worldId: 8 },
  { id: "world-9", name: "Princesa do Saber", description: "Concluir o Castelo Final do Saber.", icon: "👑", rarity: "lendario", rewardCoins: 500, worldId: 9 },

  { id: "perfect-level", name: "Estrela Perfeita", description: "Fazer 100% em uma fase.", icon: "🌟", rarity: "epico", rewardCoins: 150 },
  { id: "first-level", name: "Primeira Página", description: "Concluir a primeira fase da aventura.", icon: "📄", rarity: "comum", rewardCoins: 50 },
  { id: "ten-levels", name: "Foco Total", description: "Concluir 10 fases.", icon: "🎯", rarity: "raro", rewardCoins: 120 },
  { id: "pix-friend", name: "Amiga do Pix", description: "Usar dicas do Pix em 10 perguntas.", icon: "🐶", rarity: "raro", rewardCoins: 120 },
  { id: "hundred-stars", name: "Céu Estrelado", description: "Conquistar 100 estrelas no jogo.", icon: "✨", rarity: "lendario", rewardCoins: 500 },
];

export function getMedal(id: string) {
  return medals.find(medal => medal.id === id);
}
