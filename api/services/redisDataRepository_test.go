package services

import (
	"WarWithJosh/api/models"
	"testing"
	"time"
)

const testserver = "localhost:6379"

func TestRedisDataRepository_Init(t *testing.T) {
	_, err := RedisRepositoryFactory(testserver)
	if err != nil {
		t.Error("RedisDataRepository could not be started")
		return
	}
}

func TestRedisDataRepository_SaveGetSession(t *testing.T) {
	repository, err := RedisRepositoryFactory(testserver)
	if err != nil {
		t.Error("RedisDataRepository could not be started")
		return
	}

	testSession, err := repository.addSession()
	if err != nil {
		t.Error(err)
		return
	}

	if testSession.ID == "" {
		t.Error("When adding a session the session Id must come back not nil")
		return
	}

	testSessionID := testSession.ID
	recalledSession, err := repository.getSession(&testSessionID)

	if err != nil {
		t.Error(err)
		return
	}

	if recalledSession.ID != testSession.ID {
		t.Error("Recalled session id does not match the created session id")
	}

}

func TestRedisDataRepository_UpdateSession(t *testing.T) {
	repository, err := RedisRepositoryFactory(testserver)
	if err != nil {
		t.Error(err)
		return
	}

	session, err := repository.addSession()
	if err != nil {
		t.Error(err)
		return
	}

	sessionID := session.ID
	session.StartTime = time.Now().Unix()
	session.IsComplete = false
	session.Moves = []models.Move{}

	err = repository.updateSession(session)
	if err != nil {
		t.Error(err)
		return
	}

	recalledSession, err := repository.getSession(&sessionID)
	if err != nil {
		t.Error(err)
		return
	}

	if recalledSession.StartTime != session.StartTime {
		t.Error("Session was not updated")
		return
	}
}

func TestRedisDataRepository_GlobalResults(t *testing.T) {
	repository, err := RedisRepositoryFactory(testserver)
	if err != nil {
		t.Error(err)
		return
	}

	results, err := repository.getGlobalResults()
	if err != nil {
		t.Error(err)
		return
	}

	results.GamesWon = 1 + results.GamesWon
	results.GamesLost = 5
	results.NumberOfGamesPlayed++

	results.CurrentWinRatio = float32(results.GamesWon) / float32(results.GamesLost)

	err = repository.updateGlobalResults(results)
	if err != nil {
		t.Error(err)
		return
	}

	recalledResults, err := repository.getGlobalResults()
	if err != nil {
		t.Error(err)
		return
	}

	if recalledResults.GamesWon != results.GamesWon {
		t.Error("GlobalResults did not update")
		return
	}
}
