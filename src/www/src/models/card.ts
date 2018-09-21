import { CardSuit } from "@/models/card-suit";

export interface PlayingCard {
    readonly name: string;
    readonly suit: CardSuit;
    readonly value: number;
    trumps(card: PlayingCard): boolean;
}
