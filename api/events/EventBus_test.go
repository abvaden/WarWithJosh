package events

import (
	"testing"
)

func TestEventBus_Subscribe(t *testing.T) {
	bus := Busfactory()
	bus.Publish("Unit test", new(interface{}))

	testHandler := new(TestHandler)
	handler1 := func(e interface{}) {
		testHandler.Handle1(e)
	}
	bus.Subscribe("1", &handler1)

	bus.Publish("1", new(interface{}))
	bus.WaitAll()

	if !testHandler.didHandle1 || testHandler.didHandle2 {
		t.Error("Wrong routing of events")
	}
}

func TestEventBus_Unsubscribe(t *testing.T) {
	bus := Busfactory()
	bus.Publish("Unit test", new(interface{}))

	testHandler := new(TestHandler)
	handler1 := func(e interface{}) {
		testHandler.Handle1(e)
	}
	handler2 := func(e interface{}) {
		testHandler.Handle2(e)
	}
	subscriber1 := bus.Subscribe("1", &handler1)
	bus.Subscribe("1", &handler2)

	bus.Publish("1", new(interface{}))
	bus.WaitAll()

	if !testHandler.didHandle1 || !testHandler.didHandle2 {
		t.Error("Wrong routing of events")
	}

	testHandler.Reset()

	subscriber1.Unsubscribe()
	bus.Publish("1", new(interface{}))
	bus.WaitAll()

	if testHandler.didHandle1 || !testHandler.didHandle2 {
		t.Error("Wrong routing of events")
	}
}

type TestHandler struct {
	didHandle1 bool
	didHandle2 bool
}

func (handler *TestHandler) Handle1(event interface{}) {
	handler.didHandle1 = true
}
func (handler *TestHandler) Handle2(event interface{}) {
	handler.didHandle2 = true
}
func (handler *TestHandler) Reset() {
	handler.didHandle1 = false
	handler.didHandle2 = false
}
