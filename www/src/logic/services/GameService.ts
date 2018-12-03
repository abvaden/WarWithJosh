import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, GameStartParams } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType, IPlayerFactoryInputs } from '@/gops/player';



@injectable()
export class GameService implements IGameService {
    private _playerDecided: ((x: number) => void) | undefined;
    constructor() {
    }

    startGame(handlers: Callbacks, params: GameStartParams): void {
        this.startOfflineGame(handlers);
    }

    interactivePlayerDecideMove(value: number): void {
        if (this._playerDecided) {
            this._playerDecided(value);
        }
    }

    endGame(): void {
        throw new Error("Method not implemented.");
    }

    private async startOfflineGame(handlers: Callbacks): Promise<void> {
        const player1 = await playerFactory({
            PlayerType: PlayerType.Random,
            Callbacks: {
                afterMove: (value: number) => {
                    if (handlers.onAiDecided) {
                        handlers.onAiDecided(value);
                    }
                }
            }
        });

        const player2Params: IPlayerFactoryInputs = {
            PlayerType: PlayerType.CallbackPlayer,
            nextMoveCallback: () => {},
            Callbacks: {
                afterMove: (value: number) => {
                }
            }
        };
        this._playerDecided = player2Params.nextMoveCallback;
        const player2 = await playerFactory(player2Params);
        this._playerDecided = player2.nextMove;

        const gameInputs: IGameFactoryInputs = {
            player1: player1,
            player2: player2,

            callbacks: {
                afterPointsDecided: (x) => { 
                    if (handlers.onTrickPointsDecided) {
                        handlers.onTrickPointsDecided(x);
                    }
                },
                afterTrickFinished: (a, b, c, d, e, f) => {
                    if (handlers.onTrickCompleted) {
                        handlers.onTrickCompleted({
                            trickNumber: a,
                            trickPoints: b,
                            payer1_value: c,
                            player1_score: d,
                            player2_value: e,
                            player2_score: f 
                        })
                    }
                }
            }
        }

        const internalGame = await gameFactory(gameInputs);

        const gameResults = await internalGame();
        if (handlers.onGameCompleted) {
            handlers.onGameCompleted(gameResults.player1, gameResults.player2);
        }
    }
}