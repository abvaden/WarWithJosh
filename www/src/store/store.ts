import Vue from 'vue';
import * as Vuex from "vuex";
import * as Game from './Game.module';
import * as Dialog from './Dialog.module';
import * as Tutorial from './Tutorial.module';
import * as Scoreboard from './Scoreboard.module';
import { ScoreboardModule } from './Scoreboard.module';
import { Container } from 'inversify';
import { ITutorialState } from './Tutorial.module';


Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

type RootContext = Vuex.ActionContext<RootState, RootState>;
export interface RootState {
    Container: Container;
    ScoreboardModule: Scoreboard.ScoreboardState;
    GameModule: Game.GameState;
    TutorialModule: Vuex.Module<ITutorialState, RootState>;
}

export const createStore = (container: Container) => {
    const store = new Vuex.Store<RootState>({
    strict: debug,
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
                    Game.set_playerReady(store, {player1: true, is_ready: true});
                    break;
                }
                case ("Cumulative-Points"): {
                    Game.set_playerReady(store, {player1: true, is_ready: true});
                    Game.set_playerReady(store, {player1: true, is_ready: true});
    
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
                }
            }
        },
        startGame(context: RootContext) {
            context.commit("GameModule/start_game");
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