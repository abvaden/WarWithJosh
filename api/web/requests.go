package web

import "WarWithJosh/api/models"

// AddMoveRequest ...
type AddMoveRequest struct {
	SessionID string      `json:"session-id"`
	Move      models.Move `json:"move"`
}
