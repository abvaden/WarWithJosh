import { IPlayer, playerFactory } from './player';
import { cardFactory, PlayingCard } from './card';
import { deckFactory, CardDeck } from './card-deck';

export async function gameFactory(): Promise<() => void> {
    const inputs = {
        players: [ await playerFactory(), await playerFactory() ]
    };
    return () => {
        run(inputs);
    };
}

async function run(inputs: {players: IPlayer[]}): Promise<{player: IPlayer, score: number}[]> {
    const deck = deckFactory();

    // Do the initial dealing
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < inputs.players.length; j++) {
            const cardToDeal = deck.nextCard();
            inputs.players[i].dealCard(cardToDeal);
        }
    }

    const isOver = () => {
        return false;
    };
    var players = inputs.players.map(x => x);
    const playerScoreMap = new Map<IPlayer, number>();
    players.forEach((x) => {
        playerScoreMap.set(x, 0);
    });


    do {
        const playedCards = new Array<{player: IPlayer, card: PlayingCard}>();
        for (let i = 0; i < inputs.players.length; i++) {
            var cardPlayed = await players[i].playCard();
            playedCards.push({player: players[i], card: cardPlayed});
        }
        const winner = determineHandWinner(playedCards);
        const previousScore = <number>playerScoreMap.get(winner.player);
        playerScoreMap.set(winner.player, winner.points + previousScore);

    } while (!isOver());

    let scoreBoard = new Array<{player: IPlayer, score: number}>();
    for(let entry of playerScoreMap.entries()) {
        scoreBoard.push({player: entry[0], score: entry[1]});
    }
    scoreBoard.sort((x) => { return x.score; });
    return scoreBoard;
}

function determineHandWinner(playedCards: ReadonlyArray<{player: IPlayer, card: PlayingCard}>): { player: IPlayer, points: number } {
    const winner = playedCards.reduce((p, c) => {
        if (p.card.trumps(c.card)) {
            return p;
        } else {
            return c;
        }
    }, playedCards[0]);

    var points = 0;
    for (let i = 0; i < playedCards.length; i++) {
        if (winner === playedCards[i]) {
            continue;
        }

        points += Math.round(winner.card.value) - Math.round(playedCards[i].card.value);
    }

    return { player: winner.player, points: points};
}