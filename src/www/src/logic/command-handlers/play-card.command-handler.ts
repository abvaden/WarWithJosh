import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import {PlayCardCommand, PlayCardCommandName } from '@/logic/commands/play-card.command';
import { IGameService_IOC_Key, IGameService } from '@/logic/services/Interfaces';


@injectable()
export class PlayCardCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [PlayCardCommandName]
    
    private readonly _gameState: IGameState;
    private readonly _gameService: IGameService;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
    @inject(IGameService_IOC_Key)gameService: IGameService) {
        this._gameState = gameState;
        this._gameService = gameService;
    }

    handle(command: ICommand): void {
        this.handle_Command(<PlayCardCommand>command);
    }

    private handle_Command(command: PlayCardCommand): void {
        let cardDeck: Array<INumberOption>;
        if (command.player1){
            cardDeck = this._gameState.Game.player1_cards;
        } else {
            cardDeck = this._gameState.Game.player2_cards;
        }

        const cardIndex = cardDeck.findIndex(x => x.value === command.number);
        const cardOption = cardDeck[cardIndex];
        if (cardOption === undefined) {
            // Card was already disabled and could not be selected
            return;
        } 

        cardOption.disabled = true;
    }
}