package web

import "WarWithJosh/src/api/models"

type AddMoveRequest struct {
	SessionID string      `json:"session-id"`
	Move      models.Move `json:"move"`
}

type NewSessionResponse struct {
	SessionID string `json:"session-id"`
}

type EndSessionRequest struct {
	SessionID string `json:"session-id"`
}

type Move struct {
	AiScore     float32 `json:"ai-score"`
	AiBid       uint8   `json:"ai-bid"`
	PlayerScore float32 `json:"player-score"`
	PlayerBid   uint8   `json:"player-bid"`
	HandValue   uint8   `json:"hand-value"`
}
