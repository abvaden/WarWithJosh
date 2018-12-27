package main

import (
	"log"
	"net/http"

	"github.com/abvaden/WarWithJosh/api/handlers"
	"github.com/abvaden/WarWithJosh/api/services"
	"github.com/abvaden/WarWithJosh/api/web"

	"github.com/abvaden/WarWithJosh/api/events"
)

func main() {
	fs := http.FileServer(http.Dir("./www"))

	//dataRepository, err := services.RedisRepositoryFactory("localhost:6379")
	dataRepository, err := services.InMemoryRepositoryFactory()
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
