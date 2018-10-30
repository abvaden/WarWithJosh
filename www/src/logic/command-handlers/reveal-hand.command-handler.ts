import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { RevealHandCommand, RevealHandCommandName } from '../commands/reveal-hand.command';

@injectable()
export class RevealHandCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [RevealHandCommandName]
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    handle(command: ICommand): void {
        this.handle_Command(<RevealHandCommand>command);
    }

    private handle_Command(command: RevealHandCommand): void {
        this._gameState.Game.player1_handValue = command.Player1_Value;
        this._gameState.Game.player2_handValue = command.Player2_Value;
        this._gameState.Game.handRevealTime = new Date();
    }
}