package services

import (
	"github.com/abvaden/WarWithJosh/api/interfaces"
)

// SessionService ...
type SessionService struct {
	engine *GameEngine
}

// SessionServiceFactory ...
func SessionServiceFactory(repository interfaces.IDataRepository) *SessionService {
	engine := GameEngineFactory(repository)
	service := SessionService{engine}

	return &service
}
