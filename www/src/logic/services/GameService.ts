import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, IConnectionService_IOC_Key, IConnectionService, ILogger, ILogger_IOC_Key, TrickResults } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType, IPlayerFactoryInputs, InteractivePlayer } from '@/gops/player';
import { IAPIClient_IOC_KEY, IAPIClient, ISessionMessagePump } from '@/logic/api/api-client';
import { web } from "../api/WarWithJoshMessages";


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
            const payload = message.payload;
            if (!payload) {
                loop = false;
                if (handlers.onError) {
                    handlers.onError("Error while communicating with the server");
                }
                messagePump.close();
                break;
            }

            const value = payload.value as Uint8Array;
            if ((value === null) || (value === undefined)) {
                continue;
            }
            const typeUrl = payload.type_url ? payload.type_url.replace("type.googleapis.com/", "") : "";
            switch (typeUrl) {
                case "web.TrickDecidedMessage": {
                    this.handleTrickDecidedMessage(web.TrickDecidedMessage.decode(value), handlers);
                    break;
                }
                case "web.AiDecidedMessage": {
                    this.handleAIDecidedMessage(web.AiDecidedMessage.decode(value), handlers);
                    break;
                }
                case "web.TrickCompletedMessage": {
                    this.handleTrickCompletedMessage(web.TrickCompletedMessage.decode(value), handlers);
                    break;
                }
                case "web.ResultsMessage": {
                    this.handleGameResultsMessage(web.ResultsMessage.decode(value), handlers);
                    break;
                }
                case "web.EndSessionMessage": {
                    this.handleEndSessionMessage(web.EndSessionMessage.decode(value), handlers);
                    break;
                }
                case "web.ErrorMessage": {
                    const errorMessage = web.ErrorMessage.decode(value);
                    this.handleErrorMessage(errorMessage, handlers);
                    this._apiClient.EndSession(this._session);
                    break;
                }
            }
        }
    }

    private handleTrickDecidedMessage(message: web.TrickDecidedMessage, handlers: Callbacks): void {
        if (!handlers.onTrickPointsDecided) {
            return;
        }
        handlers.onTrickPointsDecided(message.TrickPoints);
    }

    private handleAIDecidedMessage(message: web.AiDecidedMessage, handlers: Callbacks): void {
        if (!handlers.onAiDecided) {
            return;
        }
        handlers.onAiDecided();
    }

    private handleTrickCompletedMessage(message: web.TrickCompletedMessage, handlers: Callbacks): void {
        if (!handlers.onTrickCompleted) {
            return;
        }
        const move = message.Move;
        if (!move) {
            // Should do some kind of error here
            return 
        }
        const trickResults: TrickResults = {
            player1_value: move.AiBid ? move.AiBid : 0,
            player2_value: move.PlayerBid ? move.PlayerBid : 0,
            trickPoints: move.HandValue ? move.HandValue : 0,
            player1_score: move.AiScore ? move.AiScore : 0,
            player2_score: move.PlayerScore ? move.PlayerScore : 0,
            trickNumber: 13 - message.TricksRemaining
        }
        handlers.onTrickCompleted(trickResults);
    }

    private handleGameResultsMessage(message: web.ResultsMessage, handlers: Callbacks): void {
        if (!handlers.onGameCompleted) {
            return;
        }

        const player1Score = message.AiScore;
        const player2Score = message.PlayerScore;
        handlers.onGameCompleted(player1Score, player2Score);
    }

    private handleEndSessionMessage(message: web.EndSessionMessage, handlers: Callbacks): void {
    }

    private handleErrorMessage(message: web.ErrorMessage, handlers: Callbacks): void {
        if (!handlers.onError) {
            return;
        }

        const errorMessage = message.Message;
        handlers.onError(errorMessage);
    }
}