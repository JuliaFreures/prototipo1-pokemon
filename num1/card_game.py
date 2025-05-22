from pokemon import Pokemon, pokemons


class Selecao:

    def __init__(self):
        self.pokemons = pokemons  # lista de pokemons do arquivo pokemon.py

    def mostrar_todos(self):
        print("🏁 Menu de todos os Pokémons disponíves:\n")
        for pokemon in self.pokemons:
            pokemon.exibir()
            print("-" * 40)

    def selecionarpokemons(self):
        self.mostrar_todos()
        selecionados = []

        while len(selecionados) < 3:
            try:
                escolha = int(
                    input("Escolha 3 Pokémons, numerando-os de 1 a 6:"))
                if escolha < 1 or escolha > len(self.pokemons):
                    print("Escolha inválida, tente novamente.")
                elif escolha not in selecionados:
                    selecionados.append(escolha)
                    print(
                        f"Pokémon {self.pokemons[escolha-1].nome} selecionado!"
                    )
                else:
                    print(
                        "Esse Pokémon ja foi escolhido. Por favor, selecione outro."
                    )
            except ValueError:
                print("Por favor, insira um número válido")

        print("\nPokémons selecionados para batalha:")
        for i in selecionados:
            self.pokemons[i - 1].exibir()
        return [self.pokemons[i - 1] for i in selecionados]
