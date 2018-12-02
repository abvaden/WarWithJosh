import { Module } from "vuex";
import { getStoreAccessors } from "vuex-typescript";
import { RootState } from './store';

export interface PlayHistory {
    trickNumber: number;
    player1_score: number;
    player2_score: number;
    player1_value: number;
    player2_value: number;
}

export interface ScoreboardState {
    player1_name: string;
    player2_name: string;
    player1_score: number | undefined;
    player2_score: number | undefined;
    playHistory: PlayHistory[];
}

const scoreboard = {
    namespaced: true,
    state: {
        player1_name: "",
        player2_name: "",
        player1_score: undefined,
        player2_score: undefined,
        playHistory: [],
    },
    getters: {
        player1Score(state: ScoreboardState) {
            return state.player1_score;
        },
        player2Score(state: ScoreboardState) {
            return state.player2_score;
        },
        player1Name(state: ScoreboardState) {
            return state.player1_name;
        },
        player2Name(state: ScoreboardState) {
            return state.player2_name;
        },
        playHistory(state: ScoreboardState) {
            return state.playHistory;
        }
    },
    mutations: {
        playerName(state: ScoreboardState, payload: {player1: boolean, name: string}) {
            if (payload.player1) {
                state.player1_name = name;
            } else {
                state.player2_name = name;
            }
        },
        playerScore(state: ScoreboardState, payload: {player1: boolean, score: number | undefined}) {
            if (payload.player1) {
                state.player1_score = payload.score;
            } else {
                state.player2_score = payload.score;
            }
        },
        handCompleted(state: ScoreboardState, payload: PlayHistory) {
            state.playHistory.push(payload);
            state.player1_score = payload.player1_score;
            state.player2_score = payload.player2_score;
        },
        reset(state: ScoreboardState) {
            state.playHistory = [];
            state.player1_name = "";
            state.player2_name = "";
            state.player1_score = undefined;
            state.player2_score = undefined;
        },
    },
};

export const ScoreboardModule: Module<ScoreboardState, RootState> = scoreboard;
const { commit, read, dispatch } = getStoreAccessors<ScoreboardState, RootState>("ScoreboardModule");

// Getters
export const getPlayer1Score = read(scoreboard.getters.player1Score);
export const getPlayer2Score = read(scoreboard.getters.player2Score);
export const getPlayer1Name = read(scoreboard.getters.player1Name);
export const getPlayer2Name = read(scoreboard.getters.player2Name);
export const getPlayHistory = read(scoreboard.getters.playHistory);

// Mutations
export const setPlayerName = commit(scoreboard.mutations.playerName);
export const handCompleted = commit(scoreboard.mutations.handCompleted);
export const setPlayerScore = commit(scoreboard.mutations.playerScore);
export const reset = commit(scoreboard.mutations.reset);