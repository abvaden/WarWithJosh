package models

// Session ... The base unit of of interaction with the game
type Session struct {
	ID         string
	StartTime  int64
	Endtime    int64
	Player     Player
	Game       Game
	IsComplete bool
	AI         AI
}

// Player ... Details about the player who initiated the session
type Player struct {
	PlayerIP        string
	PlayerUserAgent string
}

// AI ... Details about the AI used in the session
type AI struct {
	AiID string
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

// Game ... State of the current game for a given session
type Game struct {
	PlayerCards       []uint8
	WellCards         []uint8
	AICards           []uint8
	PlayerPoints      float32
	AiPoints          float32
	CurrentHandPoints uint8
	PlayerValue       uint8
	AiValue           uint8
	CompletedHands    []Move
}
