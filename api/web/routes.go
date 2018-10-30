package web

import (
	"WarWithJosh/api/services"
	"net/http"
)

const baseRoute = "/api/v1/"
const sessionBaseRoute = "session/"

// Routes ..
func Routes(engine *services.GameEngine) {
	newSessionRoute := baseRoute + sessionBaseRoute + "new"
	http.Handle(newSessionRoute, createHandleFunc(newSessionRoute, NewSessionHandler, engine))
	addMoveRoute := baseRoute + sessionBaseRoute + "add-move"
	http.Handle(addMoveRoute, createHandleFunc(addMoveRoute, SessionAddMoveHandler, engine))
	endSessionRoute := baseRoute + sessionBaseRoute + "end"
	http.Handle(endSessionRoute, createHandleFunc(endSessionRoute, SessionEndHandler, engine))
}

type gameRouteHandler func(w http.ResponseWriter, r *http.Request, engine *services.GameEngine)

func createHandleFunc(route string, handleFunc gameRouteHandler, engine *services.GameEngine) http.Handler {
	finalHandler := makeHttpHandler(handleFunc, engine)
	loggingMiddleWare := MakeLoggingMiddleware(route, finalHandler)
	corsMiddleWare := AddCORSMiddleWare(loggingMiddleWare)
	return corsMiddleWare
}

type internalHandler struct {
	engine     *services.GameEngine
	handleFunc gameRouteHandler
}

func (handler internalHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	handler.handleFunc(w, r, handler.engine)
}

func makeHttpHandler(routeHandler gameRouteHandler, gameEngine *services.GameEngine) http.Handler {
	engine := gameEngine

	handler := internalHandler{engine, routeHandler}

	return handler
}
