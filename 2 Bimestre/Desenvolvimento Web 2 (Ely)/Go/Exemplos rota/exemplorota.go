package main

import (
	"fmt"
	"net/http"
)
func index (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Olá Mundo!")
}
func segunda (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Segunda Rota!")
}
func main(){
	http.HandleFunc("/", index)
	http.HandleFunc("/segunda", segunda)
	fmt.Println("Servidor rodando na porta 8080")
	http.ListenAndServe(":8080", nil)
}