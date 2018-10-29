package web

import (
	"WarWithJosh/src/api/models"
	"WarWithJosh/src/api/services"
	"encoding/json"
	"io"
	"net/http"
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
	}

	response := new(NewSessionResponse)
	response.SessionID = session.ID
	JSON(response, &w)
}

// SessionAddMoveHandler ...
func SessionAddMoveHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	body, err := r.GetBody()
	if err != nil {
		ServerError(err, &w)
	}

	request := new(AddMoveRequest)
	err = json.NewDecoder(io.LimitReader(body, 5000)).Decode(request)
	if err != nil {
		BadRequest(&w)
	}

	err = engine.AddSessionMove(&request.SessionID, &request.Move)
	if err != nil {
		ServerError(err, &w)
	}

	OK(&w)
}

// SessionEndHandler ...
func SessionEndHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	body, err := r.GetBody()
	if err != nil {
		ServerError(err, &w)
	}

	request := new(EndSessionRequest)
	err = json.NewDecoder(io.LimitReader(body, 5000)).Decode(body)
	if err != nil {
		BadRequest(&w)
	}

	err = engine.EndSession(&request.SessionID)
	if err != nil {
		BadRequest(&w)
	}

	OK(&w)
}
