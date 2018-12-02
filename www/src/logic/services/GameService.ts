import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, GameStartParams } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType } from '@/gops/player';



@injectable()
export class GameService implements IGameService {
    constructor() {
    }

    startGame(handlers: Callbacks, params: GameStartParams): void {
        throw new Error("Method not implemented.");
    }
    interactivePlayerDecideMove(value: number): void {
        throw new Error("Method not implemented.");
    }
    endGame(): void {
        throw new Error("Method not implemented.");
    }
}