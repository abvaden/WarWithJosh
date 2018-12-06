export const IGameService_IOC_Key = Symbol.for("IGameService");

export interface GameStartParams {
    offline: boolean;
}
export interface TrickResults {
    player1_value: number;
    player2_value: number;
    trickPoints: number;
    player1_score: number;
    player2_score: number;
    trickNumber: number;
}
export interface Callbacks {
    onGameStarted?: (gameId: string) => void;
    onGameCompleted?: (player1: number, player2: number) => void;
    onTrickPointsDecided?: (trickPoints: number) => void;
    onAiDecided?: (value: number) => void;
    onTrickCompleted?: (trickResults: TrickResults) => void;
    onError?: (error: string) => void;
}
export interface IGameService {
    startGame(handlers: Callbacks, params: GameStartParams): void;
    interactivePlayerDecideMove(value: number): void;
    endGame(): void;
}
