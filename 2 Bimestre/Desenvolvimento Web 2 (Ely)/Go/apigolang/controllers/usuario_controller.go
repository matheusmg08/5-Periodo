package controllers

import (
	//"database/sql"
	"encoding/json"
	"apigolang/config"
	"apigolang/models"
	"net/http"
	//"strconv"
	//"github.com/gorilla/mux"
)

func GetUsuarios(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close() //executa no fim do método

	row, erro := db.Query("SELECT idusuario, nome, email, senha, telefone FROM usuario")
	if (erro != nil) {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
		return
	}
	defer row.Close()

	var usuarios []models.Usuario
	for row.Next() {
		var usuario models.Usuario
		erro := row.Scan(&usuario.Idusuario, &usuario.Nome, &usuario.Email, &usuario.Senha, &usuario.Telefone)
		if erro!=nil {
			http.Error(w, erro.Error(), http.StatusInternalServerError)
			return
		}
		usuarios = append(usuarios, usuario)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usuarios)

}

func CreateUsuario(w http.ResponseWriter, r *http.Request) {
	db, erro := config.Connect()
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}
	defer db.Close() //executa no fim do método

	var usuario models.Usuario
	erro = json.NewDecoder(r.Body).Decode(&usuario)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}

	query := "INSERT INTO usuario (nome, email, senha, telefone) VALUES (?, ?, ?, ?)"

	_, erro = db.Exec(query, usuario.Nome, usuario.Email, usuario.Senha, usuario.Telefone)
	if erro != nil {
		http.Error(w, erro.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(
	map[string]string{"message": "Sucesso"})

}