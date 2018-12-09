package events

import (
	"sync"
)

// EventHandler ... a receiver of events
// type eventHandler func(e interface{})

// EventBus ... Publish events to all listening subscribers
type EventBus struct {
	subscriptions map[string][]*EventSubscription
	lock          sync.Mutex
	channel       chan publishedEvent
	wg            sync.WaitGroup
}

// EventSubscription ...
type EventSubscription struct {
	bus          *EventBus
	topic        string
	handler      *func(e interface{})
	isSubscribed bool
}

// Unsubscribe ...
func (sub *EventSubscription) Unsubscribe() {
	sub.isSubscribed = false
	go sub.bus.unsubscribe(sub.topic, sub)
}

type publishedEvent struct {
	event interface{}
	topic string
}

// Busfactory ... Get a handle the global event bus
func Busfactory() *EventBus {
	bus := new(EventBus)
	bus.subscriptions = make(map[string][]*EventSubscription)
	bus.channel = make(chan publishedEvent, 100)

	go bus.handlePublish()

	return bus
}

// Publish ... Publish event to all consumers of the event
func (bus *EventBus) Publish(topic string, event interface{}) {
	bus.wg.Add(1)
	publishedEvent := new(publishedEvent)
	publishedEvent.topic = topic
	publishedEvent.event = event

	bus.channel <- *publishedEvent
}

// WaitAll ... Wait until all events have been consumed by all subscribers
func (bus *EventBus) WaitAll() {
	bus.wg.Wait()
}

func (bus *EventBus) handlePublish() {
	for {
		eventInstance, ok := <-bus.channel

		handlers, ok := bus.subscriptions[eventInstance.topic]
		if ok {
			numHandlers := len(handlers)
			wg := new(sync.WaitGroup)
			wg.Add(numHandlers)
			for i := range handlers {
				handler := *handlers[i]
				if !handler.isSubscribed {
					wg.Done()
					continue
				}

				go func() {
					(*handler.handler)(eventInstance.event)
					wg.Done()
				}()
			}
			wg.Wait()
		}

		// increment the global counter for the bus to indicate that the event has been published
		bus.wg.Done()
	}
}

func (bus *EventBus) doPublish(eventInstance *publishedEvent) {

}

// Subscribe ... subscribe to events on a given topic
func (bus *EventBus) Subscribe(topic string, handler *func(e interface{})) *EventSubscription {
	sub := new(EventSubscription)
	sub.bus = bus
	sub.handler = handler
	sub.isSubscribed = true
	sub.topic = topic

	bus.lock.Lock()
	defer bus.lock.Unlock()

	subscriptions, ok := bus.subscriptions[topic]
	if !ok {
		subscriptions = make([]*EventSubscription, 1)
		subscriptions[0] = sub
		bus.subscriptions[topic] = subscriptions
	} else {
		subscriptions = append(subscriptions, sub)
		bus.subscriptions[topic] = subscriptions
	}

	return sub
}

func (bus *EventBus) unsubscribe(topic string, subscription *EventSubscription) {
	bus.lock.Lock()
	defer bus.lock.Unlock()

	subscriptions, ok := bus.subscriptions[topic]
	if !ok {
		return
	}

	if len(subscriptions) == 1 {
		delete(bus.subscriptions, topic)
	}

	idx := -1
	for i := 0; i < len(subscriptions); i++ {
		if subscription == subscriptions[i] {
			idx = i
		}
	}

	if idx == -1 {
		return
	}

	subscriptions[idx] = subscriptions[len(subscriptions)-1]
	bus.subscriptions[topic] = subscriptions[:len(subscriptions)-1]
}
