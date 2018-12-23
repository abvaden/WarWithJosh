package web

import (
	"WarWithJosh/api/services"
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
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		ServerError(err, &w)
		return
	}

	defer c.Close()

	send := func(message Wrapper) {
		var data []byte
		c.WriteMessage(2, data)
	}
	newMessageChan := make(chan Wrapper)
	closeChan := make(chan bool)

	_, err = SessionServiceFactory(send, newMessageChan, closeChan)

	for {
		_, data, _ := c.ReadMessage()
		wrapper := new(Wrapper)
		err = wrapper.XXX_Unmarshal(data)

		newMessageChan <- *wrapper
	}
}
