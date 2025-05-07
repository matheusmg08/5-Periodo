package main

import "fmt"

func main() {
	numero := 50.0

	//loop para calcular o fatorial
	for i := numero-1; i >= 1; i-- {
		numero = numero * i
	}

	fmt.Println(numero)
}
