package services

import (
	"WarWithJosh/api/ais"
	"WarWithJosh/api/interfaces"
	"WarWithJosh/api/models"
	"errors"
	"math/rand"
	"time"
)

// GameEngine .. Business engine for interacting with WarWithJosh entities
type GameEngine struct {
	repository *interfaces.IDataRepository
}

// GameEngineFactory .. Create a new game engine that functions on a  give data repository
func GameEngineFactory(dataRepository interfaces.IDataRepository) *GameEngine {
	engine := new(GameEngine)
	engine.repository = &dataRepository

	return engine
}

// StartNewSession ..
func (engine *GameEngine) StartNewSession() (*models.Session, error) {
	repository := *engine.repository
	session, err := repository.AddSession()
	if err != nil {
		return nil, err
	}

	session.StartTime = time.Now().Unix()

	session.Game.AICards = make([]uint8, 13)
	session.Game.PlayerCards = make([]uint8, 13)
	session.Game.PlayerPoints = 0
	session.Game.AiPoints = 0
	session.Game.WellCards = make([]uint8, 13)

	for i := range session.Game.AICards {
		session.Game.AICards[i] = uint8(i) + 1
		session.Game.PlayerCards[i] = uint8(i) + 1
		session.Game.WellCards[i] = uint8(i) + 1
	}
	rand.Shuffle(len(session.Game.WellCards), func(i, j int) {
		session.Game.WellCards[i], session.Game.WellCards[j] = session.Game.WellCards[j], session.Game.WellCards[i]
	})

	err = repository.UpdateSession(session)
	if err != nil {
		return session, err
	}
	return session, nil
}

// SetAi ... Sets the Ai that the session will be played against
func (engine *GameEngine) SetAi(sessionID, aiTypeID *string) error {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return err
	}

	session.AI.AiID = *aiTypeID
	err = repository.UpdateSession(session)
	if err != nil {
		return err
	}

	return nil
}

// SetPlayerDetails ...
func (engine *GameEngine) SetPlayerDetails(sessionID *string, player *models.Player) (*models.Session, error) {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return nil, err
	}

	clonedPlayer := *(&player)
	session.Player = *clonedPlayer
	err = repository.UpdateSession(session)
	if err != nil {
		return session, err
	}
	return session, nil
}

// DeterminePlayerMove ... Sets the players value for the current hand, and returns a move if the hand was completed by the player
// determining their hand
func (engine *GameEngine) DeterminePlayerMove(sessionID *string, value uint8) (*models.Move, error) {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return nil, err
	}

	completedMove, err := engine.cardDecided(session, value, false)
	if err != nil {
		return nil, err
	}
	err = repository.UpdateSession(session)
	if err != nil {
		return nil, err
	}

	if completedMove != nil {
		err = engine.addSessionMove(sessionID, completedMove)
	}

	return completedMove, err
}

// DetermineAiNextMove ... Determins the Ai's next move
func (engine *GameEngine) DetermineAiNextMove(sessionID *string) (*models.Move, error) {
	repository := *engine.repository

	session, err := repository.GetSession(sessionID)
	if err != nil {
		return nil, err
	}

	if session.AI.AiID == "" {
		return nil, errors.New("AI type not set")
	}

	var ai func(session *models.Session) (uint8, error)

	switch session.AI.AiID {
	case "Random":
		ai = ais.RandomPlayer
	default:
		return nil, errors.New("AI type not known")
	}

	aiValue, err := ai(session)
	if err != nil {
		return nil, err
	}

	move, err := engine.cardDecided(session, aiValue, true)
	if err != nil {
		return nil, err
	}
	err = repository.UpdateSession(session)
	if err != nil {
		return nil, err
	}

	if move != nil {
		engine.addSessionMove(sessionID, move)
	}

	return move, err
}

// StartNextHand ...
func (engine *GameEngine) StartNextHand(sessionID *string) (uint8, error) {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return 0, err
	}

	nextHandValue := session.Game.WellCards[0]
	session.Game.CurrentHandPoints = nextHandValue

	if len(session.Game.WellCards) > 1 {
		session.Game.WellCards = session.Game.WellCards[1:]
	} else {
		session.Game.WellCards = []uint8{}
	}

	err = repository.UpdateSession(session)
	return session.Game.CurrentHandPoints, err
}

// EndSession ..
func (engine *GameEngine) EndSession(sessionID *string) error {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return err
	}

	session.IsComplete = true
	session.Endtime = time.Now().UTC().Unix()

	err = repository.UpdateSession(session)
	if err != nil {
		return err
	}

	return nil
}

func (engine *GameEngine) addSessionMove(sessionID *string, move *models.Move) error {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return err
	}

	clonedMove := *(&move)
	newCompletedHands := append(session.Game.CompletedHands, *clonedMove)

	session.Game.CompletedHands = newCompletedHands
	err = repository.UpdateSession(session)
	if err != nil {
		return err
	}

	return nil
}

func (engine *GameEngine) cardDecided(session *models.Session, value uint8, ai bool) (*models.Move, error) {
	if value < 1 || value > 13 {
		return nil, errors.New("Not a valid value")
	}

	var availableCards []uint8
	if ai {
		if session.Game.AiValue != 0 {
			return nil, errors.New("Ai had already decided a value for the current hand")
		}

		availableCards = session.Game.AICards
	} else {
		if session.Game.PlayerValue != 0 {
			return nil, errors.New("Player has already decided a value for the current hand")
		}

		availableCards = session.Game.PlayerCards
	}

	doesContainCard := false
	for _, v := range availableCards {
		if v == value {
			doesContainCard = true
			break
		}
	}
	if !doesContainCard {
		return nil, errors.New("May not choose same card twice")
	}

	if ai {
		session.Game.AiValue = value
	} else {
		session.Game.PlayerValue = value
	}

	if session.Game.PlayerValue != 0 &&
		session.Game.AiValue != 0 &&
		session.Game.CurrentHandPoints != 0 {
		if session.Game.PlayerValue > session.Game.AiValue {
			session.Game.PlayerPoints += float32(session.Game.CurrentHandPoints)
		} else if session.Game.AiValue > session.Game.PlayerValue {
			session.Game.AiPoints += float32(session.Game.CurrentHandPoints)
		} else {
			session.Game.AiPoints += float32(session.Game.CurrentHandPoints) / 2
			session.Game.PlayerPoints += float32(session.Game.CurrentHandPoints) / 2
		}

		completedMove := models.Move{}
		completedMove.AiBid = session.Game.AiValue
		completedMove.PlayerBid = session.Game.PlayerValue
		completedMove.HandValue = session.Game.CurrentHandPoints
		completedMove.AiScore = session.Game.AiPoints
		completedMove.PlayerScore = session.Game.PlayerPoints

		session.Game.PlayerValue = 0
		session.Game.AiValue = 0

		var playerCardIndex, aiCardIndex = -1, -1
		for i := 0; i < len(session.Game.PlayerCards); i++ {
			if session.Game.PlayerCards[i] == completedMove.PlayerBid {
				playerCardIndex = i
			}
			if session.Game.AICards[i] == completedMove.AiBid {
				aiCardIndex = i
			}
			if aiCardIndex != -1 &&
				playerCardIndex != -1 {
				break
			}
		}

		if playerCardIndex == -1 || aiCardIndex == -1 {
			return nil, errors.New("Internal error")
		}

		session.Game.AICards[aiCardIndex] = session.Game.AICards[len(session.Game.AICards)-1]
		session.Game.PlayerCards[playerCardIndex] = session.Game.PlayerCards[len(session.Game.PlayerCards)-1]

		session.Game.AICards = session.Game.AICards[:len(session.Game.AICards)-1]
		session.Game.PlayerCards = session.Game.PlayerCards[:len(session.Game.PlayerCards)-1]

		return &completedMove, nil
	}

	return nil, nil
}
