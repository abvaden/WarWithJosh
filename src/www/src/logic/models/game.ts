import { IPlayer } from '@/logic/models/player';

export interface IGame {
    readonly players: ReadonlyArray<IPlayer>;
    readonly movesPlayed: number;

    isOver(): boolean;

    determineWinner(): Promise<IPlayer>;
}

export function gameFactory(): IGame {
    throw new Error("Not implemented");
}