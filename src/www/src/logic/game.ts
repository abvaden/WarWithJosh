import { IPlayer } from '@/logic/player';

export interface IGame {
    readonly players: ReadonlyArray<IPlayer>;
    readonly movesPlayed: number;

    isOver(): boolean;

    determineWinner(): Promise<IPlayer>;
}