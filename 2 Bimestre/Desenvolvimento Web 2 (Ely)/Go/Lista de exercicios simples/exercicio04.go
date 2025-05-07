package main

import "fmt"

func main() {
	//declaração de variável com o número 8
	numero := 7

	fmt.Printf("Tabuada do %d:\n", numero)

	//loop para calcular a tabuada de 1 a 10
	for i :=1; i<=10; i++ {
		resultado := numero * i
		fmt.Println(numero, " x ", i, " = ", resultado)

	}
}
