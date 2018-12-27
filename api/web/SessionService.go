package web

import (
	"log"

	"github.com/abvaden/WarWithJosh/api/models"
	"github.com/abvaden/WarWithJosh/api/services"

	proto "github.com/golang/protobuf/proto"
	ptypes "github.com/golang/protobuf/ptypes"
)

// SessionService ...
type SessionService struct {
	send      func(message *Wrapper)
	end       chan bool
	receive   chan Wrapper
	engine    *services.GameEngine
	sessionID string
}

// SessionServiceFactory ...
func SessionServiceFactory(engine *services.GameEngine, send func(message *Wrapper), receive chan Wrapper, end chan bool) (*SessionService, error) {
	service := SessionService{send, end, receive, engine, ""}
	go service.init()
	return &service, nil
}

func (service *SessionService) init() {
	session, err := service.engine.StartNewSession()
	if err != nil {
		service.handleInternalError(&err, "Error while starting new session")
		service.Close()
		return
	}

	service.sessionID = session.ID

	var message Wrapper
	for {
		select {
		case message = <-service.receive:
			service.newMessageHandler(message)
		}
	}
}

func (service *SessionService) newMessageHandler(wrapper Wrapper) {
	payload := wrapper.GetPayload()
	typeURL := payload.GetTypeUrl()
	data := payload.GetValue()

	log.Println(typeURL)
	var err error

	switch typeURL {
	case "web.StartGameMessage":
		message := new(StartGameMessage)
		err := ptypes.UnmarshalAny(wrapper.Payload, message)
		if err != nil {
			service.handleMessageParseError(&err)
		}
		go service.handleStartGameMessage(message)
	case "web.PlayerDecidedMessage":
		message := new(PlayerDecidedMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			service.handleMessageParseError(&err)
		}
		service.handlePlayerDecided(message)
		break
	case "web.SetAiMessage":
		message := new(SetAiMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			service.handleMessageParseError(&err)
		}
		service.handleSetAi(message)
		break
	case "web.ErrorMessage":
		message := new(ErrorMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			service.handleError(message)
		}
		break
	default:
		service.handleInternalError(nil, "Message type "+typeURL+" not known")
	}

	if err != nil {
		log.Println("Unknown type url " + typeURL)
		return
	}
}

// Close ...
func (service *SessionService) Close() {
	log.Println("Session ended")
}

func (service *SessionService) handleMessageParseError(err *error) {

}

func (service *SessionService) handleInternalError(err *error, message string) {
	errorMessage := ErrorMessage{}
	errorMessage.Message = message

	any, marshalErr := ptypes.MarshalAny(&errorMessage)
	if marshalErr != nil {
		log.Println("Error while creating error message")
		return
	}

	wrapper := new(Wrapper)
	wrapper.Payload = any

	service.send(wrapper)
}

func (service *SessionService) handleError(message *ErrorMessage) {

}

func (service *SessionService) handleStartGameMessage(message *StartGameMessage) {
	trickPoints, err := service.engine.StartNextHand(service.sessionID)

	if err != nil {
		service.handleInternalError(&err, "Error while starting game")
		return
	}

	trickDecided := new(TrickDecidedMessage)
	trickDecided.TrickPoints = uint32(trickPoints)

	trickDecidedMessage, _ := makeWrapper(trickDecided)
	service.send(trickDecidedMessage)

	service.doAiMove()
}

func (service *SessionService) handleSetAi(message *SetAiMessage) {
	aiName := message.AiName
	service.engine.SetAi(service.sessionID, aiName)
}

func (service *SessionService) handlePlayerDecided(message *PlayerDecidedMessage) {
	playerValue := uint8(message.GetValue())
	move, err := service.engine.DeterminePlayerMove(service.sessionID, playerValue)
	if err != nil {
		service.handleInternalError(&err, "Error while handling player move")
		return
	}

	if move != nil {
		service.handleMoveComplete(move)
	}
}

func (service *SessionService) doAiMove() {
	move, err := service.engine.DetermineAiNextMove(service.sessionID)
	if err != nil {
		service.handleInternalError(&err, "Error while determining next AI move")
		return
	}

	aiDecided := new(AiDecidedMessage)
	aiDecidedMessage, _ := makeWrapper(aiDecided)
	service.send(aiDecidedMessage)

	if move != nil {
		service.handleMoveComplete(move)
	}
}

func (service *SessionService) handleMoveComplete(move *models.Move) {
	handsRemaining, err := service.engine.HandsRemaining(service.sessionID)
	if err != nil {
		service.handleInternalError(&err, "Error while handling completed move")
		return
	}

	protoMove := new(MoveMessage)
	protoMove.AiBid = uint32(move.AiBid)
	protoMove.AiScore = move.AiScore
	protoMove.HandValue = uint32(move.HandValue)
	protoMove.PlayerBid = uint32(move.PlayerBid)
	protoMove.PlayerScore = move.PlayerScore

	trickComplete := new(TrickCompletedMessage)
	trickComplete.Move = protoMove
	trickComplete.TricksRemaining = uint32(handsRemaining)

	trickCompletedMessage, err := makeWrapper(trickComplete)
	if err != nil {
		service.handleInternalError(&err, "Error while handling completed move")
		return
	}
	service.send(trickCompletedMessage)

	if handsRemaining == 0 {
		service.doGameComplete()
		return
	}

	trickPoints, err := service.engine.StartNextHand(service.sessionID)
	if err != nil {
		service.handleInternalError(&err, "Error while starting next hand")
		return
	}

	trickDecided := new(TrickDecidedMessage)
	trickDecided.TrickPoints = uint32(trickPoints)

	trickDecidedMessage, _ := makeWrapper(trickDecided)
	service.send(trickDecidedMessage)

	service.doAiMove()
}

func (service *SessionService) doGameComplete() {
	service.engine.EndSession(service.sessionID)
	service.end <- true
}

func makeWrapper(message proto.Message) (*Wrapper, error) {
	any, err := ptypes.MarshalAny(message)
	if err != nil {
		return nil, err
	}

	wrapper := new(Wrapper)
	wrapper.Payload = any
	return wrapper, nil
}
