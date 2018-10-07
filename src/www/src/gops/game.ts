import { IPlayer, playerFactory } from './player';
import { IGame } from '@/logic/models/gamestate';

export async function gameFactory(inputs: IGameFactoryInputs): Promise<() => void> {
    // const inputs = {
    //     player1: await playerFactory(), 
    //     player2: await playerFactory(),
    //     gameCallbacks: {

    //     }
    // };
    return () => {
        run(inputs);
    };
}

export interface IGameFactoryInputs {
    player1: IPlayer,
    player2: IPlayer,
    callbacks: IGameCallbacks
};

export interface IGameCallbacks {
    afterPointsDecided?: (pointValue: number) => void,
    afterTrickFinished?: (player1Option: number, player2Option: number, player1Score: number, player2Score: number) => void;
}

async function run(inputs: IGameFactoryInputs): Promise<{player1: number, player2: number}> {
    // Start the players
    await Promise.all([inputs.player1.start(), inputs.player2.start()]);

    const player1 = inputs.player1;
    const player2 = inputs.player2;

    let well = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const score = {
        player1: 0,
        player2: 0
    };

    // Run all tricks
    for (let i = 0; i < 13; i++) {
        // Deal the points card
        const randomIndex = Math.floor(Math.random() * well.length);
        const pointsValue = well[randomIndex];
        well.splice(randomIndex, 1);

        if (inputs.callbacks.afterPointsDecided) {
            inputs.callbacks.afterPointsDecided(pointsValue);
        }
        
        // Players make simultaneous move
        const p1MovePromise = player1.nextMove();
        const p2MovePromise = player2.nextMove();

        const numbers = await Promise.all([p1MovePromise, p2MovePromise]);
        
        const p1Move = numbers[0];
        const p2Move = numbers[1];

        if (p1Move > p2Move) {
            // Player 1 won the trick
            score.player1 += pointsValue;
        } else if (p2Move > p1Move) {
            // Player 2 won the trick
            score.player2 += pointsValue;
        } else {
            // Hand tied
            const halfPoints = pointsValue / 2;
            score.player1 += halfPoints;
            score.player2 += halfPoints;
        }
        
        if (inputs.callbacks.afterTrickFinished) {
            inputs.callbacks.afterTrickFinished(p1Move, p2Move, score.player1, score.player2);
        }
    }

    return score;
}
