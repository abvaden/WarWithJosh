export const IGameService_IOC_Key = Symbol.for("IGameService");

export interface IGameService {
    startGame(): Promise<void>;
}