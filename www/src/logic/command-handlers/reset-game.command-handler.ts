import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { ResetGameCommand, ResetGameCommandName } from '@/logic/commands/reset-game.command';
import { ToggleDialogCommand } from '../commands/toggle-dialog.command';
import { StartGameCommand } from '../commands/start-game.command';


@injectable()
export class ResetGameCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [ResetGameCommandName]
    
    private readonly _gameState: IGameState;
    private readonly _commandPublisher: ICommandPublisher;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(ICommandPublisher_IOC_Key)commandPublisher: ICommandPublisher) {
        this._gameState = gameState;
        this._commandPublisher = commandPublisher;
    }

    handle(command: ICommand): void {
        this.handle_Command(<ResetGameCommand>command);
    }

    private handle_Command(command: ResetGameCommand): void {
        this._gameState.Game.hasBegun = false;
        
        this._gameState.Game.play_history = [];

        this._gameState.Game.player1_cards.splice(0);
        this._gameState.Game.player1_handReady = false;
        this._gameState.Game.player1_handValue = undefined;
        this._gameState.Game.player1_points = undefined;

        this._gameState.Game.player2_cards.splice(0);
        this._gameState.Game.player2_handReady = false;
        this._gameState.Game.player2_handValue = undefined;
        this._gameState.Game.player2_points = undefined;
    }
}