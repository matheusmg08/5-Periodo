def soma(a,b):
    """
    Função que soma dois números.
    """
    try:
        return a + b
    except TypeError:
        return "Erro: Operação inválida"
    
def subtrair(a,b):
    """
    Função que subtrai dois números.
    """
    try:
        return a - b
    except TypeError:
        return "Erro: Operação inválida"
    
def multiplicar(a,b):
    """
    Função que multiplica dois números.
    """
    try:
        return a * b
    except TypeError:
        return "Erro: Operação inválida"

def dividir(a,b):
    """
    Função que divide dois números.
    """
    try:
        return a / b
    except TypeError:
        return "Erro: Operação inválida"
    except ZeroDivisionError:
        return "Erro: Divisão por zero"