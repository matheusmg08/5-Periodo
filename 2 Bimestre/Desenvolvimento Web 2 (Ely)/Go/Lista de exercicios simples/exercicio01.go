package main

import "fmt"

func main() {
	// Declarar as variáveis
	precoUnitario := 100.0
	quantidade := 6

	// Calculando o valor total sem desconto
	valorTotal := precoUnitario * float64(quantidade)

	// Verificando se o cliente tem direito a desconto
	if quantidade >= 5 {
		// Aplicando o desconto de 10%
		desconto := valorTotal * 0.10
		valorTotal = valorTotal - desconto
		// Usando fmt.Printf para formatar corretamente a saída
		fmt.Printf("Parabéns! Você ganhou 10%% de desconto (R$ %.2f)\n", desconto)
	}

	// Exibindo o valor total a ser pago
	fmt.Printf("O valor total a ser pago é: R$ %.2f\n", valorTotal)
	fmt.Println("Obrigado por comprar conosco!")
}
