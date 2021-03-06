<template>
    <div v-bind:class="['modal', {'modal-open': isOpen}]">
        <div class="modal-content">
            <div class="name-row" v-if="player1_winner">
                <h5>{{player1_name}} wins</h5>
            </div>
            <div class="name-row" v-if="player2_winner">
                <h5>{{player2_name}} wins</h5>
            </div>
            <div class="name-row" v-if="tie">
                <h5>Tie</h5>
            </div>

            <!-- Win Graph -->
            <div class="win-graph"> 
                <h3>Joshua's is currently in a learning mode. Once Joshua learns to play the game by himself his win rate over time will appear here.</h3>
            </div>

            <div id="button-row"> 
                <div class="button" v-on:click="resetButtonClick();">
                    <h1>Reset</h1>
                </div>

                <div class="button" v-on:click="homeButtonClick();">
                    <h1>Home</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {VNode} from "vue";
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { ResetGameCommand } from '@/logic/commands/reset-game.command';
import { RequestStartGameCommand } from "@/logic/commands/request-start-game.command";
import { ToggleDialogCommand } from '@/logic/commands/toggle-dialog.command';

let commandPublisher: ICommandPublisher;
export default Vue.extend({
    beforeCreate: () => {
        commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
    },
    data() {
        return StaticGameState.WinnerDialog;
    },
    methods: {
        resetButtonClick: () => {
            const resetGameCommand = new ResetGameCommand();
            commandPublisher.publish(resetGameCommand);

            const startNewGameCommand = new RequestStartGameCommand();
            commandPublisher.publish(startNewGameCommand);

            const closeDialogsCommand = new ToggleDialogCommand();
            closeDialogsCommand.open = true;
            closeDialogsCommand.tutorialDialog = true;
            commandPublisher.publish(closeDialogsCommand);
        },
        homeButtonClick: () => {
            const resetGameCommand = new ResetGameCommand();
            commandPublisher.publish(resetGameCommand);

            const toggleDialogCommand = new ToggleDialogCommand();
            toggleDialogCommand.open = true;
            toggleDialogCommand.tutorialDialog = true;

            commandPublisher.publish(toggleDialogCommand);
        }
    },
    computed: {
        tie(): boolean {
            return this.player1_score === this.player2_score;
        },
        player1_winner(): boolean {
            return this.player1_score > this.player2_score;
        },
        player2_winner(): boolean {
            return this.player1_score < this.player2_score;
        }
    }
});
</script>

<style scoped>
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    max-width: 100%;
    height: 100%; 
    max-height: 100%;
    overflow: auto; 
    background: transparent;
}

.modal-open {
    display: block;
    background-color: rgba(0, 0, 0, .75);
}

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

.modal-content { 
    background-color: #30312F;
    margin-top: 15%;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 15%;
    max-height: 70%;
}
</style>
