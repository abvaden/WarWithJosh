import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, IConnectionService_IOC_Key, IConnectionService, ILogger, ILogger_IOC_Key, TrickResults } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType, IPlayerFactoryInputs, InteractivePlayer } from '@/gops/player';
import { IAPIClient_IOC_KEY, IAPIClient, ISessionMessagePump } from '@/logic/api/api-client';
import { TrickDecidedMessage, AiDecidedMessage, TrickCompletedMessage, ErrorMessage, ResultsMessage, EndSessionMessage } from '../api/WarWithJoshAPIMessages_pb';


@injectable()
export class GameService implements IGameService {
    private readonly _logger: ILogger;
    private readonly _apiClient: IAPIClient;
    private readonly _connectionService: IConnectionService;
    
    private _interactivePlayer: InteractivePlayer | undefined;
    private _session: ISessionMessagePump | undefined;

    constructor(@inject(IConnectionService_IOC_Key)connectionService: IConnectionService,
                @inject(IAPIClient_IOC_KEY) apiClient: IAPIClient,
                @inject(ILogger_IOC_Key)logger: ILogger) {
        this._connectionService = connectionService;
        this._apiClient = apiClient;
        this._logger = logger;
    }

    startGame(handlers: Callbacks, aiType: string): void {
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
        }
        else if (this._session) {
            this._apiClient.SetPlayerDecided(value, this._session);
        } else {
            return;
        }
    }

    endGame(): void {
        this._interactivePlayer = undefined;
        if (this._session !== undefined) {
            this._apiClient.EndSession(this._session);
        }
    }

    async validPlayerTypes(): Promise<string[]> {
        if (this._connectionService.Online()) {
            return this._apiClient.ValidPlayerTypes();
        } else {
            return [
                "Random"
            ];
        }
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
        this._session = messagePump;

        this._apiClient.SetAiType("Random", this._session);
        this._apiClient.StartGame(this._session);

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
                case "web.ResultsMessage": {
                    this.handleGameResultsMessage(ResultsMessage.deserializeBinary(value), handlers);
                    break;
                }
                case "web.EndSessionMessage": {
                    this.handleEndSessionMessage(EndSessionMessage.deserializeBinary(value), handlers);
                    break;
                }
                case "web.ErrorMessage": {
                    const errorMessage = ErrorMessage.deserializeBinary(value);
                    this.handleErrorMessage(errorMessage, handlers);
                    this._apiClient.EndSession(this._session);
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

    private handleGameResultsMessage(message: ResultsMessage, handlers: Callbacks): void {
        if (!handlers.onGameCompleted) {
            return;
        }

        const player1Score = message.getAiscore();
        const player2Score = message.getPlayerscore();
        handlers.onGameCompleted(player1Score, player2Score);
    }

    private handleEndSessionMessage(message: EndSessionMessage, handlers: Callbacks): void {
    }

    private handleErrorMessage(message: ErrorMessage, handlers: Callbacks): void {
        if (!handlers.onError) {
            return;
        }

        const errorMessage = message.getMessage();
        handlers.onError(errorMessage);
    }
}