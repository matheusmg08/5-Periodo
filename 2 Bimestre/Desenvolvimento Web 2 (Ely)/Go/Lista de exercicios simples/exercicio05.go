package main

import "fmt"

func main() {
	var numero int = 5

	//variável que armazena o fatorial
	fatorial := 1

	//loop para calcular o fatorial
	for i := numero; i > 1; i-- {
		fatorial *= i
	}

	fmt.Printf("O fatorial de %d é: %d\n", numero, fatorial)
	fmt.Println("Obrigado por usar o programa!")
}
