import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { ChangeSetupDisplayCommand, ChangeSetupDisplayCommand_Name } from '../commands/change-setup-display.command';

@injectable()
export class ChangeSetupDisplayCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ChangeSetupDisplayCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        this.handleCommand(<ChangeSetupDisplayCommand>command);
    }

    private handleCommand(command: ChangeSetupDisplayCommand): void {
        this._gameState.SetupDialog.selected_option = command.option;
    }
}