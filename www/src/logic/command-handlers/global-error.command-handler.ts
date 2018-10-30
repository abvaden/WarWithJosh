import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { GlobalErrorCommand, GlobalErrorCommandName } from '../commands/global-error.command';
import { ToggleDialogCommand } from '../commands/toggle-dialog.command';
import { IAPIClient, IAPIClient_IOC_KEY } from '@/api-client';

@injectable()
export class GlobalErrorCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [GlobalErrorCommandName]
    
    private readonly _gameState: IGameState;
    private readonly _apiClient: IAPIClient;
    private readonly _commandPublisher: ICommandPublisher;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(IAPIClient_IOC_KEY)apiClient: IAPIClient,
                @inject(ICommandPublisher_IOC_Key)commandPublisher: ICommandPublisher) {
        this._gameState = gameState;
        this._apiClient = apiClient;
        this._commandPublisher = commandPublisher;
    }

    handle(command: ICommand): void {
        this.handle_Command(<GlobalErrorCommand>command);
    }

    private handle_Command(command: GlobalErrorCommand): void {
        if (this._gameState.Game.activeGameId != "") {
            this._apiClient.EndSession(this._gameState.Game.activeGameId);
            this._gameState.Game.activeGameId = "";
        }

        this._gameState.ErrorDialog.error_message = command.ErrorMessage;

        const showErrorDialogCommand = new ToggleDialogCommand();
        showErrorDialogCommand.open = true;
        showErrorDialogCommand.errorDialog = true;
        this._commandPublisher.publish(showErrorDialogCommand);
    }
}