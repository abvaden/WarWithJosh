import { Module, ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { RootState } from './store';

export interface ITutorialState {
    is_running: boolean,
    stage: "Opponent" | "Player" | "Well-Cards" | "Cumulative-Points" | "End",
}

type TutorialContext = ActionContext<ITutorialState, RootState>;
const defaultState: ITutorialState = {
    is_running: false,
    stage: "Opponent",
};

const tutorialGetters = {
    is_running(state: ITutorialState) {
        return state.is_running;
    },
    stage(state: ITutorialState) {
        return state.stage;
    },
};

const tutorialMutations = {
    is_running(state: ITutorialState, payload: boolean){
        state.is_running = payload;
    },
    stage(state: ITutorialState, payload: "Opponent" | "Player" | "Well-Cards" | "Cumulative-Points" | "End") {
        state.stage = payload;
    },
};

const tutorialActions = {
    advance_tutorial(context: TutorialContext) {
        switch (context.state.stage) {
            case ("Well-Cards"): {
                set_stage(context, "Opponent");
                break;
            }
            case("Opponent"): {
                set_stage(context, "Player");
                break;
            }
            case ("Player"): {
                set_stage(context, "Cumulative-Points");
                break;
            }
            case("Cumulative-Points"): {
                set_isRunning(context, false);
                set_stage(context, "End");
                break;
            }
            case("End"): {
                break;
            }
        }
    },
    start_tutorial(context: TutorialContext) {
        set_stage(context, "Well-Cards");
        set_isRunning(context, true);
    },
    end_tutorial(context: TutorialContext) {
        set_stage(context, "End");
        set_isRunning(context, false);
    }
}

const tutorial =  {
    namespaced: true,
    state: defaultState,
    getters: tutorialGetters,
    mutations: tutorialMutations,
    actions: tutorialActions
};
export const TutorialModule: Module<ITutorialState, RootState> = tutorial;

const { commit, read, dispatch } = getStoreAccessors<ITutorialState, RootState>("Game/TutorialModule");

// Getters
export const is_running = read(tutorial.getters.is_running);
export const stage = read(tutorial.getters.stage);

// Mutations
export const set_isRunning = commit(tutorial.mutations.is_running);
export const set_stage = commit(tutorial.mutations.stage);

// Actions
export const startTutorial = dispatch(tutorial.actions.start_tutorial);
export const advance_tutorial = dispatch(tutorial.actions.advance_tutorial);