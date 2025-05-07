package main

import "fmt"

func main() {
	//Distância que vai viajar
	distancia := 100.0

	//Preço do litro do álcool
	precoAlcool := 3.99

	//Preço do litro da gasolina
	precoGasolina := 5.99

	//consumo do carro no álcool
	gastoAlcool := distancia / 9 * precoAlcool
	gastoGasolina := distancia / 11 * precoGasolina  // km/litro

	fmt.Println("Valor gasto com álcool: R$", gastoAlcool)
	fmt.Println("Valor gasto com gasolina: R$", gastoGasolina)
	
	if (gastoGasolina < gastoAlcool) {
		fmt.Println("O melhor custo é com álcool.")
	} else if (gastoAlcool < gastoGasolina) {
		fmt.Println("O melhor custo é com gasolina.")
	} else {	
		fmt.Println("Os custos são iguais.")
	}

}



