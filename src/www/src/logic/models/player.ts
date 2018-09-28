import { PlayingCard } from '@/logic/models/card';

export interface IPlayer {
    drawCard(): void;
    playCard(): Promise<PlayingCard>;
}


export async function playerFactory(): Promise<IPlayer> {
    throw new Error("Not implemented");
}
