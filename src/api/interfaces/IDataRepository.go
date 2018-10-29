package interfaces

import (
	"WarWithJosh/src/api/models"
)

// IDataRepository ... Abstraction over the persistance of app data
type IDataRepository interface {
	AddSession() (*models.Session, error)
	GetSession(sessionID *string) (*models.Session, error)
	UpdateSession(session *models.Session) error

	UpdateGlobalResults(results *models.GlobalResults) error
}
