package web

import (
	"WarWithJosh/api/models"
	"WarWithJosh/api/services"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{} // use default options

// NewSessionHandler ...
func NewSessionHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		ServerError(err, &w)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = c.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

// SessionAddMoveHandler ...
func SessionAddMoveHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	body := r.Body

	request := new(AddMoveRequest)
	err := json.NewDecoder(io.LimitReader(body, 5000)).Decode(request)
	if err != nil {
		BadRequest(&w)
		return
	}

	move := new(models.Move)
	move.AiBid = request.Move.AiBid
	move.AiScore = request.Move.AiScore
	move.HandValue = request.Move.HandValue
	move.MoveTime = time.Now().UTC().Unix()
	move.PlayerBid = request.Move.PlayerBid
	move.PlayerScore = request.Move.PlayerScore

	// err = engine.AddSessionMove(&request.SessionID, move)
	// if err != nil {
	// 	ServerError(err, &w)
	// 	return
	// }

	OK(&w)
}

// SessionEndHandler ...
func SessionEndHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	body := r.Body

	request := new(EndSessionRequest)
	err := json.NewDecoder(io.LimitReader(body, 5000)).Decode(body)
	if err != nil {
		BadRequest(&w)
		return
	}

	err = engine.EndSession(&request.SessionID)
	if err != nil {
		BadRequest(&w)
		return
	}

	OK(&w)
}
