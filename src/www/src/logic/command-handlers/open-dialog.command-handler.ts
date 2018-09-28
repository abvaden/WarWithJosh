import { ICommandHandler, ICommand } from '@/logic/commanding';
import { OpenDialogCommand, OpenDialogCommand_Name } from '@/logic/commands/open-dialog.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class OpenDialogCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ OpenDialogCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        return this.handleOpen(<OpenDialogCommand>command);
    }

    private handleOpen(command: OpenDialogCommand): void {
        this._gameState.SetupDialog.IsOpen = !this._gameState.SetupDialog.IsOpen;
    }
}