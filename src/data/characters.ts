import sophieImg from "@/assets/princesa_sophie.png";
import cassioImg from "@/assets/pai_cassio.png";
import camilaImg from "@/assets/mae_camila.png";
import luciaImg from "@/assets/vo_lucia.png";
import antonioImg from "@/assets/vo_antonio.png";
import bernardoImg from "@/assets/primo_bernardo.png";
import pixImg from "@/assets/pix_golden.png";

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
  appearance: string;
  accessories: string[];
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
    appearance: "Menina parda, tranças rosas, olhar alegre, pose confiante de princesa aventureira.",
    accessories: ["coroa dourada", "bolsinha transversal", "meias listradas", "tênis rosa", "pulseiras", "miçangas nas tranças"],
  },
  cassio: {
    id: "cassio",
    name: "Pai Cássio",
    role: "Forte, divertido e protetor",
    image: cassioImg,
    gradient: "from-emerald-300 to-green-500",
    catchphrase: "Calma, princesa. Vamos pensar juntos.",
    helpsWith: "Matemática e raciocínio",
    appearance: "Pai negro, barba marcada, sorriso acolhedor, camisa verde e postura confiante.",
    accessories: ["camisa verde", "camiseta clara", "calça jeans", "relógio"],
  },
  camila: {
    id: "camila",
    name: "Mãe Camila",
    role: "Carinhosa e inteligente",
    image: camilaImg,
    gradient: "from-rose-300 to-pink-400",
    catchphrase: "Leia com atenção, meu amor. A resposta está no detalhe.",
    helpsWith: "Português e leitura",
    appearance: "Mãe branca, cabelo preto longo, expressão doce e roupa clara elegante.",
    accessories: ["brincos dourados", "colar delicado", "blusa clara", "calça jeans", "cinto"],
  },
  lucia: {
    id: "lucia",
    name: "Vó Lucia",
    role: "Doce, sábia e paciente",
    image: luciaImg,
    gradient: "from-purple-300 to-fuchsia-500",
    catchphrase: "Aprender é como cuidar de uma plantinha.",
    helpsWith: "Ciências e natureza",
    appearance: "Avó parda, óculos redondos, cabelo cacheado, roupa roxa e vestido floral.",
    accessories: ["óculos", "faixa roxa", "cardigan roxo", "vestido floral", "colar"],
  },
  antonio: {
    id: "antonio",
    name: "Vô Antônio",
    role: "Calmo, sábio e observador",
    image: antonioImg,
    gradient: "from-sky-300 to-blue-400",
    catchphrase: "Todo caminho fica fácil quando entendemos o mapa.",
    helpsWith: "Geografia e mapas",
    appearance: "Avô pardo, bigode grisalho, óculos redondos, boina e roupa verde clássica.",
    accessories: ["boina", "óculos", "bengala", "casaco verde", "roupa social casual"],
  },
  bernardo: {
    id: "bernardo",
    name: "Primo Bernardo",
    role: "Animado e parceiro",
    image: bernardoImg,
    gradient: "from-yellow-300 to-amber-400",
    catchphrase: "Bora, Sophie! Essa fase é nossa!",
    helpsWith: "Mini games e revisão",
    appearance: "Menino pardo, cabelo cacheado, jaqueta amarela e energia de parceiro de aventura.",
    accessories: ["jaqueta amarela", "camiseta divertida", "short azul", "tênis verde"],
  },
  pix: {
    id: "pix",
    name: "Pix, o Golden Sabichão",
    role: "Cachorro fofo e inteligente",
    image: pixImg,
    gradient: "from-amber-200 to-yellow-300",
    catchphrase: "Au-au! Dica do Pix a caminho!",
    helpsWith: "Dá dicas em todas as fases",
    appearance: "Golden Retriever carismático, feliz, inteligente e com cara de conselheiro da aventura.",
    accessories: ["óculos redondos", "bandana roxa", "medalhinha", "pose de dica"],
  },
};
