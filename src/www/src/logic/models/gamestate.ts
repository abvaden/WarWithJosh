import { IPlayer } from '../../gops/player';

export interface IGameState {
    SetupDialog: IGameSetupDialog;
    Game: IGame;
}

export interface IGameSetupDialog {
    Message: string;
    IsOpen: boolean;
    PlayerCount: number;
}

export interface IHistoricalPlay {
    trickNumber: number,
    trickPoints: number,
    player1_number: number,
    player2_number: number,
    player1_points: number | undefined,
    player2_points: number | undefined
};

export interface INumberOption {
    value: number;
    text: string;
    disabled: boolean;
}

export interface IGame {
    player1_name: string,
    player1_points: number | undefined,
    player1_cards: Array<INumberOption>;
    player1_hasPlayed: boolean;

    player2_name: string;
    player2_hasPlayed: boolean;
    player2_points: number | undefined,
    player2_cards: Array<INumberOption>;
    
    activeGameId: string,
    game_loading: boolean,
    play_history: Array<IHistoricalPlay>,
    trickPoints: number;
    remainingTricks: number;
    hasBegun: boolean;
}



export const GameState_IOC_Key = Symbol.for("GameState");

export const StaticGameState: IGameState = {
    SetupDialog: {
        Message: "$ Shall we play a game?",
        IsOpen: true,
        PlayerCount: 0
    },
    Game: {
        player1_name: "",
        player1_points: 0,
        player1_cards: [],
        player1_hasPlayed: false,

        player2_name: "",
        player2_points: 0,
        player2_cards: [],
        player2_hasPlayed: false,
        
        activeGameId: "",
        game_loading: false,
        play_history: [],
        trickPoints: 0,
        remainingTricks: 13,
        hasBegun: false
    }
};

