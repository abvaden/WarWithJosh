
export interface IGameState {
    SetupDialog: IGameSetupDialog,
    WinnerDialog: IWinnerDialog,
    Game: IGame
}

export interface IGameSetupDialog {
    Message: string;
    IsOpen: boolean;
    PlayerCount: number;
}

export interface IWinnerDialog {
    player1_name: string,
    player2_name: string,

    player1_score: number,
    player2_score: number,
    
    isOpen: boolean
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
    player1_handValue: number | undefined,
    player1_cards: Array<INumberOption>,
    player1_handReady: boolean,

    player2_name: string,
    player2_handReady: boolean,
    player2_handValue: number | undefined,
    player2_points: number | undefined,
    player2_cards: Array<INumberOption>,

    handRevealTime: Date,
    
    activeGameId: string,
    game_loading: boolean,
    play_history: Array<IHistoricalPlay>,
    trickPoints: number,
    remainingTricks: number,
    hasBegun: boolean,

    winnerDialogOpen: boolean
}



export const GameState_IOC_Key = Symbol.for("GameState");

export const StaticGameState: IGameState = {
    SetupDialog: {
        Message: "$ Shall we play a game?",
        IsOpen: false,
        PlayerCount: 0
    },
    WinnerDialog: {
        player1_name: "Josh",
        player2_name: "Joe User",

        player1_score: 10,
        player2_score: 15,

        isOpen: true
    },
    Game: {
        player1_name: "",
        player1_points: 0,
        player1_cards: [],
        player1_handValue: undefined,
        player1_handReady: false,

        player2_name: "",
        player2_points: 0,
        player2_cards: [],
        player2_handValue: undefined,
        player2_handReady: false,
        
        handRevealTime: new Date(),
        activeGameId: "",
        game_loading: false,
        play_history: [],
        trickPoints: 0,
        remainingTricks: 13,
        hasBegun: false,

        winnerDialogOpen: false
    },

};

