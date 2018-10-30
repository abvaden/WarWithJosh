import { ICommandHandler, ICommand, ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { inject, injectable } from 'inversify';
import { AdvanceTutorialCommand, AdvanceTutorialCommand_Name } from '../commands/advance-tutorial.command';
import { ToggleDialogCommand } from '../commands/toggle-dialog.command';
import { ResetGameCommand } from '../commands/reset-game.command';

@injectable()
export class AdvanceTutorialCommandHandler implements ICommandHandler {
    public readonly For: Symbol[] = [ AdvanceTutorialCommand_Name ];
    
    private readonly _gameState: IGameState;
    private readonly _commandPublisher: ICommandPublisher;

    constructor(@inject(GameState_IOC_Key)gameState: IGameState,
                @inject(ICommandPublisher_IOC_Key)commandPublisher: ICommandPublisher) {
        this._gameState = gameState;
        this._commandPublisher = commandPublisher;
    }

    public handle(command: ICommand): void {
        this.handleCommand(<AdvanceTutorialCommand>command);
    }

    private handleCommand(command: AdvanceTutorialCommand): void {
        switch (this._gameState.Tutorial.stage) {
            case ("Well-Cards"): {
                this._gameState.Tutorial.stage = "Opponent";
                break;
            }
            case("Opponent"): {
                this._gameState.Game.player1_handReady = true;
                this._gameState.Tutorial.stage = "Player";
                break;
            }
            case ("Player"): {
                this._gameState.Game.player1_handReady = true;
                this._gameState.Game.player2_handReady = true;

                this._gameState.Game.player1_handValue = 3;
                this._gameState.Game.player2_handValue = 7;

                this._gameState.Game.play_history.push({
                    trickNumber: 0,
                    trickPoints: 5,
                    player1_number: 3,
                    player2_number: 7,
                    player1_points: undefined,
                    player2_points: 5
                });
                this._gameState.Game.player2_points = 5;

                this._gameState.Tutorial.stage = "Cumulative-Points";
                break;
            }
            case("Cumulative-Points"): {
                this._gameState.Tutorial.is_running = false;

                const showTutorialDialogCommand = new ToggleDialogCommand();
                showTutorialDialogCommand.open = true;
                showTutorialDialogCommand.tutorialDialog = true;

                const resetGameCommand = new ResetGameCommand();
                this._commandPublisher.publish(resetGameCommand);
                this._commandPublisher.publish(showTutorialDialogCommand);
                break;
            }
        }
    }
}