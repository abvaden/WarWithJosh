package services

import (
	"errors"

	"github.com/abvaden/WarWithJosh/api/models"

	"github.com/jinzhu/copier"
	uuid "github.com/satori/go.uuid"
)

// InMemoryRepository ...
type InMemoryRepository struct {
	sessions      map[string]*models.Session
	globalResults map[string]*models.GlobalResults
}

// InMemoryRepositoryFactory ... Create a new data repository not backed by a persistent mechanism. This should prove useful in testing
func InMemoryRepositoryFactory() (*InMemoryRepository, error) {
	repository := InMemoryRepository{}
	repository.sessions = make(map[string]*models.Session)

	return &repository, nil
}

// AddSession ...
func (repository *InMemoryRepository) AddSession() (*models.Session, error) {
	session := models.Session{}
	sessionID, err := uuid.NewV4()
	if err != nil {
		return &session, errors.New("Error while creating session")
	}

	sessionIDString := sessionID.String()
	session.ID = sessionIDString

	// Since we are creating new id's in the implementation this is safe to do without
	// concurrency checks, if we were to open this up so that clients could generate
	// session id's then this would need to be updated to check for concurrency issues
	repository.sessions[sessionIDString] = &session

	returnSession := models.Session{}
	copier.Copy(returnSession, session)

	return &returnSession, nil
}

// GetSession ...
func (repository *InMemoryRepository) GetSession(sessionID string) (*models.Session, error) {
	storedSession, ok := repository.sessions[sessionID]
	if !ok {
		return nil, errors.New("Session not found")
	}

	retSession := models.Session{}
	copier.Copy(&retSession, &storedSession)
	return &retSession, nil
}

// UpdateSession ...
func (repository *InMemoryRepository) UpdateSession(session *models.Session) error {
	storedSession := models.Session{}
	copier.Copy(&storedSession, &session)

	repository.sessions[storedSession.ID] = &storedSession
	return nil
}

// UpdateGlobalResults ...
func (repository *InMemoryRepository) UpdateGlobalResults(results *models.GlobalResults) error {
	storedResults := models.GlobalResults{}
	copier.Copy(storedResults, *results)

	repository.globalResults[results.AIType] = &storedResults
	return nil
}

// GetGlobalResults ...
func (repository *InMemoryRepository) GetGlobalResults(aiTypeID string) (*models.GlobalResults, error) {
	storedResults, ok := repository.globalResults[aiTypeID]
	if !ok {
		return nil, errors.New("GlobalResults not found for a given AiType")
	}

	retResults := models.GlobalResults{}
	copier.Copy(retResults, storedResults)
	return &retResults, nil
}
