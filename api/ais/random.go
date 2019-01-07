package ais

import (
	"math/rand"

	"github.com/abvaden/WarWithJosh/api/models"
)

// RandomPlayer ...
func RandomPlayer(session *models.Session) (uint8, error) {
	cards := session.Game.AICards
	idx := rand.Intn(len(cards))
	return cards[idx], nil
}
