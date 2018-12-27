export const IGameService_IOC_Key = Symbol.for("IGameService");
export const ILogger_IOC_Key = Symbol.for("ILogger");
export const IConnectionService_IOC_Key = Symbol.for("IConnectionService");
export const IResultsService_IOC_Key = Symbol.for("IResultsService");

export interface TrickResults {
    player1_value: number;
    player2_value: number;
    trickPoints: number;
    player1_score: number;
    player2_score: number;
    trickNumber: number;
}
export interface Callbacks {
    onGameStarted?: () => void;
    onGameCompleted?: (player1: number, player2: number) => void;
    onTrickPointsDecided?: (trickPoints: number) => void;
    onAiDecided?: () => void;
    onTrickCompleted?: (trickResults: TrickResults) => void;
    onError?: (error: string) => void;
}
export interface IGameService {
    startGame(handlers: Callbacks): void;
    validPlayerTypes(): Promise<string[]>;
    interactivePlayerDecideMove(value: number): void;
    endGame(): void;
}

export interface IResultsService {

}

export interface ConnectionChangeEvent {
    readonly Online: boolean;
}
export interface IConnectionService {
    readonly IsRunning: boolean;
    Online(): boolean;
    Start(): void;
    Stop(): void;
    Attach(handler: (event: ConnectionChangeEvent) => void): void;
    Detach(handler: (event: ConnectionChangeEvent) => void): void;
}


export interface ILogger {
    Log(level: "Error" | "Info", site: string, message: string): void;
}