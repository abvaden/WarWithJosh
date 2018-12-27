import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, IConnectionService_IOC_Key, IConnectionService, ILogger, ILogger_IOC_Key, TrickResults } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType, IPlayerFactoryInputs, InteractivePlayer } from '@/gops/player';
import { IAPIClient_IOC_KEY, IAPIClient, ISessionMessagePump } from '@/logic/api/api-client';
import { Wrapper, SetAiMessage, StartGameMessage, TrickDecidedMessage, AiDecidedMessage, PlayerDecidedMessage, TrickCompletedMessage, ErrorMessage } from '../api/WarWithJoshAPIMessages_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import * as jspb from "google-protobuf";


@injectable()
export class GameService implements IGameService {
    private readonly _logger: ILogger;
    private readonly _apiClient: IAPIClient;
    private readonly _connectionService: IConnectionService;
    
    private _interactivePlayer: InteractivePlayer | undefined;
    private _messagePump: ISessionMessagePump | undefined;

    constructor(@inject(IConnectionService_IOC_Key)connectionService: IConnectionService,
                @inject(IAPIClient_IOC_KEY) apiClient: IAPIClient,
                @inject(ILogger_IOC_Key)logger: ILogger) {
        this._connectionService = connectionService;
        this._apiClient = apiClient;
        this._logger = logger;
    }

    startGame(handlers: Callbacks): void {
        var isOnline = this._connectionService.Online();
        if (isOnline) {
            this.startOnlineGame(handlers)
        } else {
            this.startOfflineGame(handlers);
        }
    }

    interactivePlayerDecideMove(value: number): void {
        if (this._interactivePlayer) {
            this._interactivePlayer.decideNextMove(value);
            return;
        }
        else if (this._messagePump) {
            const playerDecidedMessage = new PlayerDecidedMessage();
            playerDecidedMessage.setValue(value);
            this._messagePump.send(playerDecidedMessage, "web.PlayerDecidedMessage");
        } else {
            return;
        }
    }

    endGame(): void {
        this._interactivePlayer = undefined;
        throw new Error("Method not implemented.");
    }

    async validPlayerTypes(): Promise<string[]> {
        throw new Error("Not implemented");
    }

    private async startOfflineGame(handlers: Callbacks): Promise<void> {
        const player1 = await playerFactory({
            PlayerType: PlayerType.Random,
            Callbacks: {
                afterMove: (value: number) => {
                    if (handlers.onAiDecided) {
                        handlers.onAiDecided();
                    }
                }
            }
        });

        const player2Params: IPlayerFactoryInputs = {
            PlayerType: PlayerType.CallbackPlayer,
            nextMoveCallback: () => {},
            Callbacks: {
                afterMove: (value: number) => {
                }
            }
        };
        const player2 = await playerFactory<InteractivePlayer>(player2Params);
        this._interactivePlayer = player2;

        const gameInputs: IGameFactoryInputs = {
            player1: player1,
            player2: player2,

            callbacks: {
                afterPointsDecided: (x) => { 
                    if (handlers.onTrickPointsDecided) {
                        handlers.onTrickPointsDecided(x);
                    }
                },
                afterTrickFinished: (trickNumber, trickPoints, player1Value, player2Value, player1Score, player2Score) => {
                    if (handlers.onTrickCompleted) {
                        handlers.onTrickCompleted({
                            trickNumber: trickNumber,
                            trickPoints: trickPoints,
                            player1_value: player1Value,
                            player1_score: player1Score,
                            player2_value: player2Value,
                            player2_score: player2Score 
                        })
                    }
                }
            }
        }

        const internalGame = await gameFactory(gameInputs);
        if (handlers.onGameStarted) {
            handlers.onGameStarted();
        }
        
        const gameResults = await internalGame();
        if (handlers.onGameCompleted) {
            handlers.onGameCompleted(gameResults.player1, gameResults.player2);
        }
    }

    private async startOnlineGame(handlers: Callbacks): Promise<void> {
        const messagePump = await this._apiClient.StartNewSession();
        this._messagePump = messagePump;

        const setAiMessage = new SetAiMessage();
        setAiMessage.setAiname("Random")
        messagePump.send(setAiMessage, "web.SetAiMessage");
        

        const startGameMessage = new StartGameMessage();
        messagePump.send(startGameMessage, "web.StartGameMessage");

        if (handlers.onGameStarted) {
            handlers.onGameStarted();
        }


        let loop = true;
        while (loop) {
            const message = await messagePump.nextMessage();
            const payload = message.getPayload();
            if (!payload) {
                loop = false;
                if (handlers.onError) {
                    handlers.onError("Error while communicating with the server");
                }
                messagePump.close();
                break;
            }
            console.log(payload.getTypeName());

            const value = payload.getValue() as Uint8Array;
            switch (payload.getTypeName()){
                case "web.TrickDecidedMessage": {
                    this.handleTrickDecidedMessage(TrickDecidedMessage.deserializeBinary(value), handlers);
                    break;
                }
                case "web.AiDecidedMessage": {
                    this.handleAIDecidedMessage(AiDecidedMessage.deserializeBinary(value), handlers);
                    break;
                }
                case "web.TrickCompletedMessage": {
                    this.handleTrickCompletedMessage(TrickCompletedMessage.deserializeBinary(value), handlers);
                    break;
                }
                case "web.ErrorMessage": {
                    const errorMessage = ErrorMessage.deserializeBinary(value);
                    // when we get an error message we should end the game because the game is likely in a bad state
                    break;
                }
            }
        }
    }

    private handleTrickDecidedMessage(message: TrickDecidedMessage, handlers: Callbacks): void {
        if (!handlers.onTrickPointsDecided) {
            return;
        }
        handlers.onTrickPointsDecided(message.getTrickpoints());
    }

    private handleAIDecidedMessage(message: AiDecidedMessage, handlers: Callbacks): void {
        if (!handlers.onAiDecided) {
            return;
        }
        handlers.onAiDecided();
    }

    private handleTrickCompletedMessage(message: TrickCompletedMessage, handlers: Callbacks): void {
        if (!handlers.onTrickCompleted) {
            return;
        }
        const move = message.getMove();
        if (!move) {
            // Should do some kind of error here
            return 
        }
        const trickResults: TrickResults = {
            player1_value: move.getAibid(),
            player2_value: move.getPlayerbid(),
            trickPoints: move.getHandvalue(),
            player1_score: move.getAiscore(),
            player2_score: move.getPlayerscore(),
            trickNumber: 13 - message.getTricksremaining()
        }
        handlers.onTrickCompleted(trickResults);
    }
}