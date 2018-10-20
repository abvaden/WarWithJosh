import { ICommandHandler, ICommand } from '@/logic/commanding';
import { ToggleDialogCommand, ToggleDialogCommand_Name } from '@/logic/commands/toggle-dialog.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class ToggleDialogCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ ToggleDialogCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        return this.handleOpen(<ToggleDialogCommand>command);
    }

    private handleOpen(command: ToggleDialogCommand): void {
        this._gameState.Tutorial.show_popup = command.tutorialDialog;
        this._gameState.WinnerDialog.isOpen = command.winnerDialog;
    }
}