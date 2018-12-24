package web

import (
	"WarWithJosh/api/services"
	"net/http"
)

// PingHandler ...
func PingHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	OK(&w)
}
