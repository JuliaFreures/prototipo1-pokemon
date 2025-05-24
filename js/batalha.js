const pokemons = [
  { nome: "Pikachu", vida: 100, attack: 35, def: 20 },
  { nome: "Charmander", vida: 100, attack: 40, def: 25 },
  { nome: "Squirtle", vida: 100, attack: 30, def: 25 },
  { nome: "Bulbasaur", vida: 100, attack: 30, def: 30 },
  { nome: "Jigglypuff", vida: 100, attack: 20, def: 20 },
  { nome: "Evee", vida: 100, attack: 30, def: 30 },
  { nome: "Gengar", vida: 100, attack: 50, def: 30 },
  { nome: "Snorlax", vida: 100, attack: 60, def: 30 },
  { nome: "Psyduck", vida: 100, attack: 40, def: 30 },
  { nome: "Dugtrio", vida: 100, attack: 40, def: 20 },
  { nome: "Mewtwo", vida: 100, attack: 60, def: 30 },
  { nome: "Mimikyu", vida: 100, attack: 40, def: 30 },
  { nome: "Gardevoir", vida: 100, attack: 40, def: 40 },
  { nome: "Jolteon", vida: 100, attack: 40, def: 30 },
  { nome: "Lucario", vida: 100, attack: 60, def: 40 },
  { nome: "Umbreon", vida: 100, attack: 50, def: 40 },
  { nome: "Spheal", vida: 100, attack: 30, def: 40 },
  { nome: "Dragonite", vida: 100, attack: 50, def: 40 }
];

const deckContainer = document.getElementById("deck-container");
const confirmarBtn = document.getElementById("confirmar");
const saida = document.getElementById("saida");

let jogadorAtual = 1;
const decks = [];
let deckAtual6 = [];

function sortearSeisPokemons() {
  const indices = new Set();
  while (indices.size < 6) {
    const rand = Math.floor(Math.random() * pokemons.length);
    indices.add(rand);
  }
  return Array.from(indices).map(i => ({ ...pokemons[i] }));
}

function criarBotoes(deckSeis) {
  deckContainer.innerHTML = "";

  deckSeis.forEach((pokemon, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-pokemon");
    btn.textContent = pokemon.nome;
    btn.dataset.index = index;

    btn.addEventListener("click", () => {
      if (btn.classList.contains("selecionado")) {
        btn.classList.remove("selecionado");
      } else {
        const selecionados = deckContainer.querySelectorAll(".selecionado");
        if (selecionados.length < 3) {
          btn.classList.add("selecionado");
        } else {
          alert("Você só pode selecionar 3 pokémons!");
        }
      }
    });

    deckContainer.appendChild(btn);
  });
}

function atualizarTitulo(texto) {
  document.querySelector(".titulo").textContent = texto;
}

function escrever(mensagem) {
  saida.textContent += mensagem + "\n";
}

function mostrarDeck(deck, jogador) {
  escrever(`\n🔹 Pokémons do Jogador ${jogador}:`);
  deck.forEach((p, i) => {
    const barra = "█".repeat(p.vida / 10) + "-".repeat(10 - p.vida / 10);
    escrever(`${i + 1}. ${p.nome} (Vida: ${p.vida} [${barra}], ATK: ${p.attack}, DEF: ${p.def})`);
  });
}

function escolherPokemon(deck, jogador) {
  const vivos = deck.filter(p => p.vida > 0);
  return vivos[0]; // automático: pega o primeiro vivo
}

function realizarAtaque(atacante, defensor, historico) {
  const dano = Math.max(atacante.attack - defensor.def, 0) + 10;
  defensor.vida = Math.max(defensor.vida - dano, 0);
  historico.push(`${atacante.nome} atacou ${defensor.nome} causando ${dano} de dano.`);
  escrever(`⚔️ ${atacante.nome} atacou ${defensor.nome} causando ${dano} de dano!`);
  if (defensor.vida === 0) {
    escrever(`💀 ${defensor.nome} desmaiou!`);
    historico.push(`${defensor.nome} desmaiou!`);
  }
}

function executarRodada(p1, p2, historico) {
  escrever(`\n🆚 ${p1.nome} (Jogador 1) vs ${p2.nome} (Jogador 2)`);
  if (Math.random() < 0.5) {
    escrever("🎲 Jogador 1 começa a rodada!");
    realizarAtaque(p1, p2, historico);
    if (p2.vida > 0) {
      realizarAtaque(p2, p1, historico);
    }
  } else {
    escrever("🎲 Jogador 2 começa a rodada!");
    realizarAtaque(p2, p1, historico);
    if (p1.vida > 0) {
      realizarAtaque(p1, p2, historico);
    }
  }
}

function exibirResultado(deck1, deck2, historico) {
  escrever("\n🏁 Fim da batalha!\n");
  historico.forEach(evento => escrever(evento));
  const vivos1 = deck1.filter(p => p.vida > 0).length;
  const vivos2 = deck2.filter(p => p.vida > 0).length;
  if (vivos1 > vivos2) {
    escrever("🏆 Jogador 1 venceu!");
  } else if (vivos2 > vivos1) {
    escrever("🏆 Jogador 2 venceu!");
  } else {
    escrever("🤝 Empate!");
  }
}

function batalhar(deck1, deck2) {
  escrever("\n⚔️ Iniciando a batalha!");
  const historico = [];

  // Clona decks para não alterar original
  deck1 = deck1.map(p => ({ ...p }));
  deck2 = deck2.map(p => ({ ...p }));

  mostrarDeck(deck1, 1);
  mostrarDeck(deck2, 2);

  while (deck1.some(p => p.vida > 0) && deck2.some(p => p.vida > 0)) {
    escrever("\n========== NOVA RODADA ==========");
    const p1 = escolherPokemon(deck1, 1);
    const p2 = escolherPokemon(deck2, 2);
    executarRodada(p1, p2, historico);
  }

  exibirResultado(deck1, deck2, historico);
}

confirmarBtn.addEventListener("click", () => {
  const selecionados = deckContainer.querySelectorAll(".btn-pokemon.selecionado");

  if (selecionados.length !== 3) {
    alert("Você precisa escolher exatamente 3 pokémons!");
    return;
  }

  const indicesSelecionados = [...selecionados].map(btn => parseInt(btn.dataset.index));
  const deckFinal = indicesSelecionados.map(i => ({ ...deckAtual6[i] }));

  decks.push(deckFinal);

  if (jogadorAtual === 1) {
    alert("Jogador 1 selecionou seus pokémons. Agora é a vez do Jogador 2!");
    jogadorAtual = 2;
    deckAtual6 = sortearSeisPokemons();
    criarBotoes(deckAtual6);
    atualizarTitulo("Jogador 2: Escolha seus 3 Pokémons");
  } else {
    alert("Jogador 2 selecionou seus pokémons. Preparando para batalha!");
    confirmarBtn.disabled = true;
    atualizarTitulo("Batalha iniciada! Veja o resultado abaixo.");
    batalhar(decks[0], decks[1]);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  deckAtual6 = sortearSeisPokemons();
  criarBotoes(deckAtual6);
});
