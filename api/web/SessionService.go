package web

import (
	"WarWithJosh/api/services"
	"log"

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

	var err error

	switch typeURL {
	case "web.StartGameMessage":
		message := new(StartGameMessage)
		err := ptypes.UnmarshalAny(wrapper.Payload, message)
		if err != nil {
			go service.handleMessageParseError(&err)
		}
		go service.handleStartGameMessage(message)
	case "web.PlayerDecidedMessage":
		message := new(PlayerDecidedMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			go service.handlePlayerDecided(message)
		}
		break
	case "web.SetAi":
		message := new(SetAiMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			go service.handleMessageParseError(&err)
		}
		go service.handleSetAi(message)
		break
	case "web.Error":
		message := new(ErrorMessage)
		err = message.XXX_Unmarshal(data)
		if err != nil {
			go service.handleError(message)
		}
		break
	}

	if err != nil {
		log.Println("Unknown type url " + typeURL)
		return
	}

	log.Println(typeURL)
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
	trickDecided.TrickPoints = int32(trickPoints)

	trickDecidedMessage, _ := makeWrapper(trickDecided)
	service.send(trickDecidedMessage)
}

func (service *SessionService) handleSetAi(message *SetAiMessage) {
	aiName := message.AiName
	service.engine.SetAi(service.sessionID, aiName)
}

func (service *SessionService) handlePlayerDecided(message *PlayerDecidedMessage) {
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
