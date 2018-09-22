import { PlayingCard } from '@/models/card';

export interface CardDeck {
    shuffle(): void;
    remainingCards(): number;
    nextCard(): PlayingCard;
}
