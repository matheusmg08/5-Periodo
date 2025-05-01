package main

import "fmt"

func main() {
	//declaração de altura em metros
	var altura float64 = 1.70
	//declaração de peso em quilos
	var peso float64 = 70

	//cálculo do IMC
	imc := peso / (altura * altura)

	//imprimir o valor calculado do IMC com dua casas decimais
	fmt.Printf("Seu IMC é: %.2f\n", imc)

	//verifica se o IMC é menor que 25
	if imc < 25 {
		fmt.Println("Você está dentro do peso ideal.")
	} else {
		fmt.Println("Você está acima do peso ideal.")
	}
}