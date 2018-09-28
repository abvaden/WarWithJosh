export interface PlayingCard {
    readonly name: string;
    readonly suit: CardSuit;
    readonly value: number;
    trumps(card: PlayingCard): boolean;
}

export enum CardSuit {
    Spade = "Spade",
    Heart = "Heart",
    Diamond = "Diamond",
    Club = "Club"
}

function doesTrump(card1: PlayingCard, card2: PlayingCard): boolean {
    if ((card1 === undefined) || (card2 === undefined)) {
        throw new Error("card may not be undefined");
    }
    return card1.value > card2.value;
}

const suitMap = new Map<CardSuit, number>([
    [CardSuit.Spade, .3],
    [CardSuit.Heart, .2],
    [CardSuit.Diamond, .1],
    [CardSuit.Club, .0],
]);
const nameMap = new Map<string, number>([
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["10", 10],
    ["J", 11],
    ["Q", 12],
    ["K", 13],
    ["A", 14]
]);

export function cardFactory(face: string, suit: CardSuit): PlayingCard {
    if (!nameMap.has(face)) {
        throw new Error("Invalid face value");
    }
    if (!suitMap.has(suit)) {
        throw new Error("Invalid car suit");
    }
    const card: PlayingCard = {
        name: face,
        value: <number>nameMap.get(face) + <number>suitMap.get(suit),
        suit: suit,
        trumps: (x: PlayingCard) => {
            return doesTrump(card, x);
        }
    };
    return card;
}