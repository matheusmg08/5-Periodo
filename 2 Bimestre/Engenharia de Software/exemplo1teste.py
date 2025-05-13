
def test_soma():
    from exemplo1 import soma
    assert soma(1,1) == 2
    assert soma(-2,2) == 0
    assert soma(1, "a") == "Erro: Operação inválida"
    assert soma(0,0) == 0   

def test_subtrair():
    from exemplo1 import subtrair
    assert subtrair(2,1) == 1
    assert subtrair(2,-) == 0
    assert subtrair(1, "a") == "Erro: Operação inválida"
    assert subtrair(0,0) == 0

def test_multiplicar():
    from exemplo1 import multiplicar
    assert multiplicar(2,3) == 6
    assert multiplicar(-2,2) == -4
    assert multiplicar(1, "a") == "Erro: Operação inválida"
    assert multiplicar(0,0) == 0

def test_dividir():
    from exemplo1 import dividir
    assert dividir(6,3) == 2
    assert dividir(2,-2) == -1
    assert dividir(1, "a") == "Erro: Operação inválida"
    assert dividir(2,0) == "Erro: Divisão por zero"