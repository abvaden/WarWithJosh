<template>
    <div v-bind:class="['modal', {'modal-open': isOpen}]">
        <div class="content" v-if="player2_winner">
            
        </div>
        <div class="content" v-if="player1_winner">
            
        </div>
        <div class="content" v-if="tie">
            Tie 
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {VNode} from "vue";
import { StaticGameState } from "@/logic/models/gamestate"

export default Vue.extend({
    data() {
        return StaticGameState.WinnerDialog;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background: transparent;
}

.modal-open {
    display: block;
    background-color: rgba(0, 0, 0, .75);
}

.content { 
    background-color: #30312F;
    margin: 15% 5% 15% 5%;
    height: 70%;
    max-width: 90%;
    max-height: 70%;
}
</style>
