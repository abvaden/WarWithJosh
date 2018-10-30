package web

import (
	"WarWithJosh/src/api/models"
	"WarWithJosh/src/api/services"
	"encoding/json"
	"io"
	"net/http"
	"time"
)

// NewSessionHandler ...
func NewSessionHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	player := new(models.Player)

	playerIP := r.RemoteAddr
	playerUserAgent := r.Header.Get("User-Agent")

	player.PlayerIP = playerIP
	player.PlayerUserAgent = playerUserAgent

	session, err := engine.StartNewSession(player)
	if err != nil {
		ServerError(err, &w)
		return
	}

	response := new(NewSessionResponse)
	response.SessionID = session.ID
	JSON(response, &w)
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

	err = engine.AddSessionMove(&request.SessionID, move)
	if err != nil {
		ServerError(err, &w)
		return
	}

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
