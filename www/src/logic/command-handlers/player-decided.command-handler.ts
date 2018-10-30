import { ICommandHandler, ICommand } from '@/logic/commanding';
import { PlayerDecidedCommand, PlayerDecidedCommand_Name } from '@/logic/commands/player-decided.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { IGameService, IGameService_IOC_Key } from '../services/Interfaces';

@injectable()
export class PlayerDecidedCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ PlayerDecidedCommand_Name ];
    
    private readonly _gameState: IGameState;
    private readonly _gameService: IGameService;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(IGameService_IOC_Key)gameService: IGameService) {
        this._gameState = gameState;
        this._gameService = gameService;
    }

    public handle(command: ICommand): void {
        this.handleCommand(<PlayerDecidedCommand>command);
    }

    private handleCommand(command: PlayerDecidedCommand): void {
        if (command.Player1) {
            this._gameState.Game.player1_handReady = true;
        } else {
            this._gameState.Game.player2_handReady = true;
        }

        if (!command.Player1) {
            if (command.Value === undefined) {
                throw new Error("A decide command for player 2 must have a value");
            }
            this._gameService.interactivePlayerDecideMove(command.Value);
        }
    }
}