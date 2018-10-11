import { ICommandHandler, ICommand } from '@/logic/commanding';
import { RecordTrickScoreCommand, RecordTrickScoreCommandName } from '@/logic/commands/record-trick-score.command'
import { IGameState, GameState_IOC_Key, IHistoricalPlay } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class RecordTrickScoreCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ RecordTrickScoreCommandName ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
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
    }
}