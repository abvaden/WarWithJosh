package interfaces

// IEvent .. Event is a statement of record about something that happened
type IEvent struct {
	Name    string
	version [2]byte
}
