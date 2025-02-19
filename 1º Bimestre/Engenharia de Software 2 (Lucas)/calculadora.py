def menu():
    op = 7
    while op != 6:
        print ("Calculadora")
        print ("-" * 100)
        print ("Digite 1 para soma: ")
        print ("Digite 2 para subtração: ")
        print ("Digite 3 para multiplicação: ")
        print ("Digite 4 para divisão: ")
        print ("Digite 5 para exponenciação: ")
        print ("Digite 6 para sair: ")
        print ("-" * 100)

        op = int(input("Escolha a opção desejada: "))

        if op == 1:
            a = int(input("Escolha o primeiro valor: "))
            b = int(input("Escolha o segundo valor: "))
            resultado = soma(a, b)
            print (resultado)
            print ("-" * 100)
        
        elif op == 2:
            a = int(input("Escolha o primeiro valor: "))
            b = int(input("Escolha o segundo valor: "))
            resultado = subtracao(a, b)
            print (resultado)
            print ("-" * 100)
        
        elif op == 3:
            a = int(input("Escolha o primeiro valor: "))
            b = int(input("Escolha o segundo valor: "))
            resultado = multiplicacao(a, b)
            print (resultado)
            print ("-" * 100)

        elif op == 4:
            a = int(input("Escolha o primeiro valor: "))
            b = int(input("Escolha o segundo valor: "))
            resultado = divisao(a, b)
            print (resultado)
            print ("-" * 100)

        elif op == 5:
            a = int(input("Escolha o primeiro valor: "))
            b = int(input("Escolha o segundo valor: "))
            resultado = exponenciacao(a, b)
            print (resultado)
            print ("-" * 100)
        
        elif op == 6:
            print ("Finalizando o programa ...")
            break

        else:
            print ("Opção inválida, escolha uma opção válida")
            menu()

def soma(a, b):
    resultado = a + b
    return f"O resultado da soma entre {a} + {b} é: {resultado}"

def subtracao(a, b):
    resultado = a - b
    return f"O resultado da subtração entre {a} - {b} é: {resultado}"

def multiplicacao(a, b):
    resultado = a * b
    return f"O resultado da multiplicação entre {a} * {b} é: {resultado}"

def divisao(a , b):
    if b != 0:
        resultado = a/b
        return f"O resultado da divisão entre {a} / {b} é: {resultado}"
    
    else:
        return 'Não pode dividir um número por 0'
    
def exponenciacao(a, b):
    resultado = a ** b
    return f"O resultado da exponenciação de {a} elevado a {b} é: {resultado}"

menu()