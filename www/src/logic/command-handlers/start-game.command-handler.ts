import { ICommandHandler, ICommand, ICommandPublisher_IOC_Key, CommandPublisher, ICommandPublisher } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key, INumberOption } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { StartGameCommand, StartGameCommandName } from '@/logic/commands/start-game.command';
import { IGameService_IOC_Key, IGameService } from '@/logic/services/Interfaces';
import { RevealWinnerCommand } from '../commands/reveal-winner.command';


export function playerCards(): Array<INumberOption> {
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
    private readonly _commandPublisher: ICommandPublisher;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(IGameService_IOC_Key)gameService: IGameService,
                @inject(ICommandPublisher_IOC_Key)commandPublisher: ICommandPublisher) {
        this._gameState = gameState;
        this._gameService = gameService;
        this._commandPublisher = commandPublisher;
    }

    handle(command: ICommand): void {
        this.handle_Command(<StartGameCommand>command);
    }

    private handle_Command(command: StartGameCommand): void {
        this._gameState.Tutorial.is_loading = false;
        this._gameState.Tutorial.is_running = false;
        
        this._gameState.Game.activeGameId = command.GameId;

        this._gameState.Game.trickPoints = 0;
        this._gameState.Game.remainingTricks = 13;

        this._gameState.Game.hasBegun = true;
        this._gameState.Game.player1_name = "Joshua";
        this._gameState.Game.player1_points = 0;
        this._gameState.Game.player1_cards = playerCards();

        this._gameState.Game.player2_name = "You";
        this._gameState.Game.player2_points = 0;
        this._gameState.Game.player2_cards = playerCards();

        this._gameState.Game.play_history = [];


        this._gameService.startGame((player1: number, player2: number) => {
            const showWinnerCommand = new RevealWinnerCommand();
            showWinnerCommand.Player1_Name = this._gameState.Game.player1_name;
            showWinnerCommand.Player2_Name = this._gameState.Game.player2_name;
            showWinnerCommand.Player1_Score = player1;
            showWinnerCommand.Player2_Score = player2;
            this._commandPublisher.publish(showWinnerCommand);
        });
    }
}