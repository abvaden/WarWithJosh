import { Module, ActionContext } from "vuex";
import * as GameBoard from './GameBoard.module';
import { GameBoardModule } from "./GameBoard.module";
import * as Dialog from './Dialog.module';
import * as Tutorial from './Tutorial.module';
import * as Scoreboard from './Scoreboard.module';
import { ScoreboardModule } from './Scoreboard.module';
import { IGameService, IGameService_IOC_Key, Callbacks } from '@/logic/services/Interfaces';


import { Container } from 'inversify';
import { UIModule } from '@/Bootstrap';
import { IConnectionService, IConnectionService_IOC_Key } from '../logic/services/Interfaces';
import { getStoreAccessors } from 'vuex-typescript';
import { RootState } from './store';


type GameContext = ActionContext<GameState | any, RootState>;
export interface GameState {
    Container: Container;
    gameService: IGameService,
    afterTrickReveal: (() => void) | undefined,
    afterTrickRevealTimer: number | undefined,
    pendingTrickPoints: undefined | number,
    pendingAiReady: boolean,
    trickRevealAnimationTime: number,
}

export const game = {
    namespaced: true,
    state: () => {
        const container = new Container();
        container.load(UIModule);

        const connectionService = container.get<IConnectionService>(IConnectionService_IOC_Key);
        connectionService.Start();

        return {
            Container: container,
            gameService: container.get<IGameService>(IGameService_IOC_Key),
            afterTrickReveal: undefined,
            afterTrickRevealTimer: undefined,
            pendingTrickPoints: undefined,
            pendingAiReady: false,
            trickRevealAnimationTime: 1250,
        };
    },
    mutations: {
        afterTrickRevealAnimation(state: GameState, payload: {callback: () => void, timer: number | undefined}) {
            state.afterTrickReveal = payload.callback;
            state.afterTrickRevealTimer = payload.timer
        },
        pendingTrickPoints(state: GameState, payload: number | undefined) {
            state.pendingTrickPoints = payload;
        },
        pendingAiReady(state: GameState, payload: boolean) {
            state.pendingAiReady = payload;
        },
    },
    actions: {
        startTutorial(context: GameContext): void {
            Scoreboard.reset(context);

            GameBoard.set_trickPoints(context, 5);
            GameBoard.set_remainingTricks(context, 12);

            GameBoard.resetGame(context);
            GameBoard.set_playerName(context, {player1: true, name: "Joshua"});
            GameBoard.set_playerName(context, {player1: false, name: "Joe User"});
            GameBoard.set_gameBegun(context, true);


            Tutorial.startTutorial(context);
            Scoreboard.setPlayerName(context, {player1: true, name: "Joshua"});
            Scoreboard.setPlayerName(context, {player1: false, name: "Joe User"});
            Scoreboard.setPlayerScore(context, {player1: true, score: 0});
            Scoreboard.setPlayerScore(context, {player1: false, score: 0});

            Dialog.closeActiveDialog(context);
        },
        advanceTutorial(context: GameContext) {
            Tutorial.advance_tutorial(context);
            const stage  = Tutorial.stage(context);
            switch (stage) {
                case ("Opponent"): {
                    break;
                }
                case("Player"): {
                    GameBoard.set_playerReady(context, {player1: true, isReady: true});
                    break;
                }
                case ("Cumulative-Points"): {
                    GameBoard.set_playerReady(context, {player1: true, isReady: true});
                    GameBoard.set_playerReady(context, {player1: true, isReady: true});
    
                    GameBoard.set_playerCardValue(context, {player1: true, value: 3});
                    GameBoard.set_playerCardValue(context, {player1: true, value: 7});

                    Scoreboard.handCompleted(context, {
                        trickNumber: 0,
                        player1_score: 0,
                        player2_score: 5,
                        player1_value: 3,
                        player2_value: 7,
                    });
                    break;
                }
                case("End"): {
                    GameBoard.resetGame(context);
                    Tutorial.set_isRunning(context, false);
                    Scoreboard.reset(context);
                    Dialog.openDialog(context, Dialog.DialogType.Tutorial);
                }
            }
        },
        async startGame(context: GameContext): Promise<void> {
            return new Promise<void>(async (resolve, reject) => {
                Dialog.setLoading(context, true);
                GameBoard.resetGame(context);

                const handlers: Callbacks = {
                    onGameStarted: () => {

                        GameBoard.set_playerName(context, {player1: true, name: "Joshua"});
                        GameBoard.set_playerName(context, {player1: false, name: "Joe User"});
                        Scoreboard.setPlayerName(context, {player1: true, name: "Joshua"});
                        Scoreboard.setPlayerName(context, {player1: false, name: "Joe User"});
                        GameBoard.startGame(context);

                        Dialog.setLoading(context, false);
                        Dialog.closeActiveDialog(context);
                    },
                    onAiDecided: () => {
                        if (context.state.afterTrickReveal) {
                            context.commit('pendingAiReady', true);
                        } else {
                            GameBoard.set_playerReady(context, {player1: true, isReady: true});
                        }
                    },
                    onError: (errorMessage: string) => {
                        Dialog.setErrorMessage(context, errorMessage);
                        Dialog.openDialog(context, Dialog.DialogType.Error)
                        GameBoard.endGame(context);
                        GameBoard.resetGame(context);
                    },
                    onGameCompleted: (player1Score: number, player2Score: number) => {
                        Scoreboard.setPlayerScore(context, { player1: true, score: player1Score});
                        Scoreboard.setPlayerScore(context, { player1: false, score: player2Score});
                        Dialog.setWinnerDetails(context, {
                            player1_name: GameBoard.player1_name(context),
                            player2_name: GameBoard.player2_name(context),
                            player1_score: Scoreboard.getPlayer1Score(context) as number,
                            player2_score: Scoreboard.getPlayer2Score(context) as number,
                        })
                        Dialog.openDialog(context, Dialog.DialogType.Winner);
                    },
                    onTrickCompleted: (results) => {
                        // If we are waiting for the animation to complete from the last time then
                        // "cancel" the animation by eagerly executing the after animation state transition
                        // and canceling the timeout associated with the state transition
                        if (context.state.afterTrickReveal) {
                            clearTimeout(context.state.afterTrickRevealTimer);
                            context.state.afterTrickReveal();
                            context.commit('afterTrickRevealAnimation', {callback: undefined, timer: undefined});
                        }
                        
                        if (!GameBoard.player1_handReady(context)) {
                            GameBoard.set_playerReady(context, {player1: true, isReady: true});
                        }

                        // Reveal the cards that the players used for this hand
                        GameBoard.set_playerCardValue(context, {player1: true, value: results.player1_value});
                        GameBoard.set_playerCardValue(context, {player1: false, value: results.player2_value});

                        // Card reveal is handled through an animation, this timeout ensures that the animation
                        // has completed and that the user can view the results of the trick before clearing the
                        // board of the cards dealt in that trick
                        const afterAnimationCallback = () => {
                            Scoreboard.handCompleted(context, {
                                trickNumber: results.trickNumber,
                                player1_score: results.player1_score,
                                player2_score: results.player2_score,
                                player1_value: results.player1_value,
                                player2_value: results.player2_value,
                            });
                            GameBoard.set_playerReady(context, {player1: true, isReady: false});
                            GameBoard.set_playerReady(context, {player1: false, isReady: false});
                            GameBoard.set_playerCardValue(context, {player1: true, value: undefined});
                            GameBoard.set_playerCardValue(context, {player1: false, value: undefined});
                            GameBoard.set_disablePlayerCard(context, {player1: true, number: results.player1_value});
                            GameBoard.set_disablePlayerCard(context, {player1: false, number: results.player2_value});
                            GameBoard.set_remainingTricks(context, 12 - results.trickNumber);
                            
                            context.commit('afterTrickRevealAnimation', {callback: undefined, timer: undefined});
                            if (context.state.pendingTrickPoints) {
                                GameBoard.set_trickPoints(context, context.state.pendingTrickPoints);
                                context.commit('pendingTrickPoints', undefined);
                            } else {
                                GameBoard.set_trickPoints(context, undefined);
                            }

                            if (context.state.pendingAiReady) {
                                context.commit('pendingAiReady', false);
                                GameBoard.set_playerReady(context, {player1: true, isReady: true});
                            }
                        };
                        const timer = setTimeout(afterAnimationCallback, context.state.trickRevealAnimationTime);
                        context.commit('afterTrickRevealAnimation', {callback: afterAnimationCallback, timer: timer});
                    },
                    onTrickPointsDecided: (points: number) => {
                        if(GameBoard.remainingTricks(context) === 13) {
                            GameBoard.set_remainingTricks(context, 12);
                        }
                        if (context.state.afterTrickReveal) {
                            context.commit('pendingTrickPoints', points);
                        } else {
                            GameBoard.set_trickPoints(context, points);
                        }
                    },
                };


                context.state.gameService.startGame(handlers, "Random");
            });
        },
        playCard(context: GameContext, payload: number): void {
            GameBoard.set_playerReady(context, {player1: false, isReady: true});
            context.state.gameService.interactivePlayerDecideMove(payload);
        },
        endGame(context: GameContext) {
            context.state.gameService.endGame();
            GameBoard.endGame(context);
            
            GameBoard.resetGame(context);

            Dialog.openDialog(context, Dialog.DialogType.Tutorial);
        },
        reset(context: GameContext) {
            GameBoard.resetGame(context);
            Scoreboard.reset(context);
            Dialog.openDialog(context, Dialog.DialogType.Tutorial);
        }
    },
    modules: {
        GameBoardModule,
        ScoreboardModule,
        TutorialModule: Tutorial.TutorialModule,
        DialogModule: Dialog.DialogModule,
    },
};

export const GameModule: Module<GameState, RootState> = game;

const { commit, read, dispatch} = getStoreAccessors<GameState, RootState>("Game");

// Actions
export const startTutorial = dispatch(game.actions.startTutorial);
export const advanceTutorial = dispatch(game.actions.advanceTutorial);
export const startGame = dispatch(game.actions.startGame);
export const playCard = dispatch(game.actions.playCard);
export const endGame = dispatch(game.actions.endGame);
export const reset = dispatch(game.actions.reset);

// Mutations