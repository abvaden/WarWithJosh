import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { RevealWinnerCommand, RevealWinnerCommandName } from '../commands/reveal-winner.command';
import { ToggleDialogCommand } from '../commands/toggle-dialog.command';
import { IAPIClient, IAPIClient_IOC_KEY } from '@/api-client';

@injectable()
export class RevealWinnerCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [RevealWinnerCommandName]
    
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
        this.handle_Command(<RevealWinnerCommand>command);
    }

    private handle_Command(command: RevealWinnerCommand): void {
        this._gameState.WinnerDialog.player1_name = this._gameState.Game.player1_name;
        this._gameState.WinnerDialog.player2_name = this._gameState.Game.player2_name;
        if (this._gameState.Game.player1_points !== undefined) {
            this._gameState.WinnerDialog.player1_score = this._gameState.Game.player1_points;
        }
        if (this._gameState.Game.player2_points !== undefined) {
            this._gameState.WinnerDialog.player2_score = this._gameState.Game.player2_points;
        }

        this._apiClient.EndSession(this._gameState.Game.activeGameId);
        this._gameState.Game.activeGameId = "";

        const openWinnerDialogCommand = new ToggleDialogCommand();
        openWinnerDialogCommand.open = true;
        openWinnerDialogCommand.winnerDialog = true;
        this._commandPublisher.publish(openWinnerDialogCommand);
    }
}