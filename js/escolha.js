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

let jogadorAtual = 1;
const decks = [];
let deckAtual6 = []; // os 6 pokémons sorteados do jogador atual

// Sorteia 6 pokémons únicos aleatórios
function sortearSeisPokemons() {
  const indices = new Set();
  while(indices.size < 6) {
    const rand = Math.floor(Math.random() * pokemons.length);
    indices.add(rand);
  }
  return Array.from(indices).map(i => ({ ...pokemons[i] }));
}

// Cria botões para os 6 pokémons sorteados
function criarBotoes(deckSeis) {
  deckContainer.innerHTML = ""; // limpa área dos botões

  deckSeis.forEach((pokemon, index) => {
    const btn = document.createElement("button");
    btn.classList.add("btn-pokemon"); // CORRIGIDO aqui (antes 'bnt-pokemon')
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

    deckContainer.appendChild(btn); // adicionar o botão no container
  });
}

function resetarSelecao() {
  const botoes = deckContainer.querySelectorAll("btn-pokemon");
  botoes.forEach(btn => btn.classList.remove("selecionado"));
}

function atualizarTitulo(texto) {
  document.querySelector(".titulo").textContent = texto;
}

function Batalha(deck1, deck2) {
  console.log("Deck Jogador 1:", deck1);
  console.log("Deck Jogador 2:", deck2);
  alert("Batalha iniciada! Veja o console para detalhes.");
  // Aqui você pode implementar a lógica da batalha ou mostrar os decks na tela
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
    resetarSelecao();
    criarBotoes(deckAtual6);
    atualizarTitulo("Jogador 2: Escolha seus 3 Pokémons");
  } else {
    alert("Jogador 2 selecionou seus pokémons. Preparando para batalha!");
    confirmarBtn.disabled = true;
    atualizarTitulo("Batalha iniciada! Veja os decks no console.");
    Batalha(decks[0], decks[1]);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  deckAtual6 = sortearSeisPokemons();
  criarBotoes(deckAtual6);
});

