package web

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/golang/protobuf/proto"

	"github.com/abvaden/WarWithJosh/api/services"

	ptypes "github.com/golang/protobuf/ptypes"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

const (
	readDeadline = time.Duration(15) * time.Second
	// Time allowed to read the next pong message from the peer.
	pongWait = time.Duration(5) * time.Second
	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = time.Duration(10) * time.Second
	// Time allowed to write a message to the peer.
	writeWait = time.Duration(3) * time.Second
	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

// NewSessionHandler ...
func NewSessionHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		ServerError(err, &w)
		return
	}

	recChan := make(chan *Wrapper)
	sendChan := make(chan *Wrapper)
	closeChan := make(chan bool)

	sessionService, err := SessionServiceFactory(engine, sendChan, recChan, closeChan)
	go writePump(sessionService, ws, sendChan, closeChan)
	go readPump(sessionService, ws, recChan, sendChan)
}

func readPump(sessionService *SessionService, ws *websocket.Conn, recChan chan *Wrapper, sendChan chan *Wrapper) {
	ws.SetReadLimit(512)
	ws.SetPongHandler(func(string) error {
		ws.SetReadDeadline(time.Now().Add(readDeadline))
		return nil
	})

	for {
		ws.SetReadDeadline(time.Now().Add(readDeadline))
		messageType, data, err := ws.ReadMessage()

		if err != nil {
			// If we have an error here it must mean that the read deadline passed
			// we must assume the session is dead and close the session
			sessionService.Close()
			break
		}

		if messageType == websocket.BinaryMessage {
			wrapper := new(Wrapper)
			err = proto.Unmarshal(data, wrapper)
			recChan <- wrapper
		} else if messageType == websocket.PongMessage {
			continue
		} else {
			// If we receieve a message fo an unknown type then reply with an errorMessage and close the connection
			errorMessage := new(ErrorMessage)
			errorMessage.Message = "Unknown message type, only binary messages are supported"
			wrapper := new(Wrapper)
			any, err := ptypes.MarshalAny(errorMessage)
			if err != nil {
				log.Printf("Error while marshaling errorMessage : %v, \n", err)
				continue
			}
			wrapper.Payload = any
			sendChan <- wrapper
			sessionService.Close()
		}
	}
}

func writePump(sessionService *SessionService, ws *websocket.Conn, sendMessageChan chan *Wrapper, closeChan chan bool) {
	ticker := time.NewTicker(pingPeriod)
	lock := new(sync.Mutex)
	defer func() {
		ticker.Stop()
		ws.Close()
		sessionService.Close()
	}()

	for {
		select {
		case message := <-sendMessageChan:
			{
				lock.Lock()
				data, err := proto.Marshal(message)
				if err != nil {
					sessionService.handleInternalError(err, "Internal server error")
					lock.Unlock()
					break
				}

				ws.SetWriteDeadline(time.Now().Add(writeWait))
				writer, err := ws.NextWriter(websocket.BinaryMessage)
				if err != nil {
					sessionService.Close()
					lock.Unlock()
					break
				}
				writtenBytes, err := writer.Write(data)
				if err != nil || writtenBytes != len(data) {
					log.Println("Failed to fully write message")
					sessionService.Close()
					lock.Unlock()
					break
				}

				writer.Close()
				lock.Unlock()
			}
		case <-ticker.C:
			lock.Lock()

			// If we are unable to write the message within the specified write window then we consider the connection
			// dead and close the session
			ws.SetWriteDeadline(time.Now().Add(writeWait))
			err := ws.WriteMessage(websocket.PingMessage, nil)
			if err != nil {
				sessionService.Close()
			}

			lock.Unlock()
		case <-closeChan:
			return
		}
	}
}
