import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, CommandPublisher, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { RequestStartGameCommand, RequestStartGameCommandName } from '@/logic/commands/request-start-game.command';
import { IAPIClient_IOC_KEY, IAPIClient } from '@/api-client';
import { StartGameCommand } from '../commands/start-game.command';
import { GlobalErrorCommand } from '../commands/global-error.command';
import { ToggleDialogCommand } from '../commands/toggle-dialog.command';

const MIN_STARTUP_DELAY: number = 1250;

@injectable()
export class RequestStartGameCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [RequestStartGameCommandName]
    
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
        this.handle_Command(<RequestStartGameCommand>command);
    }

    private handle_Command(command: RequestStartGameCommand): void {
        this.Handle();
    }

    private async Handle(): Promise<void> {
        try {
            this._gameState.Tutorial.is_loading = true;
            const startTime = (new Date()).valueOf();
            const sessionId = await this._apiClient.StartNewSession();
            const endTime = (new Date()).valueOf();
            const elapsedTime = endTime - startTime;

            // Here we are forcing the starting of the game to take a minimum of 500 ms. 
            // This has no real effect
            if (elapsedTime < MIN_STARTUP_DELAY) {
                await new Promise((resolve, reject) => {
                    setTimeout(() => { resolve(); }, MIN_STARTUP_DELAY - elapsedTime);
                });
            }

            this._gameState.Tutorial.is_loading = false;

            const startGameCommand = new StartGameCommand();
            startGameCommand.GameId = sessionId;
            this._commandPublisher.publish(startGameCommand);

            const closePopupCommand = new ToggleDialogCommand();
            closePopupCommand.open = false;
            this._commandPublisher.publish(closePopupCommand);
        } catch (e) {
            const globalErrorCommand = new GlobalErrorCommand();
            globalErrorCommand.ErrorMessage = "Error while setting up the game";
            globalErrorCommand.ErrorDetails = e.Message;

            this._commandPublisher.publish(globalErrorCommand);
        }
    }
}