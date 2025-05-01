package main

import "fmt"	

func main() {
	//saldo de Bill e Jeff em milhões
	bill := 1850.0
	jeff := 1650.0

	//crescimento anual de Bill e Jeff 
	crescimentoBill := 20.0
	crescimentoJeff := 28.0

	//contador de anos
	anos := 0

	//Enquanto o saldo de Jeff for menor que o de Bill, continuamos o loop
	for jeff < bill {
		bill += crescimentoBill
		jeff += crescimentoJeff
		anos++	//incrementa o número de anos
	}

	fmt.Printf("Jeff ficará mais rico que Bill em %d anos.\n", anos)
	fmt.Printf("Bill terá %.2f milhões e Jeff terá %.2f milhões.\n", bill, jeff)
}