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

export interface INumberOption {
    value: number;
    text: string;
    disabled: boolean;
}

export interface IGame {
    player1: IPlayer | undefined;
    player1_name: string;
    player1_cards: Array<INumberOption>;
    player2: IPlayer | undefined;
    player2_name: string;
    player2_cards: Array<INumberOption>;
    trickPoints: number | undefined;
}

function playerCards(): Array<INumberOption> {
    const values = new Array<INumberOption>();
    for (let i = 1; i <= 13; i++) {
        const numberOption = {
            value: i,
            text: i.toString(),
            disabled: false
        };
        values.push(numberOption);
    }

    return values;
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
        player1_name: "Joshua",
        player1_cards: playerCards(),
        player2_name: "Joe User",
        player2_cards: playerCards(),
        trickPoints: undefined
    }
};

