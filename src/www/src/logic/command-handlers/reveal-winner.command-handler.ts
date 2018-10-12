import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { RevealWinnerCommand, RevealWinnerCommandName } from '../commands/reveal-winner.command';

@injectable()
export class RevealWinnerCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [RevealWinnerCommandName]
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    handle(command: ICommand): void {
        this.handle_Command(<RevealWinnerCommand>command);
    }

    private handle_Command(command: RevealWinnerCommand): void {
        this._gameState.Game.winnerDialogOpen = true;
    }
}