import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { StartTutorialCommand, StartTutorialCommand_Name } from '../commands/start-tutorial.command';
import { playerCards } from './start-game.command-handler';
import { IAPIClient_IOC_KEY, IAPIClient } from '@/api-client';

@injectable()
export class StartTutorialCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [StartTutorialCommand_Name ];

    private readonly _gameState: IGameState;
    

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        this.handleCommand(<StartTutorialCommand>command);
    }

    private handleCommand(command: StartTutorialCommand): void {
        this._gameState.Tutorial.is_running = true;
        this._gameState.Tutorial.stage = "Well-Cards";

        this._gameState.Game.trickPoints = 5;
        this._gameState.Game.remainingTricks = 12;

        this._gameState.Game.play_history = [];
        this._gameState.Game.hasBegun = true;
        this._gameState.Game.player1_name = "Joshua";
        this._gameState.Game.player1_points = 0;
        this._gameState.Game.player1_cards = playerCards();

        this._gameState.Game.player2_name = "Joe User";
        this._gameState.Game.player2_points = 0;
        this._gameState.Game.player2_cards = playerCards();
    }
}