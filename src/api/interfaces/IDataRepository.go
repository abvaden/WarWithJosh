package interfaces

import (
	"WarWithJosh/src/api/models"
)

// IDataRepository ... Abstraction over the persistance of app data
type IDataRepository interface {
	addSession() (*models.Session, error)
	getSession(sessionID string) (*models.Session, error)
	updateSession(session *models.Session) error

	updateGlobalResults(results *models.GlobalResults) error
}
