import Vue from 'vue';
import * as Vuex from "vuex";
import * as Game from './Game.module';
import * as Dialog from './Dialog.module';
import * as Tutorial from './Tutorial.module';
import * as Scoreboard from './Scoreboard.module';
import { ScoreboardModule } from './Scoreboard.module';
import { Container } from 'inversify';
import { IGameService, IGameService_IOC_Key, GameStartParams, Callbacks } from '@/logic/services/Interfaces';
import { IGameFactoryInputs } from '@/gops/game';


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

type RootContext = Vuex.ActionContext<RootState, RootState>;
export interface RootState {
    Container: Container;
    afterTrickReveal: (() => void) | undefined,
    afterTrickRevealTimer: number | undefined,
    pendingTrickPoints: undefined | number,
    pendingAiReady: boolean,
    trickRevealAnimationTime: number,
}

export const createStore = (container: Container) => {
    const store = new Vuex.Store<RootState>({
    strict: debug,
    state: {
        Container: container,
        afterTrickReveal: undefined,
        afterTrickRevealTimer: undefined,
        pendingTrickPoints: undefined,
        pendingAiReady: false,
        trickRevealAnimationTime: 1250,
    },
    mutations: {
        afterTrickRevealAnimation(state: RootState, payload: {callback: () => void, timer: number | undefined}) {
            state.afterTrickReveal = payload.callback;
            state.afterTrickRevealTimer = payload.timer
        },
        pendingTrickPoints(state: RootState, payload: number | undefined) {
            state.pendingTrickPoints = payload;
        },
        pendingAiReady(state: RootState, payload: boolean) {
            state.pendingAiReady = payload;
        },
    },
    actions: {
        startTutorial(context: RootContext): void {
            Scoreboard.reset(store);

            Game.set_trickPoints(store, 5);
            Game.set_remainingTricks(store, 12);

            Game.resetGame(store);
            Game.set_playerName(store, {player1: true, name: "Joshua"});
            Game.set_playerName(store, {player1: false, name: "Joe User"});
            Game.set_gameBegun(store, true);


            Tutorial.startTutorial(store);
            Scoreboard.setPlayerName(store, {player1: true, name: "Joshua"});
            Scoreboard.setPlayerName(store, {player1: false, name: "Joe User"});
            Scoreboard.setPlayerScore(store, {player1: true, score: 0});
            Scoreboard.setPlayerScore(store, {player1: false, score: 0});

            Dialog.closeActiveDialog(store);
        },
        advanceTutorial(context: RootContext) {
            Tutorial.advance_tutorial(store);
            const stage  = Tutorial.stage(store);
            switch (stage) {
                case ("Opponent"): {
                    break;
                }
                case("Player"): {
                    Game.set_playerReady(store, {player1: true, isReady: true});
                    break;
                }
                case ("Cumulative-Points"): {
                    Game.set_playerReady(store, {player1: true, isReady: true});
                    Game.set_playerReady(store, {player1: true, isReady: true});
    
                    Game.set_playerCardValue(store, {player1: true, value: 3});
                    Game.set_playerCardValue(store, {player1: true, value: 7});

                    Scoreboard.handCompleted(store, {
                        trickNumber: 0,
                        player1_score: 0,
                        player2_score: 5,
                        player1_value: 3,
                        player2_value: 7,
                    });
                    break;
                }
                case("End"): {
                    Game.resetGame(store);
                    Tutorial.set_isRunning(store, false);
                    Scoreboard.reset(store);
                    Dialog.openDialog(store, Dialog.DialogType.Tutorial);
                }
            }
        },
        async startGame(context: RootContext): Promise<void> {
            return new Promise<void>(async (resolve, reject) => {
                const gameService = container.get<IGameService>(IGameService_IOC_Key);

                Dialog.setLoading(store, true);
                Game.resetGame(store);

                const startGameParams: GameStartParams = {
                    offline: true,
                };
                const handlers: Callbacks = {
                    onGameStarted: (gameId) => {
                        Game.set_gameId(store, gameId);

                        Game.set_playerName(store, {player1: true, name: "Joshua"});
                        Game.set_playerName(store, {player1: false, name: "Joe User"});
                        Scoreboard.setPlayerName(store, {player1: true, name: "Joshua"});
                        Scoreboard.setPlayerName(store, {player1: false, name: "Joe User"});
                        Game.startGame(store);

                        Dialog.setLoading(store, false);
                        Dialog.closeActiveDialog(store);
                    },
                    onAiDecided: (value: number) => {
                        if (context.state.afterTrickReveal) {
                            context.commit('pendingAiReady', true);
                        } else {
                            Game.set_playerReady(store, {player1: true, isReady: true});
                        }
                    },
                    onError: (errorMessage) => {

                    },
                    onGameCompleted: (player1Score: number, player2Score: number) => {
                        Scoreboard.setPlayerScore(store, { player1: true, score: player1Score});
                        Scoreboard.setPlayerScore(store, { player1: false, score: player2Score});
                        Dialog.setWinnerDetails(store, {
                            player1_name: Game.player1_name(store),
                            player2_name: Game.player2_name(store),
                            player1_score: Scoreboard.getPlayer1Score(store) as number,
                            player2_score: Scoreboard.getPlayer2Score(store) as number,
                        })
                        Dialog.openDialog(store, Dialog.DialogType.Winner);
                    },
                    onTrickCompleted: (results) => {
                        // If we are waiting for the animation to complete from the last time then
                        // "cancel" the animation by eagerly executing the after animation state transition
                        // and canceling the timeout associated with the state transition
                        if (context.state.afterTrickReveal) {
                            clearTimeout(context.state.afterTrickRevealTimer);
                            context.state.afterTrickReveal();
                            store.commit('afterTrickRevealAnimation', {callback: undefined, timer: undefined});
                        }
                        
                        if (!Game.player1_handReady(store)) {
                            Game.set_playerReady(store, {player1: true, isReady: true});
                        }

                        // Reveal the cards that the players used for this hand
                        Game.set_playerCardValue(store, {player1: true, value: results.player1_value});
                        Game.set_playerCardValue(store, {player1: false, value: results.player2_value});

                        // Card reveal is handled through an animation, this timeout ensures that the animation
                        // has completed and that the user can view the results of the trick before clearing the
                        // board of the cards dealt in that trick
                        const afterAnimationCallback = () => {
                            Scoreboard.handCompleted(store, {
                                trickNumber: results.trickNumber,
                                player1_score: results.player1_score,
                                player2_score: results.player2_score,
                                player1_value: results.player1_value,
                                player2_value: results.player2_value,
                            });
                            Game.set_playerReady(store, {player1: true, isReady: false});
                            Game.set_playerReady(store, {player1: false, isReady: false});
                            Game.set_playerCardValue(store, {player1: true, value: undefined});
                            Game.set_playerCardValue(store, {player1: false, value: undefined});
                            Game.set_disablePlayerCard(store, {player1: true, number: results.player1_value});
                            Game.set_disablePlayerCard(store, {player1: false, number: results.player2_value});
                            Game.set_remainingTricks(store, 12 - results.trickNumber);
                            
                            store.commit('afterTrickRevealAnimation', {callback: undefined, timer: undefined});
                            if (context.state.pendingTrickPoints) {
                                Game.set_trickPoints(store, context.state.pendingTrickPoints);
                                store.commit('pendingTrickPoints', undefined);
                            } else {
                                Game.set_trickPoints(store, undefined);
                            }

                            if (context.state.pendingAiReady) {
                                store.commit('pendingAiReady', false);
                                Game.set_playerReady(store, {player1: true, isReady: true});
                            }
                        };
                        const timer = setTimeout(afterAnimationCallback, context.state.trickRevealAnimationTime);
                        store.commit('afterTrickRevealAnimation', {callback: afterAnimationCallback, timer: timer});
                    },
                    onTrickPointsDecided: (points: number) => {
                        if(Game.remainingTricks(store) === 13) {
                            Game.set_remainingTricks(store, 12);
                        }
                        if (context.state.afterTrickReveal) {
                            context.commit('pendingTrickPoints', points);
                        } else {
                            Game.set_trickPoints(store, points);
                        }
                    },
                };


                gameService.startGame(handlers, startGameParams);
            });
        },
        playCard(context: RootContext, payload: number): void {
            Game.set_playerReady(store, {player1: false, isReady: true});
            const gameService = container.get<IGameService>(IGameService_IOC_Key);
            gameService.interactivePlayerDecideMove(payload);
        },
        endGame(context: RootContext) {
            Game.endGame(store);
            
            Game.resetGame(store);

            Dialog.openDialog(store, Dialog.DialogType.Tutorial);
        },
        reset(context: RootContext) {
            Game.resetGame(store);
            Scoreboard.reset(store);
            Dialog.openDialog(store, Dialog.DialogType.Tutorial);
        }
    },
    modules: {
        GameModule: Game.GameModuleFactory(container),
        ScoreboardModule,
        TutorialModule: Tutorial.TutorialModule,
        DialogModule: Dialog.DialogModule,
    },
});
return store;
}