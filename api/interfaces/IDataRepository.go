package interfaces

import (
	"WarWithJosh/api/models"
)

// IDataRepository ... Abstraction over the persistance of app data
type IDataRepository interface {
	AddSession() (*models.Session, error)
	GetSession(sessionID *string) (*models.Session, error)
	UpdateSession(session *models.Session) error
	UpdateGlobalResults(results *models.GlobalResults) error
	GetGlobalResults(aiTypeID string) (*models.GlobalResults, error)
}
