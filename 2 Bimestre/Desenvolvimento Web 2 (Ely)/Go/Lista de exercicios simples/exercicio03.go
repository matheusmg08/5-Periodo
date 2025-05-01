package main

import "fmt"

func main() {
	//Distância que vai viajar
	var distancia float64 = 200

	//Preço do litro do álcool
	var precoAlcool float64 = 4.50

	//Preço do litro da gasolina
	var precoGasolina float64 = 5.50

	//consumo do carro no álcool
	consumoAlcool := 10.0 // km/litro

	//consumo do carro na gasolina
	consumoGasolina := 12.0 // km/litro

	//calculando quantos litros de álcool serão necessários
	litrosAlcool := distancia / consumoAlcool
	//calculando quantos litros de gasolina serão necessários	
	litrosGasolina := distancia / consumoGasolina
	//calculando o custo da viagem com álcool
	custoAlcool := litrosAlcool * precoAlcool	
	//calculando o custo da viagem com gasolina
	custoGasolina := litrosGasolina * precoGasolina		

	//imprimindo o resultado
	fmt.Printf("Custo da viagem com álcool: R$ %.2f\n", custoAlcool)
	fmt.Printf("Custo da viagem com gasolina: R$ %.2f\n", custoGasolina)

	//verificando qual é o melhor custo
	if custoAlcool < custoGasolina {
		fmt.Println("O melhor custo é com álcool.")
	} else{
		fmt.Println("O melhor custo é com gasolina.")
	}	
}



