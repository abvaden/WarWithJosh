package handlers

import (
	"WarWithJosh/api/events"
	"WarWithJosh/api/interfaces"
)

// GlobalHandlersFactory ... Create a new set of GlobalHandlers
func GlobalHandlersFactory(eventBus *events.EventBus, dataRepository interfaces.IDataRepository) ([]interface{}, error) {
	activeSessionsHandler := ActiveSessionsHandlerFactory(eventBus)

	handlers := []interface{}{activeSessionsHandler}
	return handlers, nil
}
