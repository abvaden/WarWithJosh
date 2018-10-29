package events

import (
	"WarWithJosh/src/api/models"
)

// SessionStartedEventName ..
const SessionStartedEventName = "SessionStarted"

// SessionStartedEventVersion ..
var SessionStartedEventVersion = [2]byte{1, 0}

// SessionStartedEvent ..
type SessionStartedEvent struct {
	Name    string
	Version [2]byte
	Session models.Session
}

// SessionStartedEventFactory .. Create a new SessionStartedEvent from an input event
func SessionStartedEventFactory(session models.Session) *SessionStartedEvent {
	event := new(SessionStartedEvent)
	event.Name = SessionStartedEventName
	event.Version = SessionStartedEventVersion
	event.Session = session

	return event
}
