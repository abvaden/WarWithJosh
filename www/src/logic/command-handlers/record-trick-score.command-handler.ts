import { ICommandHandler, ICommand } from '@/logic/commanding';
import { RecordTrickScoreCommand, RecordTrickScoreCommandName } from '@/logic/commands/record-trick-score.command'
import { IGameState, GameState_IOC_Key, IHistoricalPlay } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { IAPIClient, IAPIClient_IOC_KEY } from '@/api-client';

@injectable()
export class RecordTrickScoreCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ RecordTrickScoreCommandName ];
    
    private readonly _gameState: IGameState;
    private readonly _apiClient: IAPIClient;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(IAPIClient_IOC_KEY)apiClient: IAPIClient) {
        this._gameState = gameState;
        this._apiClient = apiClient;
    }

    public handle(command: ICommand): void {
        return this.handleOpen(<RecordTrickScoreCommand>command);
    }

    private handleOpen(command: RecordTrickScoreCommand): void {
        const historicalPlay: IHistoricalPlay = {
            trickNumber: command.trickNumber,
            trickPoints: command.trickPoints,
            player1_number: command.player1_value,
            player2_number: command.player2_value,
            player1_points: command.player1_score,
            player2_points: command.player2_score
        };
        this._gameState.Game.play_history.push(historicalPlay);

        this._gameState.Game.player1_points = command.player1_score;
        this._gameState.Game.player2_points = command.player2_score;

        this._apiClient.AddSessionMove(this._gameState.Game.activeGameId, {
            "ai-bid": command.player1_value,
            "ai-score": command.player1_score,
            "hand-value": command.trickPoints,
            "player-bid": command.player2_value,
            "player-score": command.player2_value
        })
    }
}