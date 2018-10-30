package services

import (
	"WarWithJosh/api/interfaces"
	"WarWithJosh/api/models"
	"errors"
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
func (engine *GameEngine) StartNewSession(player *models.Player) (*models.Session, error) {
	repository := *engine.repository
	session, err := repository.AddSession()
	if err != nil {
		return nil, err
	}

	session.StartTime = time.Now().Unix()
	clonedPlayer := *player
	session.Player = clonedPlayer
	err = repository.UpdateSession(session)
	if err != nil {
		return session, err
	}
	return session, nil
}

// AddSessionMove ..
func (engine *GameEngine) AddSessionMove(sessionID *string, move *models.Move) error {
	repository := *engine.repository
	session, err := repository.GetSession(sessionID)
	if err != nil {
		return err
	}

	clonedMove := *move
	newMoves := append(session.Moves, clonedMove)

	session.Moves = newMoves
	err = repository.UpdateSession(session)
	if err != nil {
		return err
	}

	return nil
}

// DetermineAiNextMove ..
func (engine *GameEngine) DetermineAiNextMove(session *models.Session) (*models.Move, error) {
	return nil, errors.New("Not implemented")
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
