import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { ResetGameCommand, ResetGameCommandName } from '@/logic/commands/reset-game.command';


@injectable()
export class ResetGameCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [ResetGameCommandName]
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    handle(command: ICommand): void {
        this.handle_Command(<ResetGameCommand>command);
    }

    private handle_Command(command: ResetGameCommand): void {
    }
}