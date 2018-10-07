import { ICommandHandler, ICommand } from '@/logic/commanding';
import { PlayerDecidedCommand, PlayerDecidedCommand_Name } from '@/logic/commands/player-decided.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class PlayerDecidedCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ PlayerDecidedCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        return this.handleCommand(<PlayerDecidedCommand>command);
    }

    private handleCommand(command: PlayerDecidedCommand): void {
        if (command.Player1) {
            this._gameState.Game.player1_hasPlayed = true;
        } else {
            this._gameState.Game.player2_hasPlayed = true;
        }
    }
}