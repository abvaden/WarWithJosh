import { ICommandHandler, ICommand } from '@/logic/commanding';
import { NextTrickCommand, NextTrickCommand_Name } from '@/logic/commands/next-trick.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class NextTrickCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ NextTrickCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        return this.handleOpen(<NextTrickCommand>command);
    }

    private handleOpen(command: NextTrickCommand): void {
        this._gameState.Game.trickPoints = command.TrickPoints;
        this._gameState.Game.remainingTricks -= 1;
        this._gameState.Game.player2_hasPlayed = false;
        this._gameState.Game.player2_hasPlayed = false;
    }
}