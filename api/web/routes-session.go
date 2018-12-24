package web

import (
	"WarWithJosh/api/services"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

// NewSessionHandler ...
func NewSessionHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		ServerError(err, &w)
		return
	}

	send := func(message *Wrapper) {
		var data []byte
		writer, err := ws.NextWriter(2)
		if err != nil {
			log.Println("Error while getting next writer")
			return
		}
		writtenBytes, err := writer.Write(data)
		if err != nil || writtenBytes != len(data) {
			log.Println("Failed to fully write message")
			return
		}

		writer.Close()
	}
	newMessageChan := make(chan Wrapper)
	closeChan := make(chan bool)

	sessionService, err := SessionServiceFactory(engine, send, newMessageChan, closeChan)

	defer sessionService.Close()
	defer ws.Close()

	for {
		messageType, data, err := ws.ReadMessage()
		if err != nil {
			return
		}

		if messageType == 2 {
			wrapper := new(Wrapper)
			err = wrapper.XXX_Unmarshal(data)
			newMessageChan <- *wrapper
		} else if messageType == 1 {
			log.Println(data)
		} else {
			log.Println(messageType)
		}
	}
}
