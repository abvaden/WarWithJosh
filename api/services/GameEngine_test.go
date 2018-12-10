package services

import (
	"testing"
)

// GameEngineService_StartNewSession ...
func TestGameEngineService_StartNewSession(t *testing.T) {
	repository := InMemoryRepositoryFactory()
	engine := GameEngineFactory(repository)

	session, err := engine.StartNewSession()
	if err != nil {
		t.Error("Should not error when starting a new game")
		return
	}

	if session.Game.PlayerPoints != 0 {
		t.Error("Player should start off with 0 points")
		return
	}

	if session.Game.AiPoints != 0 {
		t.Error("Ai should start off with 0 points")
	}

	matchingAICardIndex := -1
	matchingPlayerCardIndex := -1
	matchingWellCardIndex := -1
	for i := uint8(1); i <= 13; i++ {
		for j, aiValue := range session.Game.AICards {
			if aiValue == i {
				matchingAICardIndex = j
				break
			}
		}
		for j, aiValue := range session.Game.PlayerCards {
			if aiValue == i {
				matchingPlayerCardIndex = j
				break
			}
		}
		for j, wellCardValue := range session.Game.WellCards {
			if wellCardValue == i {
				matchingWellCardIndex = j
				break
			}
		}

		if matchingAICardIndex == -1 {
			t.Error("Ai should have all cards available at the start of the game")
			return
		}
		if matchingPlayerCardIndex == -1 {
			t.Error("Player should have all cards available when the game begins")
			return
		}
		if matchingWellCardIndex == -1 {
			t.Error("Well should have all cards available when the game begins")
			return
		}
	}
}

func TestGameEngineService_SampleHand(t *testing.T) {
	repository := InMemoryRepositoryFactory()
	engine := GameEngineFactory(repository)

	session, err := engine.StartNewSession()
	if err != nil {
		t.Error("Should not error when starting a new game")
		return
	}

	aiType := "Random"
	sessionID := session.ID
	err = engine.SetAi(&sessionID, &aiType)
	if err != nil {
		t.Error("Should not error")
		return
	}

	_, err = engine.StartNextHand(&sessionID)
	if err != nil {
		t.Error("Should not error")
		return
	}

	move, err := engine.DeterminePlayerMove(&sessionID, 5)
	if move != nil {
		t.Error("Should not error")
		return
	}

	move, err = engine.DetermineAiNextMove(&sessionID)
	if move == nil {
		t.Error("Move should not be nil")
	}
}
