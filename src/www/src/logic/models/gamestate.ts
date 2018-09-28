import { IPlayer } from '@/logic/models/player';
import { PlayingCard, cardFactory, CardSuit } from '@/logic/models/card';
import { CardDeck } from '@/logic/models/card-deck';

export interface IGameState {
    SetupDialog: IGameSetupDialog;
    Game: IGame;
}

export interface IGameSetupDialog {
    Message: string;
    IsOpen: boolean;
    PlayerCount: number;
}

export interface IGame {
    player1: IPlayer | undefined;
    player1_name: string;
    player1_cards: Array<PlayingCard>;
    player2: IPlayer | undefined;
    player2_name: string;
    player2_cards: Array<PlayingCard>;
    well: CardDeck | undefined;
}


export const GameState_IOC_Key = Symbol.for("GameState");

export const StaticGameState: IGameState = {
    SetupDialog: {
        Message: "$ Shall we play a game?",
        IsOpen: true,
        PlayerCount: 0
    },
    Game: {
        player1: undefined,
        player2: undefined,
        well: undefined,
        player1_name: "Joshua",
        player1_cards: [ cardFactory("A", CardSuit.Club), cardFactory("K", CardSuit.Heart), cardFactory("Q", CardSuit.Diamond), cardFactory("J", CardSuit.Spade), cardFactory("10", CardSuit.Club)],
        player2_name: "Joe User",
        player2_cards: []
    }
};

