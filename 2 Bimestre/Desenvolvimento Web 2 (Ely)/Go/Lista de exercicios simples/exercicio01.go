package main

import "fmt"

func main() {
	//declarar as variáveis
	precoUnitario := 50.0
	quantidade := 6

	//calculando o valor total sem desconto
	valorTotal := precoUnitario * float64(quantidade)

	//verificando se o cliente tem direito a desconto
	if quantidade >= 5{
		//aplicando o desconto de 10%
		desconto := valorTotal * 0.10
		valorTotal = valorTotal - desconto
		fmt.Println("Parabéns! Você ganhou 10% de desconto (R$ %.2f)\n", desconto)
	}

	//Exibindo o valor total a ser pago
	fmt.Printf("O valor total a ser pago é: R$ %.2f\n", valorTotal)
	fmt.Println("Obrigado por comprar conosco!")
}