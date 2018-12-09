package models

// Session ... The base unit of of interaction with the game
type Session struct {
	ID         string
	StartTime  int64
	Endtime    int64
	Player     Player
	Moves      []Move
	IsComplete bool
	AI         AI
}

// Player ... Details about the player who initiated the session
type Player struct {
	PlayerIP        string
	PlayerUserAgent string
	AvailableCards  []int
}

// AI ... Details about the AI used in the session
type AI struct {
	AiID           string
	AvailableCards []int
}

// Move ... A record of one hand
type Move struct {
	AiScore     float32
	AiBid       uint8
	PlayerScore float32
	PlayerBid   uint8
	HandValue   uint8
	MoveTime    int64
}
