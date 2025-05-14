package routers

import (
	"apigolang/controllers"
	//"net/http"
	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/usuarios", controllers.GetUsuarios).Methods("GET")
	return router
}