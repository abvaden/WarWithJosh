export const IGameService_IOC_Key = Symbol.for("IGameService");

export interface IGameService {
    startGame(onGameCompleted: (player1:number, player2: number) => void): Promise<void>;
    createPlayer(): void;
    interactivePlayerDecideMove(value: number): void;
}
