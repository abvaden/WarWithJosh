package handlers

import (
	"WarWithJosh/api/events"
	"WarWithJosh/api/interfaces"
)

// ActiveSessions ...
type ActiveSessions struct {
	count int
}

// ActiveSessionsHandler ...
type ActiveSessionsHandler struct {
	repository interfaces.IDataRepository
}

// ActiveSessionsHandlerFactory ...
func ActiveSessionsHandlerFactory(bus *events.EventBus) *ActiveSessionsHandler {
	handler := ActiveSessionsHandler{}
	handleStartEvent := func(event interface{}) {
		startedEvent, ok := event.(events.SessionStartedEvent)
		if !ok {
			return
		}
		handler.handleSessionStarted(&startedEvent)
	}
	handleEndEvent := func(event interface{}) {
		endEvent, ok := event.(events.SessionEndedEvent)
		if !ok {
			return
		}
		handler.handleSessionEnd(&endEvent)
	}

	bus.Subscribe(events.SessionStartedEventName, &handleStartEvent)
	bus.Subscribe(events.SessionEndedEventName, &handleEndEvent)

	return &handler
}

func (handler *ActiveSessionsHandler) handleSessionStarted(sessionStartedEvent *events.SessionStartedEvent) {

}

func (handler *ActiveSessionsHandler) handleSessionEnd(sessionEndEvent *events.SessionEndedEvent) {

}
