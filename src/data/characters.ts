import sophieImg from "@/assets/char-sophie.png";
import cassioImg from "@/assets/char-cassio.png";
import camilaImg from "@/assets/char-camila.png";
import luciaImg from "@/assets/char-lucia.png";
import antonioImg from "@/assets/char-antonio.png";
import bernardoImg from "@/assets/char-bernardo.png";
import pixImg from "@/assets/char-pix.png";

export type CharacterId =
  | "sophie" | "cassio" | "camila" | "lucia" | "antonio" | "bernardo" | "pix";

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  image: string;
  gradient: string;
  catchphrase: string;
  helpsWith: string;
}

export const characters: Record<CharacterId, Character> = {
  sophie: {
    id: "sophie",
    name: "Princesa Sophie",
    role: "A heroína da aventura",
    image: sophieImg,
    gradient: "from-pink-300 to-fuchsia-400",
    catchphrase: "Vamos aprender brincando!",
    helpsWith: "Você é a Sophie!",
  },
  cassio: {
    id: "cassio",
    name: "Pai Cássio",
    role: "Forte, divertido e protetor",
    image: cassioImg,
    gradient: "from-amber-300 to-orange-400",
    catchphrase: "Calma, princesa. Vamos pensar juntos.",
    helpsWith: "Matemática e raciocínio",
  },
  camila: {
    id: "camila",
    name: "Mãe Camila",
    role: "Carinhosa e inteligente",
    image: camilaImg,
    gradient: "from-rose-300 to-pink-400",
    catchphrase: "Leia com atenção, meu amor. A resposta está no detalhe.",
    helpsWith: "Português e leitura",
  },
  lucia: {
    id: "lucia",
    name: "Vó Lucia",
    role: "Doce, sábia e paciente",
    image: luciaImg,
    gradient: "from-emerald-300 to-teal-400",
    catchphrase: "Aprender é como cuidar de uma plantinha.",
    helpsWith: "Ciências e natureza",
  },
  antonio: {
    id: "antonio",
    name: "Vô Antônio",
    role: "Calmo, sábio e observador",
    image: antonioImg,
    gradient: "from-sky-300 to-blue-400",
    catchphrase: "Todo caminho fica fácil quando entendemos o mapa.",
    helpsWith: "Geografia e mapas",
  },
  bernardo: {
    id: "bernardo",
    name: "Primo Bernardo",
    role: "Animado e parceiro",
    image: bernardoImg,
    gradient: "from-yellow-300 to-amber-400",
    catchphrase: "Bora, Sophie! Essa fase é nossa!",
    helpsWith: "Mini games e revisão",
  },
  pix: {
    id: "pix",
    name: "Pix, o Golden Sabichão",
    role: "Cachorro fofo e inteligente",
    image: pixImg,
    gradient: "from-amber-200 to-yellow-300",
    catchphrase: "Au-au! Dica do Pix a caminho!",
    helpsWith: "Dá dicas em todas as fases",
  },
};
