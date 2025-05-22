from pokemon import Pokemon, pokemons
from time import sleep
import random
import os
import platform

# Função para limpar a tela dependendo do sistema operacional
def limpar_tela():
    if platform.system() == "Windows":
        os.system("cls")
    else:
        os.system("clear")

class Selecao:
    def mostrar_todos(self):
        print("\n📜 Lista de todos os Pokémons disponíveis:\n")
        for i, p in enumerate(pokemons):
            print(f"{i+1}. {p.nome}")
            print(p.ascii_art)
            sleep(1)

    def selecionarpokemons(self):
        # Sorteia 6 pokémons aleatórios
        deck_completo = random.sample(pokemons, 6)
        print("\n🧩 Seus 6 Pokémons sorteados:")
        for i, p in enumerate(deck_completo):
            print(f"{i+1}. {p.nome}")
            print(p.ascii_art)
            sleep(1)

        # Jogador escolhe 3 pokémons para o deck final
        print("\n🎯 Escolha 3 Pokémons (pelo número) para batalhar:")
        escolha = []
        while len(escolha) < 3:
            try:
                num = int(input(f"Escolha {len(escolha)+1}: "))
                if 1 <= num <= 6 and num-1 not in escolha:
                    escolha.append(num-1)
                else:
                    print("❌ Escolha inválida ou repetida.")
            except ValueError:
                print("❌ Digite um número válido.")
        deck_escolhido = [deck_completo[i] for i in escolha]
        print("\n✅ Seu deck final:")
        for p in deck_escolhido:
            print(f"- {p.nome}")
            print(p.ascii_art)
        return deck_escolhido

class PvP:
    def __init__(self, deck1, deck2):
        self.deck1 = deck1
        self.deck2 = deck2
        self.historico = []

    def mostrar_deck(self, deck, jogador):
        print(f"\n🔹 Pokémons do Jogador {jogador}:")
        for i, p in enumerate(deck):
            barra = "█" * (p.vida // 10) + "-" * (10 - p.vida // 10)
            print(f"{i+1}. {p.nome} (Vida: {p.vida} [{barra}], ATK: {p.attack}, DEF: {p.def_})")

    def escolher_pokemon(self, deck, jogador):
        vivos = [p for p in deck if p.vida > 0]
        tentativas = 3
        while tentativas > 0:
            self.mostrar_deck(vivos, jogador)
            try:
                escolha = int(input(f"🎯 Jogador {jogador}, escolha um Pokémon: ")) - 1
                if 0 <= escolha < len(vivos):
                    return vivos[escolha]
                else:
                    print("❌ Escolha inválida.")
            except ValueError:
                print("❌ Digite um número.")
            tentativas -= 1
        print("⚠️ Escolha automática feita.")
        return vivos[0]

    def realizar_ataque(self, atacante, defensor):
        dano = max(atacante.attack - defensor.def_, 0) + 10
        defensor.vida = max(defensor.vida - dano, 0)
        self.historico.append(f"{atacante.nome} atacou {defensor.nome} causando {dano} de dano.")
        print(f"⚔️ {atacante.nome} atacou {defensor.nome} causando {dano} de dano!")
        if defensor.vida == 0:
            print(f"💀 {defensor.nome} desmaiou!")
            self.historico.append(f"{defensor.nome} desmaiou!")

    def executar_rodada(self, p1, p2):
        print(f"\n🆚 {p1.nome} (Jogador 1) vs {p2.nome} (Jogador 2)")
        self.realizar_ataque(p1, p2)
        if p2.vida > 0:
            self.realizar_ataque(p2, p1)

    def exibir_resultado(self):
        print("\n🏁 Fim da batalha!\n")
        for evento in self.historico:
            print(evento)
        vivos1 = sum(1 for p in self.deck1 if p.vida > 0)
        vivos2 = sum(1 for p in self.deck2 if p.vida > 0)
        if vivos1 > vivos2:
            print("🏆 Jogador 1 venceu!")
        elif vivos2 > vivos1:
            print("🏆 Jogador 2 venceu!")
        else:
            print("🤝 Empate!")

    def batalhar(self):
        print("\n⚔️ Iniciando a batalha!")
        while any(p.vida > 0 for p in self.deck1) and any(p.vida > 0 for p in self.deck2):
            print("\n========== NOVA RODADA ==========")
            p1 = self.escolher_pokemon(self.deck1, 1)
            p2 = self.escolher_pokemon(self.deck2, 2)
            self.executar_rodada(p1, p2)
        self.exibir_resultado()

# Executando o jogo
if __name__ == "__main__":
    selecao = Selecao()
    while True:
        print("\n=== MENU PRINCIPAL ===")
        print("1. Mostrar todos os Pokémons")
        print("2. Iniciar Batalha")
        print("3. Sair")
        opcao = input("Escolha: ")

        if opcao == "1":
            selecao.mostrar_todos()
        elif opcao == "2":
            print("\n🎮 Jogador 1, sua vez:")
            deck1 = selecao.selecionarpokemons()
            input("\n🔁 Passe para o Jogador 2 e pressione Enter para limpar a tela...")
            limpar_tela()  # Limpa a tela após a escolha do Jogador 1
            print("\n🎮 Jogador 2, sua vez:")
            deck2 = selecao.selecionarpokemons()
            input("\n🔁 Passe para o Jogador 1 e pressione Enter para limpar a tela...")
            limpar_tela()  # Limpa a tela após a escolha do Jogador 2
            iniciar = input("\n🚀 Iniciar batalha agora? (s/n): ").lower()
            if iniciar == "s":
                PvP(deck1, deck2).batalhar()
            else:
                print("🔙 Voltando ao menu.")
        elif opcao == "3":
            print("👋 Até a próxima!")
            break
        else:
            print("❌ Opção inválida.")
