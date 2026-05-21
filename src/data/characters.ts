export type CharacterId =
  | "sophie" | "cassio" | "camila" | "lucia" | "antonio" | "bernardo" | "pix";

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  emoji: string;            // avatar visual (cartoon emoji até gerarmos arte)
  gradient: string;         // tailwind class
  catchphrase: string;
  helpsWith: string;
}

export const characters: Record<CharacterId, Character> = {
  sophie: {
    id: "sophie",
    name: "Princesa Sophie",
    role: "A heroína da aventura",
    emoji: "👸🏽",
    gradient: "from-pink-300 to-fuchsia-400",
    catchphrase: "Vamos aprender brincando!",
    helpsWith: "Você é a Sophie!",
  },
  cassio: {
    id: "cassio",
    name: "Pai Cássio",
    role: "Forte, divertido e protetor",
    emoji: "👨🏿‍🦲",
    gradient: "from-amber-300 to-orange-400",
    catchphrase: "Calma, princesa. Vamos pensar juntos.",
    helpsWith: "Matemática e raciocínio",
  },
  camila: {
    id: "camila",
    name: "Mãe Camila",
    role: "Carinhosa e inteligente",
    emoji: "👩🏻",
    gradient: "from-rose-300 to-pink-400",
    catchphrase: "Leia com atenção, meu amor. A resposta está no detalhe.",
    helpsWith: "Português e leitura",
  },
  lucia: {
    id: "lucia",
    name: "Vó Lucia",
    role: "Doce, sábia e paciente",
    emoji: "👵🏽",
    gradient: "from-emerald-300 to-teal-400",
    catchphrase: "Aprender é como cuidar de uma plantinha.",
    helpsWith: "Ciências e natureza",
  },
  antonio: {
    id: "antonio",
    name: "Vô Antônio",
    role: "Calmo, sábio e observador",
    emoji: "👴🏽",
    gradient: "from-sky-300 to-blue-400",
    catchphrase: "Todo caminho fica fácil quando entendemos o mapa.",
    helpsWith: "Geografia e mapas",
  },
  bernardo: {
    id: "bernardo",
    name: "Primo Bernardo",
    role: "Animado e parceiro",
    emoji: "🧒🏽",
    gradient: "from-yellow-300 to-amber-400",
    catchphrase: "Bora, Sophie! Essa fase é nossa!",
    helpsWith: "Mini games e revisão",
  },
  pix: {
    id: "pix",
    name: "Pix, o Golden Sabichão",
    role: "Cachorro fofo e inteligente",
    emoji: "🐶",
    gradient: "from-amber-200 to-yellow-300",
    catchphrase: "Au-au! Dica do Pix a caminho!",
    helpsWith: "Dá dicas em todas as fases",
  },
};
