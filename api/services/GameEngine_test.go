package services

import (
	"errors"
	"testing"

	"github.com/abvaden/WarWithJosh/api/models"
)

// GameEngineService_StartNewSession ...
func TestGameEngineService_StartNewSession(t *testing.T) {
	repository, _ := InMemoryRepositoryFactory()
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
	repository, _ := InMemoryRepositoryFactory()
	engine := GameEngineFactory(repository)

	session, err := engine.StartNewSession()
	if err != nil {
		t.Error("Should not error when starting a new game")
		return
	}

	aiType := "Random"
	err = engine.SetAi(session.ID, aiType)
	if err != nil {
		t.Error("Should not error")
		return
	}

	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error("Should not error")
		return
	}

	move, err := engine.DeterminePlayerMove(session.ID, 5)
	if move != nil {
		t.Error("Should not error")
		return
	}

	move, err = engine.DetermineAiNextMove(session.ID)
	if move == nil {
		t.Error("Move should not be nil")
	}
}

func TestGameEngineService_SampleGame(t *testing.T) {
	session, engine, err := startSessionAgainstRandom()
	if err != nil {
		t.Error(err)
		return
	}

	// Starts the initial hand of the game
	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error("Should not error")
		return
	}
	for i := uint8(13); i > 0; i-- {
		move, err := engine.DeterminePlayerMove(session.ID, i)
		if err != nil {
			t.Error("Should not error")
			return
		}
		move, err = engine.DetermineAiNextMove(session.ID)
		if err != nil {
			t.Error("Should not error")
			return
		}
		if move == nil {
			t.Error("A move should be returned")
			return
		}

		if move.PlayerBid != i {
			t.Error("Bid value should equal the value played")
			return
		}
	}
}

func TestGameEngineService_CanNotPlaySameCardTwice(t *testing.T) {
	session, engine, err := startSessionAgainstRandom()
	if err != nil {
		t.Error(err)
		return
	}

	// Starts the initial hand of the game
	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error("Should not error")
		return
	}
	for i := uint8(1); i <= 13; i++ {
		if i == 3 {
			_, err = engine.DeterminePlayerMove(session.ID, 2)
			if err == nil {
				t.Error("Player should not be able to play the same card twice")
			}

			// Test successful we can exit the test now
			return
		}

		move, err := engine.DeterminePlayerMove(session.ID, i)
		if err != nil {
			t.Error("Should not error")
			return
		}

		move, err = engine.DetermineAiNextMove(session.ID)
		if err != nil {
			t.Error("Should not error")
			return
		}
		if move == nil {
			t.Error("A move should be returned")
			return
		}

		if move.PlayerBid != i {
			t.Error("Bid value should equal the value played")
			return
		}
	}
}

func TestGameEngineService_OnceMoveDecidedCanNotBeChanged(t *testing.T) {
	session, engine, err := startSessionAgainstRandom()
	if err != nil {
		t.Error(err)
		return
	}

	// Starts the initial hand of the game
	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error("Should not error")
		return
	}
	for i := uint8(13); i > 0; i-- {
		move, err := engine.DeterminePlayerMove(session.ID, i)
		if err != nil {
			t.Error("Should not error")
			return
		}

		if i == 4 {
			_, err = engine.DeterminePlayerMove(session.ID, i+1)
			if err == nil {
				t.Error("Should not be able to change a card after one has been decided")
			}

			// Test successful we can exit the test now
			return
		}

		move, err = engine.DetermineAiNextMove(session.ID)
		if err != nil {
			t.Error("Should not error")
			return
		}
		if move == nil {
			t.Error("A move should be returned")
			return
		}

		if move.PlayerBid != i {
			t.Error("Bid value should equal the value played")
			return
		}
	}
}

func TestGameEngineService_MustPlayValidCard(t *testing.T) {
	session, engine, err := startSessionAgainstRandom()
	if err != nil {
		t.Error(err)
		return
	}

	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error(err)
		return
	}

	_, err = engine.DeterminePlayerMove(session.ID, 0)
	if err == nil {
		t.Error("Should error on values < 1")
		return
	}

	_, err = engine.DeterminePlayerMove(session.ID, 14)
	if err == nil {
		t.Error("Should error on values > 13")
		return
	}
}

func TestGameEngineService_HandsRemaining(t *testing.T) {
	session, engine, err := startSessionAgainstRandom()
	if err != nil {
		t.Error(err)
		return
	}

	handsRemaining, err := engine.HandsRemaining(session.ID)
	if err != nil {
		t.Error(err)
		return
	}
	if handsRemaining != 13 {
		t.Error("Hands remaining should be 13 when a game is first started")
		return
	}

	_, err = engine.StartNextHand(session.ID)
	if err != nil {
		t.Error(err)
		return
	}

	handsRemaining, err = engine.HandsRemaining(session.ID)
	if err != nil {
		t.Error(err)
		return
	}
	if handsRemaining != 12 {
		t.Error("Hands remaining should decriment as soon as the current trick is started")
		return
	}
}

func startSessionAgainstRandom() (*models.Session, *GameEngine, error) {
	repository, _ := InMemoryRepositoryFactory()
	engine := GameEngineFactory(repository)

	session, err := engine.StartNewSession()
	if err != nil {
		return nil, nil, errors.New("Should not error when starting a new game")
	}

	aiType := "Random"
	err = engine.SetAi(session.ID, aiType)
	if err != nil {
		return nil, nil, errors.New("Should not error when setting Ai to random")
	}

	return session, engine, nil
}
