<template>
    <div class="text-page-container">
        <div class="font-size-extra-large margin-bottom-large title">AI Design</div>
        
        <!-- Goal -->
        <div class="font-size-large secondary-title">
            <router-link to="#goal" tag="a">What is an AI</router-link>
        </div>
        <div class="vertical-seperator"></div>
        <p clas="font-size-large font-color-secondary margin-bottom-large">
            To understand what an AI is and how they are built it is important to know what they are made to do.
            A definition of a game playing AI that will help us understand how they are built can be given by, <em>
            An algorithm which given a state determines a permutation to that state in order to each a target 
            state.</em> Simply put this means when given a game an AI can perform the same function as a player, 
            select a moves which advances the game to a desired goal or outcome.<br />
        </p>
        <div class="margin-bottom-large"></div>

        <!-- Goal -->
        <div class="font-size-large secondary-title">
            <router-link to="#first-steps" tag="a">First Steps</router-link>
        </div>
        <div class="vertical-seperator"></div>
        <p clas="font-size-large font-color-secondary margin-bottom-large">
            One of first and most important steps in designing a game playing AI is to understand the game that the AI 
            will be playing. For the AI's we will be exploring it is important to be able to define the game on which 
            the AI will be playing as a state, with possible state transitions representing moves that a player can take.
            Defining the game in this way lets us build what is called a <router-link to="/glossary/Decision Tree">Decision Tree</router-link>.<br />

            Before diving into creating the decision tree for GOPS let us first consider a more trivial game, Knots &amp; Crosses (Tic-Tac-Toe). 
            To define our decision tree for Knots &amp; Crosses we first need to define the state for our game. To represent the state of the game
            at any given point in time we will use a 3x3 matrix. Each cell of the matrix will represent a square on the board in which a player may
            place their respective glyph ("X" or "O"). The state will start as an array of all 0's indicating that the corresponding box is empty. 
            As players fill in their glyps we will update the corresponding matrix element with either a -1 indicating a O has been played in that box
            or 1 if a X has been placed in that cell. Lets take the following example where the players have made 2 moves each.
            
            <div style="display: grid; width: 100%; height: 250px; grid-template-columns: 50% 50%">
                <knots-and-crosses :state="knc_state"></knots-and-crosses>
                <matrix :elements="matrix_data"></matrix>
                <div style="grid-row: 2; grid-column-start: 1; grid-column-end: 2;">{{annotation}}</div>
            </div>
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { setTimeout } from 'timers';

import Matrix from "@/components/Matrix.vue";
import KnotsAndCrosses from "@/components/KnotsAndCrosses.vue";

export default Vue.extend({
    components: {
        KnotsAndCrosses,
        Matrix
    },
    data() {
        return {
            matrix_data: [
                ["-1", "0", "1"],
                ["-1", "0", "0"],
                ["1", "0", "0"],
            ],
            knc_state: "---------",
            annotation: "The beginning of the game is called the initial state. In this state no players have made a move and all elements of the matrix are 0",
            play_number: 0
        };
    },
    methods: {
        AdvancePlayNumber(): void {
            switch(this.play_number) {
                case 0: {
                    this.matrix_data[0][1] = "-1";
                    this.knc_state = "0--------";
                    this.play_number = 1;
                    break;
                }
                case 1: {
                    break;
                }
            }
        }
    }
})
</script>


<style src="../assets/styles/margins.css"></style>
<style src="../assets/styles/text-style.css"></style>
<style src="../assets/styles/text-page-base.css"></style>
<style scoped>

</style>