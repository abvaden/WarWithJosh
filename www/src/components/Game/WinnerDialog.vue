<template>
    <popup :popup_open="isOpen" background-color="#30312F">
        <template slot="header">
            <div>
                <div class="name-row" v-if="player1_winner">
                    <div class="popup-title-text">{{player1_name}} wins</div>
                </div>
                <div class="name-row" v-if="player2_winner">
                    <div class="popup-title-text">{{player2_name}} wins</div>
                </div>
                <div class="name-row" v-if="tie">
                    <div class="popup-title-text">Tie</div>
                </div>
            </div>
        </template>
        <template slot="body">
            <!-- Win Graph -->
            <div class="win-graph"> 
                <h3>Joshua's is currently in a learning mode. Once Joshua learns to play the game by himself his win rate over time will appear here.</h3>
            </div>
        </template>

        <template slot="footer">
            <div id="button-row"> 
                <div class="button" v-on:click="resetButtonClick();">
                    <h1>Reset</h1>
                </div>

                <div class="button" v-on:click="homeButtonClick();">
                    <h1>Home</h1>
                </div>
            </div>
        </template>
    </popup>
</template>

<script lang="ts">
import Vue, {VNode} from "vue";
import Popup from "../Popup.vue";
import { reset, startGame} from "../../store/Game.module";
import { winnerDialogOpen, winnerState } from "../../store/Dialog.module";
import { player2_name, player1_name, resetGame } from "../../store/GameBoard.module";

export default Vue.extend({
    components: {
        Popup
    },
    methods: {
        resetButtonClick(): void {
            reset(this.$store);
            startGame(this.$store);
        },
        homeButtonClick(): void {
            reset(this.$store);
        },
    },
    computed: {
        tie(): boolean {
            const state = winnerState(this.$store);
            return  state.player1_score === state.player2_score;
        },
        player1_winner(): boolean {
            const state = winnerState(this.$store);
            return  state.player1_score > state.player2_score;
        },
        player2_winner(): boolean {
            const state = winnerState(this.$store);
            return  state.player1_score < state.player2_score;
        },
        player1_name(): string {
            return player1_name(this.$store);
        },
        player2_name(): string {
            return player2_name(this.$store);
        },
        isOpen(): boolean {
            return winnerDialogOpen(this.$store);
        },
    },
});
</script>

<style scoped>
.name-row {
    display: inline-block;
    width: 100%;
    text-align: center;
}

.name-row > h5 {
    color: var(--light-shades-color);
    font-size: 2em;
}

.win-graph {
    background-color: var(--light-accent-color);
    display: block;
    height: 50%;
    width: 75%;
    margin: auto;
    
}

.win-graph > h3 {
    color: black;
    padding: 30px;
}

#button-row {
    display: inline-flex;
    width: 100%;
    margin-top: 25px;
    margin-bottom: 50px;
    justify-content: center;
}

.button {
    margin-left: 30px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 30px;
    margin-top: 10px;

    height: min-content;
    
    border-radius: 10px;
    background-color: var(--dark-accent-color);
}

.button:hover {
    background-color: var(--dark-shades-color);

    border-color: var(--light-shades-color);
    border-style: solid;
    border-width: 2px;
}

.button > h1 {
    color: var(--light-shades-color);
    font-size: 1.5em;
}
</style>
