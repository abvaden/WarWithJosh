package events

import (
	"WarWithJosh/src/api/models"
)

// SessionEndedEventName ..
const SessionEndedEventName = "SessionEnded"

// SessionEndedEventVersion ..
var SessionEndedEventVersion = [2]byte{1, 0}

// SessionEndedEvent ..
type SessionEndedEvent struct {
	Name    string
	Version [2]byte
	Session models.Session
}

// SessionEndedEventFactory .. Create a new SessionEndedEvent from an input event
func SessionEndedEventFactory(session models.Session) *SessionEndedEvent {
	event := new(SessionEndedEvent)
	event.Name = SessionEndedEventName
	event.Version = SessionEndedEventVersion
	event.Session = session

	return event
}
