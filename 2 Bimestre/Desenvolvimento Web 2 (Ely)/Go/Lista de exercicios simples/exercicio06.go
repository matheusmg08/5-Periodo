package main

import "fmt"

func main() {
	const termos int = 20

	var a,b int = 0,1

	//imprimindo a mensagem inicial
	fmt.Println("Sequência de Fibonacci até o 20º termo: ")

	//loop
	for i := 1; i <= termos; i++ {
		fmt.Printf("%d ", a)

		//calculando o próximo termo
		proximo := a + b
		//atualizando os valores de a e b
		a = b
		b = proximo
	}

	//quebrando a linha
	fmt.Println()
}

