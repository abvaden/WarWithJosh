export interface IPlayer {
    start(): Promise<void>;
    nextMove(): Promise<number>;
}


export async function playerFactory(): Promise<IPlayer> {
    return createRandomPlayer();
}

function createRandomPlayer(): IPlayer {
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
                }
                setTimeout(() => {
                    resolve(number);
                }, Math.random() * 3000);
            });
        }
    };
}