package ais

import (
	"WarWithJosh/api/models"
	"math/rand"
)

// RandomPlayer ...
func RandomPlayer(session *models.Session) (uint8, error) {
	cards := session.Game.AICards
	idx := rand.Intn(len(cards))
	return cards[idx], nil
}
