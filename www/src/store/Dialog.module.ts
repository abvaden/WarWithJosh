import { Module, ActionContext } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { RootState } from "./store";

interface IDialogState {
    winnerDialogOpen: boolean;
    errorOpen: boolean;
    tutorialOpen: boolean;
    error: {
        message: string;
    };
    tutorial: {
        loading: boolean;
    };
}
export enum DialogType {
    Winner,
    Error,
    Tutorial
};

type DialogContext = ActionContext<IDialogState, RootState>;
const dialog = {
    namespaced: true,
    state: {
        winnerDialogOpen: false,
        errorOpen: false,
        tutorialOpen: true,
        error: {
            message: ""
        },
        tutorial: {
            loading: false,
        },
    },
    getters: {
        winnerDialogOpen(state: IDialogState) {
            return state.winnerDialogOpen;
        },
        errorDialogOpen(state: IDialogState) {
            return state.errorOpen;
        },
        tutorialDialogOpen(state: IDialogState) {
            return state.tutorialOpen;
        },
        errorMessage(state: IDialogState) {
            return state.error.message;
        },
        loading(state: IDialogState) {
            return state.tutorial.loading;
        },
    },
    mutations: {
        setDialogOpen(state: IDialogState, payload: {dialog: DialogType, isOpen: boolean}) {
            if (payload.dialog === DialogType.Error) {
                state.errorOpen = payload.isOpen;
            } else if (payload.dialog === DialogType.Winner) {
                state.winnerDialogOpen = payload.isOpen;
            } else {
                state.tutorialOpen = payload.isOpen;
            }
        },
    },
    actions: {
        closeActiveDialog(context: DialogContext) {
            let dialogType: DialogType;
            if (context.state.errorOpen) {
                dialogType = DialogType.Error;
            } else if (context.state.tutorialOpen) {
                dialogType = DialogType.Tutorial;
            } else {
                dialogType = DialogType.Winner;
            }
            setDialogOpen(context, {dialog: dialogType, isOpen:false});
        },
        openDialog(context: DialogContext, payload: DialogType) {
            if (context.state.errorOpen || context.state.tutorialOpen || context.state.winnerDialogOpen) {
                closeActiveDialog(context);
            }
    
            setDialogOpen(context, {dialog: payload, isOpen: true});
        }
    }
};


export const DialogModule: Module<IDialogState, RootState> = dialog;

const { commit, read, dispatch } = getStoreAccessors<IDialogState, RootState>("DialogModule");

// Getters
export const winnerDialogOpen = read(dialog.getters.winnerDialogOpen);
export const errorDialogOpen = read(dialog.getters.errorDialogOpen);
export const tutorialDialogOpen = read(dialog.getters.tutorialDialogOpen);
export const errorMessage = read(dialog.getters.errorMessage);
export const loading =  read(dialog.getters.loading);


// Mutations
const setDialogOpen = commit(dialog.mutations.setDialogOpen);

// Actions
export const closeActiveDialog = dispatch(dialog.actions.closeActiveDialog);
export const openDialog = dispatch(dialog.actions.openDialog);