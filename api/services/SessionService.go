package services

import (
	"WarWithJosh/api/interfaces"
)

// SessionService ...
type SessionService struct {
	engine *GameEngine
}

// SessionServiceFactory ...
func SessionServiceFactory(repository interfaces.IDataRepository) *SessionService {
	service := new(SessionService)
	engine := GameEngineFactory(repository)
	service.engine = engine

	return service
}
