package models

// GlobalResults ... Summary metrics of all games played
type GlobalResults struct {
	AIType              string
	NumberOfGamesPlayed uint32
	CurrentWinRatio     float32
	GamesLost           uint32
	GamesWon            uint32
}
