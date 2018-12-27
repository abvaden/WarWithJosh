package services

import (
	"bytes"
	"errors"
	"strings"

	"github.com/abvaden/WarWithJosh/api/models"
	uuid "github.com/satori/go.uuid"

	"github.com/go-redis/redis"
	"github.com/ugorji/go/codec"
)

// RedisDataRepository ... data repository backed by redis
type RedisDataRepository struct {
	serverName  string
	redisClient *redis.Client
}

const sessionKey = "Session"
const resultsKey = "GlobalResults"

// RedisRepositoryFactory ... Create a new data repository backed by redis
func RedisRepositoryFactory(serverName string) (*RedisDataRepository, error) {
	repository := RedisDataRepository{}

	if serverName == "" {
		return &repository, errors.New("serverName may not be empty")
	}

	repository.serverName = serverName

	client := redis.NewClient(&redis.Options{
		Addr: serverName,
	})
	repository.redisClient = client

	// Check to make sure we can ping the database before we return the connection
	// this will help detect failures on startup instead of later
	_, err := client.Ping().Result()
	if err != nil {
		return &repository, errors.New("Error while connecting to redis server")
	}

	// resultsExist, err := client.Exists(resultsKey).Result()
	// if err != nil {
	// 	return nil, errors.New("Error while starting data repository")
	// }
	// if resultsExist == 0 {
	// 	repository.UpdateGlobalResults(new(models.GlobalResults))
	// }

	return &repository, nil
}

// AddSession ...
func (repository *RedisDataRepository) AddSession() (*models.Session, error) {
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
	client := *repository.redisClient
	sessionString, err := serializeSession(session)
	if err != nil {
		return nil, err
	}

	result, err := client.HSetNX(sessionKey, sessionIDString, sessionString).Result()
	if err != nil {
		return nil, err
	}

	if !result {
		return nil, errors.New("Could not add session")
	}

	return &session, nil
}

// GetSession ...
func (repository *RedisDataRepository) GetSession(sessionID string) (*models.Session, error) {
	client := repository.redisClient

	sessionString, err := client.HGet(sessionKey, sessionID).Result()
	if err != nil {
		return new(models.Session), errors.New("Error while getting session")
	}
	session, err := deserializeSession(sessionString)

	if err != nil {
		return session, err
	}

	return session, nil
}

// UpdateSession ...
func (repository *RedisDataRepository) UpdateSession(session *models.Session) error {
	client := repository.redisClient

	sessionString, err := serializeSession(*session)
	sessionIDString := session.ID
	if err != nil {
		return err
	}

	_, err = client.HSet(sessionKey, sessionIDString, sessionString).Result()
	if err != nil {
		return err
	}

	return nil
}

// UpdateGlobalResults ...
func (repository *RedisDataRepository) UpdateGlobalResults(results *models.GlobalResults) error {
	client := repository.redisClient

	resultsString, err := serializeResults(*results)
	resultsIDString := results.AIType
	if err != nil {
		return err
	}

	_, err = client.HSet(resultsKey, resultsIDString, resultsString).Result()
	if err != nil {
		return err
	}

	return nil
}

// GetGlobalResults ...
func (repository *RedisDataRepository) GetGlobalResults(aiTypeID string) (*models.GlobalResults, error) {
	client := repository.redisClient

	resultsString, err := client.HGet(resultsKey, aiTypeID).Result()
	if err != nil {
		newResults := models.GlobalResults{}
		newResults.AIType = aiTypeID
		return &newResults, nil
	}
	results, err := deserializeResults(resultsString)

	if err != nil {
		return results, err
	}

	return results, nil
}

var serializeHandle codec.Handle = new(codec.MsgpackHandle)

func serializeSession(session models.Session) (string, error) {
	buff := new(bytes.Buffer)
	sessionEncoder := codec.NewEncoder(buff, serializeHandle)
	err := sessionEncoder.Encode(&session)
	if err != nil {
		return "", errors.New("Error while encoding session")
	}
	return buff.String(), nil
}

func deserializeSession(sessionString string) (*models.Session, error) {
	reader := strings.NewReader(sessionString)
	sessionDecoder := codec.NewDecoder(reader, serializeHandle)
	session := models.Session{}
	err := sessionDecoder.Decode(&session)
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func serializeResults(results models.GlobalResults) (string, error) {
	buff := new(bytes.Buffer)
	resultsEncoder := codec.NewEncoder(buff, serializeHandle)
	err := resultsEncoder.Encode(&results)
	if err != nil {
		return "", errors.New("Error while encoding GlobalResults")
	}
	return buff.String(), nil
}

func deserializeResults(resultsString string) (*models.GlobalResults, error) {
	reader := strings.NewReader(resultsString)
	sessionDecoder := codec.NewDecoder(reader, serializeHandle)
	globalResults := models.GlobalResults{}
	err := sessionDecoder.Decode(&globalResults)
	if err != nil {
		return nil, err
	}
	return &globalResults, nil
}
