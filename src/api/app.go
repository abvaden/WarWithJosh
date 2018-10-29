package main

import (
	"WarWithJosh/src/api/services"
	"WarWithJosh/src/api/web"
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("www"))

	dataRepository, err := services.RedisRepositoryFactory("localhost:6379")
	if err != nil {
		panic(err)
	}
	gameEngine := services.GameEngineFactory(dataRepository)

	http.Handle("/", fs)
	web.Routes(gameEngine)

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
