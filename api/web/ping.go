package web

import (
	"net/http"

	"github.com/abvaden/WarWithJosh/api/services"
)

// PingHandler ...
func PingHandler(w http.ResponseWriter, r *http.Request, engine *services.GameEngine) {
	OK(&w)
}
