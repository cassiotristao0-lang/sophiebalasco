import type { CharacterId } from "./characters";

export type Subject =
  | "portugues" | "ingles" | "matematica" | "geografia" | "ciencias" | "revisao";

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer: number;            // index of correct option
  explanation: string;
  hint: string;              // dica do Pix
}

export interface Level {
  id: number;
  name: string;
  questions: Question[];
}

export interface World {
  id: number;
  name: string;
  subject: Subject;
  guide: CharacterId;
  icon: string;
  gradient: string;          // tailwind gradient classes
  description: string;
  levels: Level[];
}

// ============== MUNDO 1 — Português ==============
const mundo1Levels: Level[] = [
  {
    id: 1, name: "A Porta do Alfabeto",
    questions: [
      { id: "1-1-1", prompt: "Qual é a primeira letra do alfabeto?", options: ["B", "A", "C", "D"], answer: 1,
        explanation: "O alfabeto começa com a letra A.", hint: "Pense na letra que abre o ABC!" },
      { id: "1-1-2", prompt: "Qual letra vem depois do M?", options: ["L", "O", "N", "P"], answer: 2,
        explanation: "A ordem é L, M, N, O...", hint: "Canta o alfabeto baixinho 🎵" },
      { id: "1-1-3", prompt: "Quantas letras tem o alfabeto português?", options: ["20", "23", "26", "30"], answer: 2,
        explanation: "Nosso alfabeto tem 26 letras.", hint: "É um pouco mais que 25!" },
      { id: "1-1-4", prompt: "Qual destas é uma letra MAIÚSCULA?", options: ["a", "b", "C", "d"], answer: 2,
        explanation: "Letras maiúsculas são as grandes, como C.", hint: "Procure a letra grandona!" },
      { id: "1-1-5", prompt: "Qual letra vem antes do F?", options: ["E", "G", "D", "H"], answer: 0,
        explanation: "A ordem é D, E, F, G...", hint: "Conte de trás pra frente." },
    ],
  },
  {
    id: 2, name: "A Ponte das Vogais",
    questions: [
      { id: "1-2-1", prompt: "Quais são as vogais?", options: ["A, E, I, O, U", "B, C, D, F, G", "A, B, C, D, E", "M, N, P, Q, R"], answer: 0,
        explanation: "As vogais são A, E, I, O, U.", hint: "Cinco letras especiais!" },
      { id: "1-2-2", prompt: "Qual destas palavras começa com vogal?", options: ["Casa", "Mesa", "Abelha", "Pato"], answer: 2,
        explanation: "Abelha começa com a vogal A.", hint: "Procure a letrinha A no começo." },
      { id: "1-2-3", prompt: "Quantas vogais tem a palavra ESCOLA?", options: ["1", "2", "3", "4"], answer: 2,
        explanation: "E-S-C-O-L-A tem E, O e A: 3 vogais.", hint: "Conte só as vogais: E, O, A." },
      { id: "1-2-4", prompt: "Qual é uma consoante?", options: ["A", "E", "M", "U"], answer: 2,
        explanation: "M é uma consoante, não é vogal.", hint: "Tire as vogais e veja o que sobra." },
      { id: "1-2-5", prompt: "A palavra OVO tem quantas vogais?", options: ["1", "2", "3", "0"], answer: 1,
        explanation: "O-V-O tem duas vogais: O e O.", hint: "Conte os O." },
    ],
  },
  {
    id: 3, name: "O Castelo das Sílabas",
    questions: [
      { id: "1-3-1", prompt: "Qual palavra está separada corretamente em sílabas?", options: ["ca-sa", "cas-a", "c-asa", "casa-"], answer: 0,
        explanation: "A palavra casa tem duas sílabas: ca-sa.", hint: "Bata palmas falando a palavra." },
      { id: "1-3-2", prompt: "Quantas sílabas tem BORBOLETA?", options: ["2", "3", "4", "5"], answer: 2,
        explanation: "Bor-bo-le-ta tem 4 sílabas.", hint: "Bata palmas: bor-bo-le-ta!" },
      { id: "1-3-3", prompt: "Quantas sílabas tem SOL?", options: ["1", "2", "3", "4"], answer: 0,
        explanation: "Sol tem uma sílaba só.", hint: "Uma palminha só!" },
      { id: "1-3-4", prompt: "Separe: ESCOLA", options: ["es-co-la", "esc-ola", "e-sco-la", "escola"], answer: 0,
        explanation: "Es-co-la tem 3 sílabas.", hint: "Três batidinhas." },
      { id: "1-3-5", prompt: "Qual tem 2 sílabas?", options: ["Mar", "Casa", "Bicicleta", "Pé"], answer: 1,
        explanation: "Ca-sa tem 2 sílabas.", hint: "Duas batidas de palma." },
    ],
  },
  {
    id: 4, name: "A Floresta das Palavras",
    questions: [
      { id: "1-4-1", prompt: "Qual letra falta em GA__O para formar gato?", options: ["T", "L", "R", "P"], answer: 0,
        explanation: "GA + T + O = gato.", hint: "Pense no bichinho que faz miau." },
      { id: "1-4-2", prompt: "Forme a palavra: BO-LA é...", options: ["Bola", "Bolo", "Bala", "Bela"], answer: 0,
        explanation: "BO + LA = bola.", hint: "Junte as duas sílabas." },
      { id: "1-4-3", prompt: "Qual palavra é formada por MA + ÇÃ?", options: ["Massa", "Maça", "Maçã", "Macio"], answer: 2,
        explanation: "MA + ÇÃ = maçã (a fruta).", hint: "É uma fruta vermelha 🍎" },
      { id: "1-4-4", prompt: "Junte: PE + RU", options: ["Pera", "Peru", "Puro", "Pena"], answer: 1,
        explanation: "PE + RU = peru.", hint: "É um animal que faz glu-glu." },
      { id: "1-4-5", prompt: "Qual letra completa PA__O (pato)?", options: ["T", "L", "S", "N"], answer: 0,
        explanation: "PA + T + O = pato.", hint: "Faz quá-quá!" },
    ],
  },
  {
    id: 5, name: "O Baú dos Sinônimos",
    questions: [
      { id: "1-5-1", prompt: "Qual é sinônimo de BONITO?", options: ["Feio", "Lindo", "Triste", "Grande"], answer: 1,
        explanation: "Bonito e lindo querem dizer a mesma coisa.", hint: "Pense em algo parecido com belo." },
      { id: "1-5-2", prompt: "Sinônimo de ALEGRE:", options: ["Feliz", "Bravo", "Calmo", "Frio"], answer: 0,
        explanation: "Alegre = feliz.", hint: "Quando você está sorrindo!" },
      { id: "1-5-3", prompt: "Sinônimo de RÁPIDO:", options: ["Devagar", "Veloz", "Parado", "Calmo"], answer: 1,
        explanation: "Rápido = veloz.", hint: "Como um carro de corrida!" },
      { id: "1-5-4", prompt: "Sinônimo de CASA:", options: ["Lar", "Rua", "Carro", "Praça"], answer: 0,
        explanation: "Casa = lar.", hint: "Lugar onde você mora." },
      { id: "1-5-5", prompt: "Sinônimo de CRIANÇA:", options: ["Idoso", "Menino", "Velho", "Animal"], answer: 1,
        explanation: "Criança = menino ou menina.", hint: "Pequena pessoa 👧" },
    ],
  },
  {
    id: 6, name: "A Caverna dos Antônimos",
    questions: [
      { id: "1-6-1", prompt: "Antônimo de GRANDE:", options: ["Enorme", "Pequeno", "Alto", "Largo"], answer: 1,
        explanation: "Antônimo é o contrário. Grande × Pequeno.", hint: "Pense no contrário!" },
      { id: "1-6-2", prompt: "Antônimo de QUENTE:", options: ["Morno", "Frio", "Tépido", "Calor"], answer: 1,
        explanation: "Quente × Frio.", hint: "Pense no gelo." },
      { id: "1-6-3", prompt: "Antônimo de ALTO:", options: ["Baixo", "Comprido", "Largo", "Magro"], answer: 0,
        explanation: "Alto × Baixo.", hint: "Olhe pra baixo!" },
      { id: "1-6-4", prompt: "Antônimo de DIA:", options: ["Tarde", "Manhã", "Noite", "Hora"], answer: 2,
        explanation: "Dia × Noite.", hint: "Quando aparecem as estrelas?" },
      { id: "1-6-5", prompt: "Antônimo de ABRIR:", options: ["Fechar", "Pular", "Correr", "Olhar"], answer: 0,
        explanation: "Abrir × Fechar.", hint: "O contrário de abrir a porta." },
    ],
  },
  {
    id: 7, name: "O Rio das Frases",
    questions: [
      { id: "1-7-1", prompt: "Complete: Sophie ___ ao parque.", options: ["foi", "foram", "fui", "fôssemos"], answer: 0,
        explanation: "Sophie é uma pessoa: ela foi.", hint: "Uma pessoa só, no passado." },
      { id: "1-7-2", prompt: "Complete: O Pix ___ um cachorro.", options: ["sou", "é", "são", "somos"], answer: 1,
        explanation: "Ele é um cachorro.", hint: "Verbo SER no singular." },
      { id: "1-7-3", prompt: "Qual frase está correta?", options: ["Eu vai à escola.", "Eu vou à escola.", "Eu vamos à escola.", "Eu vão à escola."], answer: 1,
        explanation: "Eu vou — verbo ir no presente.", hint: "Com EU, usamos VOU." },
      { id: "1-7-4", prompt: "Complete: Nós ___ felizes.", options: ["estou", "está", "estamos", "estão"], answer: 2,
        explanation: "Nós estamos — verbo estar no plural.", hint: "Com NÓS sempre termina em -mos." },
      { id: "1-7-5", prompt: "Complete: A maçã ___ vermelha.", options: ["é", "são", "somos", "sou"], answer: 0,
        explanation: "A maçã (uma) é.", hint: "Uma fruta só." },
    ],
  },
  {
    id: 8, name: "A Torre da Pontuação",
    questions: [
      { id: "1-8-1", prompt: "Qual sinal usamos para fazer uma pergunta?", options: [".", "?", "!", ","], answer: 1,
        explanation: "O ponto de interrogação ? indica pergunta.", hint: "Aquele com a bolinha embaixo." },
      { id: "1-8-2", prompt: "Que sinal mostra surpresa ou alegria?", options: [".", "?", "!", ":"], answer: 2,
        explanation: "O ponto de exclamação ! mostra emoção.", hint: "Uma linha reta com bolinha!" },
      { id: "1-8-3", prompt: "Qual sinal termina uma frase normal?", options: [".", "?", "!", "-"], answer: 0,
        explanation: "O ponto final . termina a frase.", hint: "É só uma bolinha pequenininha." },
      { id: "1-8-4", prompt: "Em qual frase usamos o ?", options: ["Que dia lindo", "Como você está", "Eu gosto de bolo", "A casa é grande"], answer: 1,
        explanation: "Como você está? é uma pergunta.", hint: "Procure uma pergunta!" },
      { id: "1-8-5", prompt: "Qual frase precisa de !?", options: ["O céu é azul", "Que legal", "Eu estudo muito", "A flor é bonita"], answer: 1,
        explanation: "Que legal! mostra emoção.", hint: "Onde tem mais emoção?" },
    ],
  },
  {
    id: 9, name: "O Jardim dos Substantivos",
    questions: [
      { id: "1-9-1", prompt: "Substantivo é a palavra que dá nome a:", options: ["Ações", "Coisas, pessoas e lugares", "Cores", "Sons"], answer: 1,
        explanation: "Substantivos dão nome a coisas, pessoas, lugares e animais.", hint: "Coisas que existem!" },
      { id: "1-9-2", prompt: "Qual é um substantivo?", options: ["Correr", "Bonito", "Cachorro", "Pular"], answer: 2,
        explanation: "Cachorro é nome de animal: substantivo.", hint: "Pense em algo que tem nome." },
      { id: "1-9-3", prompt: "Plural de FLOR:", options: ["Flora", "Flores", "Florinha", "Florido"], answer: 1,
        explanation: "Flor → Flores (mais de uma).", hint: "Mais de uma florzinha." },
      { id: "1-9-4", prompt: "Feminino de MENINO:", options: ["Menina", "Menininho", "Garoto", "Bebê"], answer: 0,
        explanation: "Menino (masculino) → Menina (feminino).", hint: "Termina em -a." },
      { id: "1-9-5", prompt: "Diminutivo de CASA:", options: ["Casona", "Casinha", "Casarão", "Casas"], answer: 1,
        explanation: "Diminutivo deixa pequenininho: casinha.", hint: "Pequenininha!" },
    ],
  },
  {
    id: 10, name: "O Desafio da Interpretação",
    questions: [
      { id: "1-10-1", prompt: "Leia: 'Sophie acordou cedo e foi para a escola com a mãe.' Quem foi para a escola?", options: ["O pai", "A Sophie", "A vó", "O Pix"], answer: 1,
        explanation: "O texto diz que Sophie acordou e foi para a escola.", hint: "Releia procurando o nome." },
      { id: "1-10-2", prompt: "Leia: 'O Pix abana o rabo quando vê comida.' O Pix abana o rabo quando:", options: ["Está triste", "Vê comida", "Dorme", "Late"], answer: 1,
        explanation: "O texto diz: quando vê comida.", hint: "Procure a parte 'quando'." },
      { id: "1-10-3", prompt: "Leia: 'A vovó plantou uma roseira no jardim.' O que ela plantou?", options: ["Uma árvore", "Uma roseira", "Uma cenoura", "Um pé de feijão"], answer: 1,
        explanation: "Ela plantou uma roseira.", hint: "Logo após 'plantou'." },
      { id: "1-10-4", prompt: "Leia: 'O vovô levou a Sophie no parque.' Onde eles foram?", options: ["Praia", "Escola", "Parque", "Mercado"], answer: 2,
        explanation: "Eles foram ao parque.", hint: "No final da frase." },
      { id: "1-10-5", prompt: "Leia: 'O Bernardo trouxe bolo de chocolate.' De que era o bolo?", options: ["Morango", "Baunilha", "Chocolate", "Limão"], answer: 2,
        explanation: "O bolo era de chocolate.", hint: "Sabor do bolo." },
    ],
  },
];

// Placeholder levels generator para outros mundos (próximas etapas)
function placeholderLevels(prefix: string, count: number): Level[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Fase ${i + 1}`,
    questions: [{
      id: `${prefix}-${i + 1}-1`,
      prompt: "Em breve! Esta fase ainda está sendo preparada pelo Pix 🐾",
      options: ["Ok!", "Voltar", "Esperar", "Tudo bem"],
      answer: 0,
      explanation: "Volte em breve para novas aventuras!",
      hint: "Esta fase chega na próxima etapa do jogo.",
    }],
  }));
}

export const worlds: World[] = [
  {
    id: 1, name: "Reino das Palavras Perdidas", subject: "portugues", guide: "camila",
    icon: "📖", gradient: "from-pink-400 to-fuchsia-500",
    description: "Recupere as páginas com a Mãe Camila!",
    levels: mundo1Levels,
  },
  {
    id: 2, name: "Floresta do Inglês Mágico", subject: "ingles", guide: "lucia",
    icon: "🌳", gradient: "from-emerald-400 to-teal-500",
    description: "Aprenda inglês com a Vó Lucia e o Pix!",
    levels: placeholderLevels("2", 10),
  },
  {
    id: 3, name: "Montanha dos Números", subject: "matematica", guide: "cassio",
    icon: "🏔️", gradient: "from-sky-400 to-blue-500",
    description: "Escale a montanha da matemática com o Pai Cássio!",
    levels: placeholderLevels("3", 10),
  },
  {
    id: 4, name: "Mapa Encantado do Vô Antônio", subject: "geografia", guide: "antonio",
    icon: "🗺️", gradient: "from-amber-400 to-orange-500",
    description: "Explore o mundo com o Vô Antônio!",
    levels: placeholderLevels("4", 10),
  },
  {
    id: 5, name: "Laboratório da Natureza", subject: "ciencias", guide: "lucia",
    icon: "🌱", gradient: "from-green-400 to-emerald-500",
    description: "Descubra os segredos da natureza com a Vó Lucia!",
    levels: placeholderLevels("5", 10),
  },
  {
    id: 6, name: "Arena do Primo Bernardo", subject: "revisao", guide: "bernardo",
    icon: "⚡", gradient: "from-yellow-400 to-amber-500",
    description: "Desafios relâmpago com o primo Bernardo!",
    levels: placeholderLevels("6", 10),
  },
  {
    id: 7, name: "Ilha dos Livros Encantados", subject: "portugues", guide: "camila",
    icon: "🏝️", gradient: "from-cyan-400 to-blue-500",
    description: "Leituras mágicas com a Mãe Camila!",
    levels: placeholderLevels("7", 10),
  },
  {
    id: 8, name: "Reino Bilingue da Sophie", subject: "ingles", guide: "pix",
    icon: "🌍", gradient: "from-purple-400 to-fuchsia-500",
    description: "Pratique inglês com o Pix!",
    levels: placeholderLevels("8", 10),
  },
  {
    id: 9, name: "Castelo Final do Saber", subject: "revisao", guide: "sophie",
    icon: "🏰", gradient: "from-rose-500 to-purple-600",
    description: "O grande desafio final com toda a família!",
    levels: placeholderLevels("9", 10),
  },
];

export function getWorld(id: number): World | undefined {
  return worlds.find(w => w.id === id);
}
