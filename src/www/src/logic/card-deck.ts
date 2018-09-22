import { PlayingCard } from '@/models/card';
import { CardSuit } from '@/models/card-suit';
import { cardFactory } from '@/logic/card';
import { CardDeck } from '@/models/card-deck';

function shuffle(cards: Array<PlayingCard>){
    var currentIndex = cards.length, temporaryValue, randomIndex;
          
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

export function deckFactory() : CardDeck {
    const cards = new Array<PlayingCard>();
    [CardSuit.Club, CardSuit.Diamond, CardSuit.Heart, CardSuit.Spade].forEach (suit => { 
        ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A" ].forEach(face => {
            cards.push(cardFactory(face, suit));
        });
    });

    shuffle(cards);

    return {
        nextCard: () => { 
            const card = cards.pop();
            if (card === undefined) {
                throw new Error("Deck empty");
            }
            else {
                return card;
            }
        },
        remainingCards: () => { return cards.length; },
        shuffle: () => { shuffle(cards); }
    };
}