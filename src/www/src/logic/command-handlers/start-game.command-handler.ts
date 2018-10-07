import { ICommandHandler, ICommand } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { StartGameCommand, StartGameCommandName } from '@/logic/commands/start-game.command';
import { IGameService_IOC_Key, IGameService } from '@/logic/services/Interfaces';


function playerCards(): Array<INumberOption> {
    const values = new Array<INumberOption>();
    for (let i = 1; i <= 13; i++) {
        const numberOption = {
            value: i,
            text: i.toString(),
            disabled: false
        };
        values.push(numberOption);
    }

    return values;
}

@injectable()
export class StartGameCommandHandler implements ICommandHandler {
    readonly For: Symbol[] = [StartGameCommandName]
    
    private readonly _gameState: IGameState;
    private readonly _gameService: IGameService;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
    @inject(IGameService_IOC_Key)gameService: IGameService) {
        this._gameState = gameState;
        this._gameService = gameService;
    }

    handle(command: ICommand): void {
        this.handle_Command(<StartGameCommand>command);
    }

    private handle_Command(command: StartGameCommand): void {
        this._gameState.Game.hasBegun = true;
        this._gameState.Game.player1_name = "Joshua";
        this._gameState.Game.player1_points = 0;
        this._gameState.Game.player1_cards = playerCards();

        this._gameState.Game.player2_name = "Joe User";
        this._gameState.Game.player2_points = 0;
        this._gameState.Game.player2_cards = playerCards();


        this._gameService.startGame();
    }
}