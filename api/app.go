package main

import (
	"WarWithJosh/api/events"
	"WarWithJosh/api/handlers"
	"WarWithJosh/api/services"
	"WarWithJosh/api/web"
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("./www"))

	dataRepository, err := services.RedisRepositoryFactory("localhost:6379")
	if err != nil {
		panic(err)
	}

	globalBus := events.Busfactory()
	_, err = handlers.GlobalHandlersFactory(globalBus, dataRepository)
	if err != nil {
		panic(err)
	}

	gameEngine := services.GameEngineFactory(dataRepository)

	http.Handle("/", fs)
	web.Routes(gameEngine)

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}
