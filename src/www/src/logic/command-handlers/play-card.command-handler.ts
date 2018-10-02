import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import {PlayCardCommand, PlayCardCommandName } from '@/logic/commands/play-card.command';


@injectable()
export class PlayCardCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [PlayCardCommandName]
    
    private readonly _gameState: IGameState;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState) {
        this._gameState = gameState;
    }

    handle(command: ICommand): void {
        this.handle_Command(<PlayCardCommand>command);
    }

    private handle_Command(command: PlayCardCommand): void {
        // const index = this._gameState.Game.player1_cards.findIndex(x => x.value === command.card.value);
        // if (index === -1) {
        //     throw new Error("");
        // }

        //this._gameState.Game.player1_cards.splice(index, 1);
    }
}