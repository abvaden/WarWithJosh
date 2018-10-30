import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { ChangeTutorialPopupPersistanceCommand, ChangeTutorialPopupPersistanceCommand_Name } from '../commands/change-tutorial-popup-persistance.command';

@injectable()
export class ChangeTutorialPopupPersistanceCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ChangeTutorialPopupPersistanceCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        this.handleCommand(<ChangeTutorialPopupPersistanceCommand>command);
    }

    private handleCommand(command: ChangeTutorialPopupPersistanceCommand): void {
        this._gameState.Tutorial.continue_to_show = command.value;
        localStorage.setItem("show-tutorial-popup", command.value ? "T" : "F");
    }
}