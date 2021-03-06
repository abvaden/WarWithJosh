import { injectable, inject } from 'inversify';
import { IGameService } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType } from '@/gops/player';
import { ICommandPublisher, ICommand, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { NextTrickCommandDecided } from '@/logic/commands/next-trick-decided.command';
import { RecordTrickScoreCommand } from '@/logic/commands/record-trick-score.command';
import { PlayCardCommand } from '@/logic/commands/play-card.command';
import { PlayerDecidedCommand } from '@/logic/commands/player-decided.command';
import { RevealHandCommand } from '../commands/reveal-hand.command';
import { RevealWinnerCommand } from '../commands/reveal-winner.command';


@injectable()
export class GameService implements IGameService {
    private _interactivePlayerDecideMove: ((x: number) => void) | undefined;
    private _gameActive: boolean = false;
    private _trickNumber: number = 0;
    private readonly _commandPublisher: ICommandPublisher;

    constructor(@inject(ICommandPublisher_IOC_Key)commandPublisher: ICommandPublisher) {
        this._commandPublisher = commandPublisher;
    }

    createPlayer(): void {

    }

    interactivePlayerDecideMove(value: number): void {
        if (!this._interactivePlayerDecideMove) {
            throw new Error("");
        }

        this._interactivePlayerDecideMove(value);
    }

    async startGame(onGameCompleted: (p1: number, p2: number) => void): Promise<void> {
        const player1 = await playerFactory({
            PlayerType: PlayerType.Random,
            Callbacks: {
                afterMove: (value: number) => {
                    this.afterPlayerDecided(true, value);
                }
            }
        });
        const player2Params = {
            PlayerType: PlayerType.CallbackPlayer,
            nextMoveCallback: this._interactivePlayerDecideMove,
            Callbacks: {
                afterMove: (value: number) => {
                }
            }
        };
        const player2 = await playerFactory(player2Params);
        this._interactivePlayerDecideMove = player2Params.nextMoveCallback;
        const gameInputs: IGameFactoryInputs = {
            player1: player1,
            player2: player2,

            callbacks: {
                afterPointsDecided: (x) => { 
                    // call a function that is scoped on the class so that 
                    this.trickPointsDecided(x); 
                },
                afterTrickFinished: (w, x, y, z) => {
                    this.trickCompleted(w, x, y, z);
                }
            }
        }

        const internalGame = await gameFactory(gameInputs);

        const gameResults = await internalGame();
        onGameCompleted(gameResults.player1, gameResults.player2);
    }

    async stopGame(): Promise<void> {

    }

    private trickPointsDecided(value: number) {
        const nextTrickCommand = new NextTrickCommandDecided();
        nextTrickCommand.TrickPoints = value;
        this._commandPublisher.publish(nextTrickCommand);
    }

    private trickCompleted(
        player1Value: number, 
        player2Value: number,
        player1Score: number,
        player2Score: number): void {

        const player1PlayCardCommand = new PlayCardCommand();
        player1PlayCardCommand.player1 = true;
        player1PlayCardCommand.number = player1Value;

        const player2PlayCardCommand = new PlayCardCommand();
        player2PlayCardCommand.player1 = false;
        player2PlayCardCommand.number = player2Value;

        this._commandPublisher.publish(player1PlayCardCommand);
        this._commandPublisher.publish(player2PlayCardCommand);

        this._trickNumber += 1;
        const revealHandCommand = new RevealHandCommand();
        revealHandCommand.Player1_Value = player1Value;
        revealHandCommand.Player2_Value = player2Value;
        this._commandPublisher.publish(revealHandCommand);


        const recordScoreCommand = new RecordTrickScoreCommand();
        recordScoreCommand.trickNumber = this._trickNumber;
        recordScoreCommand.player1_score = player1Score;
        recordScoreCommand.player2_score = player2Score;
        recordScoreCommand.player1_value = player1Value;
        recordScoreCommand.player2_value = player2Value;
        this._commandPublisher.publish(recordScoreCommand);
    }

    private afterPlayerDecided(player1: boolean, value: number): void {
        const playerDecidedCommand = new PlayerDecidedCommand();
        playerDecidedCommand.Player1 = player1;
        playerDecidedCommand.Value = value;

        this._commandPublisher.publish(playerDecidedCommand);
    }
}