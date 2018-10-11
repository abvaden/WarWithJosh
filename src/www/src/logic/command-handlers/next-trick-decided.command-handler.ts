import { ICommandHandler, ICommand } from '@/logic/commanding';
import { NextTrickCommandDecided, NextTrickCommand_Name } from '@/logic/commands/next-trick-decided.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';

@injectable()
export class NextTrickDecidedCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ NextTrickCommand_Name ];
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        return this.handleOpen(<NextTrickCommandDecided>command);
    }

    private handleOpen(command: NextTrickCommandDecided): void {
        const now = new Date();
        const timeSinceReveal = now.valueOf() - this._gameState.Game.handRevealTime.valueOf()
        if (timeSinceReveal > 1000) {
            this.startNextTrick(command.TrickPoints);
        } else {
            setTimeout(() => {
                this.startNextTrick(command.TrickPoints);
            }, 1000 - timeSinceReveal);
        }
    }

    private startNextTrick(trickPoints: number): void {
        this._gameState.Game.trickPoints = trickPoints;
        this._gameState.Game.remainingTricks -= 1;
        this._gameState.Game.player1_handReady = false;
        this._gameState.Game.player2_handReady = false;
    }
}