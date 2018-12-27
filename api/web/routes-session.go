package web

import (
	"log"
	"net/http"

	"github.com/golang/protobuf/proto"

	"github.com/abvaden/WarWithJosh/api/services"

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
		data, err := proto.Marshal(message)
		if err != nil {
			log.Panic("Error while marshaling message")
			return
		}

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
	go readPump(sessionService, ws, newMessageChan)
}

func readPump(sessionService *SessionService, ws *websocket.Conn, newMessageChan chan Wrapper) {
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
			log.Println("Received message type 1")
			log.Println(data)
		} else {
			log.Println("Received other message type")
			log.Println(messageType)
		}
	}
}
