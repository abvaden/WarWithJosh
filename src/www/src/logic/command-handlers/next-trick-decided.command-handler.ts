import { ICommandHandler, ICommand } from '@/logic/commanding';
import { NextTrickCommandDecided, NextTrickCommand_Name } from '@/logic/commands/next-trick-decided.command';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { RevealHandCommandName, RevealHandCommand } from '../commands/reveal-hand.command';
import { PlayerDecidedCommand_Name, PlayerDecidedCommand } from '../commands/player-decided.command';

@injectable()
export class NextTrickDecidedCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ NextTrickCommand_Name, PlayerDecidedCommand_Name ];
    

    private _player1_ready: boolean = false;
    private _player2_ready: boolean = false;

    private readonly _revealTimeout = 2000;
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    public handle(command: ICommand): void {
        if (command.CommandName === NextTrickCommand_Name) {
            return this.handleOpen(<NextTrickCommandDecided>command);
        } else {
            return this.handleReveal(<PlayerDecidedCommand>command);
        }
        
    }

    private handleOpen(command: NextTrickCommandDecided): void {
        const now = new Date();
        const timeSinceReveal = now.valueOf() - this._gameState.Game.handRevealTime.valueOf();
        this._player1_ready = false;
        this._player2_ready = false;
        if (timeSinceReveal > this._revealTimeout) {
            this.startNextTrick(command.TrickPoints);
        } else {
            setTimeout(() => {
                this.startNextTrick(command.TrickPoints);
            }, this._revealTimeout - timeSinceReveal);
        }
    }

    private handleReveal(command: PlayerDecidedCommand): void {
        if (command.Player1) {
            this._player1_ready = true;
        } else {
            this._player2_ready = true;
        }
    }

    private startNextTrick(trickPoints: number): void {
        this._gameState.Game.trickPoints = trickPoints;
        this._gameState.Game.remainingTricks -= 1;
        this._gameState.Game.player1_handReady = this._player1_ready ? true : false;
        this._gameState.Game.player2_handReady = this._player2_ready ? true : false;
        this._gameState.Game.player1_handValue = undefined;
        this._gameState.Game.player2_handValue = undefined;
    }
}