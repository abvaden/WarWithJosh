import { PlayingCard } from './card';

export interface IPlayer {
    dealCard(card: PlayingCard): void;
    playCard(): Promise<PlayingCard>;
}


export async function playerFactory(): Promise<IPlayer> {
    throw new Error("Not implemented");
}