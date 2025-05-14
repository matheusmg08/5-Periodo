package models

import "database/sql"

type Usuario struct {
	Idusuario int `json:"idusuario"`
	Nome sql.NullString `json:"nome"`
	Email sql.NullString `json:"email"`
	Senha sql.NullString `json:"senha"`
	Telefone sql.NullString `json:"telefone"`
}