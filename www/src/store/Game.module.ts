import { ActionContext } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { Container } from 'inversify';

import { RootState } from './store';
import { IGameService, IGameService_IOC_Key } from '@/logic/services/Interfaces';


export interface INumberOption {
    value: number;
    text: string;
    disabled: boolean;
}

export interface GameState {
    player1_name: string,
    player1_ready: boolean,
    player1_points: number | undefined,
    player1_handValue: number | undefined,
    player1_cards: Array<INumberOption>,
    player1_handReady: boolean,

    player2_name: string,
    player2_ready: boolean,
    player2_handReady: boolean,
    player2_handValue: number | undefined,
    player2_points: number | undefined,
    player2_cards: Array<INumberOption>,

    handRevealTime: Date,
    
    game_loading: boolean,
    trickPoints: number | undefined,
    remainingTricks: number,
    hasBegun: boolean,
}

interface IMultiPlayerInterface {
    player1: boolean;
}

interface SetPlayerHandValuePayload extends IMultiPlayerInterface {
    value: number | undefined;
}
interface SetPlayerReadyPayload extends IMultiPlayerInterface {
    isReady: boolean;
}
interface PlayCardPayload extends IMultiPlayerInterface {
    number: number;
}
interface PlayerDecidedPayload extends IMultiPlayerInterface {
    Value: number | undefined;
}

function makeFreshCards(): INumberOption[] {
    const cards = [];
    for  (let i = 1; i <= 13; i++) {
        cards.push({
            value: i,
            text: i.toString(),
            disabled: false,
        });
    }
    return cards;
}

type GameContext = ActionContext<GameState, RootState>;
const gameFactory = (container: Container, bootstrap: boolean = false) => {
    let gameService: IGameService;
    if (!bootstrap) {
        gameService = container.get<IGameService>(IGameService_IOC_Key);
    }
    const game = {
        namespaced: true,
        state: {
            player1_name: "",
            player1_ready: false,
            player1_points: undefined,
            player1_handValue: undefined,
            player1_cards: makeFreshCards(),
            player1_handReady: false,

            player2_name: "",
            player2_ready: false,
            player2_handReady: false,
            player2_handValue: undefined,
            player2_points: undefined,
            player2_cards: makeFreshCards(),
            
            activeGameId: undefined,
            game_loading: false,
            trickPoints: undefined,
            remainingTricks: 0,
            hasBegun: false,
        },
        getters: {
            player1_name(state: GameState) {
                return state.player1_name;
            },
            player1_points(state: GameState) {
                return state.player1_points;
            },
            player1_handValue(state: GameState) {
                return state.player1_handValue;
            },
            player1_cards(state: GameState) {
                return state.player1_cards;
            },
            player1_handReady(state: GameState) {
                return state.player1_handReady;
            },
            player2_name(state: GameState) {
                return state.player2_name;
            },
            player2_points(state: GameState) {
                return state.player2_points;
            },
            player2_handValue(state: GameState) {
                return state.player2_handValue;
            },
            player2_cards(state: GameState) {
                return state.player2_cards;
            },
            player2_handReady(state: GameState) {
                return state.player2_handReady;
            },
            handRevealTime(state: GameState) {
                return state.handRevealTime;
            },
            game_loading(state: GameState) {
                return state.game_loading;
            },
            trickPoints(state: GameState) {
                return state.trickPoints;
            },
            remainingTricks(state: GameState) {
                return state.remainingTricks;
            },
            hasBegun(state: GameState) {
                return state.hasBegun;
            },
        },
        mutations: {
            playerName(state: GameState, payload: {player1: boolean, name: string}) {
                if (payload.player1) {
                    state.player1_name = payload.name;
                } else {
                    state.player2_name = payload.name;
                }
            },
            gameBegun(state: GameState, payload: boolean) {
                state.hasBegun = payload;
            },
            playerCardValue(state: GameState, payload: {player1: boolean, value: number | undefined}) {
                if (payload.player1) {
                    state.player1_handValue = payload.value;
                } else {
                    state.player2_handValue = payload.value;
                }
            },
            disablePlayerCard(state: GameState, payload: PlayCardPayload) {
                let cardDeck: Array<INumberOption>;
                if (payload.player1){
                    cardDeck = state.player1_cards;
                } else {
                    cardDeck = state.player2_cards;
                }

                const cardIndex = cardDeck.findIndex(x => x.value === payload.number);
                const cardOption = cardDeck[cardIndex];
                if (cardOption === undefined) {
                    // Card was already disabled and could not be selected
                    return;
                } 

                cardOption.disabled = true;
            },
            trickPoints(state: GameState, payload: number | undefined) {
                state.trickPoints = payload;
            },
            remainingTricks(state: GameState, payload: number) {
                state.remainingTricks = payload;
            },
            playerReady(state: GameState, payload: SetPlayerReadyPayload) {
                if (payload.player1) {
                    state.player1_handReady = payload.isReady;
                } else {
                    state.player2_handReady = payload.isReady;
                }
            },
            player_hand_value(state: GameState, payload: SetPlayerHandValuePayload) {
                if (payload.player1) {
                    state.player1_handValue = payload.value;
                } else {
                    state.player2_handValue = payload.value;
                }
            },
            resetGame(state: GameState) {
                state.hasBegun = false;

                state.remainingTricks = 13;
                
                state.player1_handReady = false;
                state.player1_handValue = undefined;
                state.player1_points = undefined;
                state.player1_name = "";
                
                state.player2_handReady = false;
                state.player2_handValue = undefined;
                state.player2_points = undefined;
                state.player2_name = "";

                for (let i = 0; i < 13; i++) {
                    state.player1_cards[i].disabled = false;
                    state.player2_cards[i].disabled = false;
                }
            },
        },
        actions: {
            async endGame(context: GameContext): Promise<void> {               
                set_gameBegun(context, false);
            },
            async startGame(context: GameContext): Promise<void> {
                set_gameBegun(context, true);
            },
            async playerDecided(context: GameContext, payload: PlayerDecidedPayload): Promise<void> {
                set_playerReady(context, {
                    player1: payload.player1,
                    isReady: true
                });
        
                if (!payload.player1) {
                    if (payload.Value === undefined) {
                        throw new Error("A decide command for player 2 must have a value");
                    }
                    gameService.interactivePlayerDecideMove(payload.Value);
                }
            },
            async startNextTrick(context: GameContext, payload: number): Promise<void> {
                set_trickPoints(context, payload);
                set_remainingTricks(context, context.state.remainingTricks - 1);
                set_playerReady(context, {player1: true, isReady: false});
                set_playerReady(context, {player1: false, isReady: false});
                set_playerCardValue(context, {player1: true, value: undefined});
                set_playerCardValue(context, {player1: false, value: undefined});
            },
            async revealHands(context: GameContext, payload: { player1Value: number, player2Value: number}) {
                throw new Error("Not implemented");
            },
        },
    };

    return game;
};



export const GameModuleFactory = (container: Container) => {
    return gameFactory(container,false);
}

const { commit, read, dispatch } = getStoreAccessors<GameState, RootState>("GameModule");
const game = gameFactory(new Container(), true);
// Getters
export const player1_name = read(game.getters.player1_name);
export const player1_points = read(game.getters.player1_points);
export const player1_handValue = read(game.getters.player1_handValue);
export const player1_cards = read(game.getters.player1_cards);
export const player1_handReady = read(game.getters.player1_handReady);

export const player2_name = read(game.getters.player2_name);
export const player2_points = read(game.getters.player2_points);
export const player2_handValue = read(game.getters.player2_handValue);
export const player2_cards = read(game.getters.player2_cards);
export const player2_handReady = read(game.getters.player2_handReady);

export const game_loading = read(game.getters.game_loading);
export const trickPoints = read(game.getters.trickPoints);
export const remainingTricks = read(game.getters.remainingTricks);
export const hasBegun = read(game.getters.hasBegun);

// Mutations
export const set_playerName = commit(game.mutations.playerName);
export const set_gameBegun = commit(game.mutations.gameBegun);
export const set_playerCardValue = commit(game.mutations.playerCardValue);
export const set_playerReady = commit(game.mutations.playerReady);
export const set_trickPoints = commit(game.mutations.trickPoints);
export const set_remainingTricks = commit(game.mutations.remainingTricks);
export const set_disablePlayerCard = commit(game.mutations.disablePlayerCard);
export const resetGame = commit(game.mutations.resetGame);

// Actions
export const startGame = dispatch(game.actions.startGame);
export const endGame = dispatch(game.actions.endGame);
export const playCard = dispatch(game.actions.playerDecided);