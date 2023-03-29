import random
import os

palavras_embaralhadas = []


def baguncar_palavra(palavra):
    # ignora os espaços brancos
    palavra = palavra.strip()
    if len(palavra) <= 4:
        return palavra
    else:
        meio = palavra[1:-1]
        meio = ''.join(random.sample(meio, len(meio)))
        return palavra[0] + meio + palavra[-1]


def salvar_palavra(original, embaralhada):
    palavras_embaralhadas.append({
        'original': original,
        'embaralhada': embaralhada
    })


class Palavra:
    def __init__(self):
        self.original = ''
        self.embaralhada = ''

    def embaralhar(self):
        self.embaralhada = baguncar_palavra(self.original)
        salvar_palavra(self.original, self.embaralhada)
        salvar_o_array_palavras_embaralhadas_em_um_arquivo_txt()
        return self.embaralhada

    def desembaralhar(self, palavra_embaralhada=None):
        if palavra_embaralhada:
            self.embaralhada = palavra_embaralhada
        for palavra in palavras_embaralhadas:
            if palavra['embaralhada'] == self.embaralhada:
                return palavra['original']
        return 'Palavra não encontrada!'


def salvar_o_array_palavras_embaralhadas_em_um_arquivo_txt():
    with open('palavras_embaralhadas.txt', 'w') as arquivo:
        for palavra in palavras_embaralhadas:
            arquivo.write(f"\n --- Palavra --- \noriginal: {palavra['original']} \nEncriptada: {palavra['embaralhada']}")
            arquivo.write('\n')

def main():
    os.system('cls' if os.name == 'nt' else 'clear')
    palavra = Palavra()

    print('Bem vindo ao jogo da palavra embaralhada!')
    print('\nDigite:\n\n1 - Embaralhar palavra\n2 - Desembaralhar palavra\n0 - Sair do jogo')
    while True:

        escolha = input('\n\nDigite sua escolha: \n| ')

        def embaralhar():
            palavra.original = input('\nDigite uma palavra para embaralhar: ')
            print('| Palavra embaralhada: \n', palavra.embaralhar())

        def desembaralhar():
            palavra_para_desembaralhar = input(
                '\nDigite uma palavra para desembaralhar: ')
            print('| Palavra desembaralhada: \n',
                  palavra.desembaralhar(palavra_para_desembaralhar))

        if escolha == '1':
            embaralhar()
        elif escolha == '2':
            desembaralhar()
        elif escolha == '0':
            print('Obrigado por jogar!')
            break
        else:
            print('Opção inválida!')


main()