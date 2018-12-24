import { injectable, inject } from 'inversify';
import { IGameService, Callbacks, GameStartParams, IConnectionService_IOC_Key, IConnectionService, ILogger, ILogger_IOC_Key } from '@/logic/services/Interfaces';
import { gameFactory, IGameFactoryInputs } from "../../gops/game";
import { playerFactory, PlayerType, IPlayerFactoryInputs, InteractivePlayer } from '@/gops/player';
import { IAPIClient_IOC_KEY, IAPIClient } from '@/api-client';
import { Wrapper, SetAiMessage, StartGameMessage } from '../api/WarWithJoshAPIMessages_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';


@injectable()
export class GameService implements IGameService {
    private readonly _logger: ILogger;
    private readonly _apiClient: IAPIClient;
    private readonly _connectionService: IConnectionService;
    
    private _interactivePlayer: InteractivePlayer | undefined;

    constructor(@inject(IConnectionService_IOC_Key)connectionService: IConnectionService,
                @inject(IAPIClient_IOC_KEY) apiClient: IAPIClient,
                @inject(ILogger_IOC_Key)logger: ILogger) {
        this._connectionService = connectionService;
        this._apiClient = apiClient;
        this._logger = logger;
    }

    startGame(handlers: Callbacks, params: GameStartParams): void {
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
                        handlers.onAiDecided(value);
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
            handlers.onGameStarted("offline");
        }
        
        const gameResults = await internalGame();
        if (handlers.onGameCompleted) {
            handlers.onGameCompleted(gameResults.player1, gameResults.player2);
        }
    }

    private async startOnlineGame(handlers: Callbacks): Promise<void> {
        const messagePump = await this._apiClient.StartNewSession();

        const setAiMessage = new SetAiMessage();
        setAiMessage.setAiname("Random")
        const any = new Any();
        any.setTypeUrl("web.SetAiMessage");
        any.setValue(setAiMessage.serializeBinary())

        const wrapper = new Wrapper();
        wrapper.setPayload(any);

        const startGameMessage = new StartGameMessage();
        const any2 = new Any();
        any2.setTypeUrl("web.StartGameMessage")
        any2.setValue(startGameMessage.serializeBinary());
        const wrapper2 = new Wrapper();
        wrapper.setPayload(any2);

        messagePump.send(wrapper2);
    }
}