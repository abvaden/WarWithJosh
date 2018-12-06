export interface IPlayer {
    start(): Promise<void>;
    nextMove(): Promise<number>;
}


export enum PlayerType {
    Random,
    CallbackPlayer
};

export interface IPlayerFactoryInputs {
    PlayerType: PlayerType,
    Callbacks: IPlayerCallbacks,
    nextMoveCallback? : (x: number) => void;
};

export async function playerFactory<T extends IPlayer>(input: IPlayerFactoryInputs): Promise<T> {
    let player: IPlayer;
    switch (input.PlayerType) {
        case(PlayerType.CallbackPlayer): {
            const interactivePlayer =  new InteractivePlayer();
            player = interactivePlayer;

            break;
        }
        case (PlayerType.Random): {
            player = createRandomPlayer(input.Callbacks);
            break;
        }
        default: {
            throw new Error("");
        }
    }

    return player as T;
}

export interface IPlayerCallbacks {
    afterMove?: (pointValue: number) => void,
}


function createRandomPlayer(callbacks: IPlayerCallbacks): IPlayer {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    
    // Shuffle the numbers to a random order
    var currentIndex = numbers.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = numbers[currentIndex];
        numbers[currentIndex] = numbers[randomIndex];
        numbers[randomIndex] = temporaryValue;
    }

    return {
        start: () => {
            return Promise.resolve();
        },
        nextMove: () => {
            return new Promise<number>((resolve, reject) => {
                const number = numbers.shift();
                if (number === undefined) {
                    reject("All numbers played");
                    return;
                }
                setTimeout(() => {
                    resolve(number);

                    if (callbacks.afterMove) {
                        callbacks.afterMove(number);
                    }
                }, Math.random() * 3000);
            });
        }
    };
}

function createInteractivePlayer(callbacks: IPlayerCallbacks): InteractivePlayer {
   return new InteractivePlayer();
}

export class InteractivePlayer implements IPlayer {
    private _nextMoveResolve: ((x: number) => void) | undefined;
    private _nextMoveNumber: number | undefined;
    
    private readonly _numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    
    constructor() {
    }

    public decideNextMove(value: number): void {
        if (this._nextMoveResolve) {
            const resolve = this._nextMoveResolve;
            this._nextMoveResolve = undefined;
            resolve(value);
        } else {
            this._nextMoveNumber = value;
        }
    }

    public start(): Promise<void> {
        return Promise.resolve();
    }    

    public nextMove(): Promise<number> {
        return new Promise((resolve, reject) => {
            if (this._nextMoveNumber !== undefined) {
                const number = this._nextMoveNumber;
                this._nextMoveNumber = undefined;
                resolve(number);
                return;
            } else {
                this._nextMoveResolve = resolve;
                return;
            }
        });
    }
}