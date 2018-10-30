package web

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/satori/go.uuid"
)

// ServerError .. Returns a 500 status code and a body with a json error code while logging the error with the corresponding error code
func ServerError(err error, r *http.ResponseWriter) error {
	response := *r

	headers := response.Header()

	contentTypeHeader := headers.Get("Content-Type")
	if contentTypeHeader == "" {
		headers.Add("Content-Type", "application/json")
	} else {
		headers.Set("Content-Type", "application/json")
	}
	response.WriteHeader(500)

	errorID, error := uuid.NewV4()
	if error != nil {
		return error
	}
	errorMessage := fmt.Sprintf("{errorCode:%s", errorID.String())
	messageBytes := []byte(errorMessage)
	response.Write(messageBytes)

	log.Printf("Error while processing request %s got error %s", errorID.String(), err)
	return nil
}

// JSON .. Returns a 200 response with a json body of the specified response
func JSON(response interface{}, r *http.ResponseWriter) error {
	data, err := json.Marshal(response)
	if err != nil {
		return err
	}

	responseWriter := *r

	headers := responseWriter.Header()

	contentTypeHeader := headers.Get("Content-Type")
	if contentTypeHeader == "" {
		headers.Add("Content-Type", "application/json")
	} else {
		headers.Set("Content-Type", "application/json")
	}
	responseWriter.WriteHeader(200)
	bytesWritten, err := responseWriter.Write(data)

	if err != nil {
		return err
	}
	if bytesWritten != len(data) {
		return errors.New("Could not write all of response")
	}
	return nil
}

// BadRequest ..Returns a 400 response indicating that the request was invalid
func BadRequest(r *http.ResponseWriter) error {
	response := *r
	response.WriteHeader(400)
	return nil
}

// OK .. Returns a 200 indicating a valid request
func OK(r *http.ResponseWriter) error {
	response := *r
	response.WriteHeader(200)
	return nil
}
