package web

import (
	"log"
	"net/http"
	"time"
)

// MakeLoggingMiddleware ... Wraps an http handler with request timing logging
func MakeLoggingMiddleware(route string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now().UTC().Unix()
		next.ServeHTTP(w, r)
		end := time.Now().UTC().Unix()
		duration := end - start

		log.Printf("Handled API request for route %s in %d", route, duration)
	})
}

// AddCORSMiddleWare ...
func AddCORSMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		headers := w.Header()
		headers.Add("Access-Control-Allow-Origin", "*")
		next.ServeHTTP(w, r)
	})
}
