import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { EndGameCommand, EndGameCommandName } from '../commands/end-game.command';
import { IAPIClient, IAPIClient_IOC_KEY } from '@/api-client';

@injectable()
export class EndGameCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [EndGameCommandName]
    
    private readonly _gameState: IGameState;
    private readonly _apiClient: IAPIClient;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(IAPIClient_IOC_KEY)apiClient: IAPIClient) {
        this._gameState = gameState;
        this._apiClient = apiClient;
    }

    handle(command: ICommand): void {
        this.handle_Command(<EndGameCommand>command);
    }

    private handle_Command(command: EndGameCommand): void {
        if (this._gameState.Game.activeGameId != "") {
            this._apiClient.EndSession(this._gameState.Game.activeGameId);
            this._gameState.Game.activeGameId = "";
        }

        this._gameState.Game.hasBegun = false;
    }
}