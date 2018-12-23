package web

import (
	"log"
)

// SessionService ...
type SessionService struct {
	send    func(message Wrapper)
	end     chan bool
	receive chan Wrapper
}

// SessionServiceFactory ...
func SessionServiceFactory(send func(message Wrapper), receive chan Wrapper, end chan bool) (*SessionService, error) {
	service := SessionService{send, end, receive}
	go service.init()
	return &service, nil
}

func (service *SessionService) init() {
	var message Wrapper
	for {
		select {
		case message = <-service.receive:
			service.newMessageHandler(message)
		}
	}
}

func (service *SessionService) newMessageHandler(message Wrapper) {
	log.Println(message)
}
