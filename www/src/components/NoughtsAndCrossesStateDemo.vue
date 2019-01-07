<template>
    <div class="nc-state-demo">
        <div class="nc-state-demo-nc">
            <div><b>Game</b></div>
            <div><noughts-and-crosses :state="nc_state" ></noughts-and-crosses></div>
        </div>
        
        <div class="nc-state-demo-state">
            <div><b>State</b></div>
            <div><matrix :elements="matrix_data"></matrix></div>
        </div>

        <div class="nc-state-demo-buttons font-size-medium">
            <div @click.capture.prevent="AdvancePlayNumber">Next</div>
        </div>

        <div style="text-align: left;">
            {{annotation}}
        </div>
        
    </div>
</template>


<script lang="ts">
import Vue from 'vue'

import Matrix from "@/components/Matrix.vue";
import NoughtsAndCrosses from "@/components/NoughtsAndCrosses.vue";

export default Vue.extend({
    components: {
        NoughtsAndCrosses,
        Matrix
    },
    data() {
        return {
            matrix_data: [
                ["0", "0", "0"],
                ["0", "0", "0"],
                ["0", "0", "0"],
            ],
            nc_state: "---------",
            annotation: "The beginning of the game is called the initial state. In this state no players have made a move and all elements of the matrix are 0",
            play_number: 0
        };
    },
    methods: {
        AdvancePlayNumber(): void {
            switch(this.play_number) {
                case 0: {
                    this.matrix_data = [ 
                        ["-1", "0", "0"],
                        ["0", "0", "0"],
                        ["0", "0", "0"]];
                    this.nc_state = "O--------";
                    this.annotation = "The naught player plays the top left so the [1, 1] element of the matrix is set to -1"
                    this.play_number = 1;
                    break;
                }
                case 1: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["0", "0", "0"],
                        ["0", "0", "0"]];
                    this.nc_state = "O-X------";
                    this.annotation = "The cross player plays the top right so the [1, 3] element of the matrix is set to 1"
                    this.play_number = 2;
                    break;
                }
                case 2: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["-1", "0", "0"],
                        ["0", "0", "0"]];
                    this.nc_state = "O-XO-----";
                    this.annotation = "The naught player plays the center left so the [2, 1] element of the matrix is set to -1"
                    this.play_number = 3;
                    break;
                }
                case 3: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["-1", "0", "0"],
                        ["1", "0", "0"]];
                    this.nc_state = "O-XO--X--";
                    this.annotation = "The cross player plays the bottom left so the [3, 1] element of the matrix is set to 1"
                    this.play_number = 4;
                    break;
                }
                case 4: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["-1", "-1", "0"],
                        ["1", "0", "0"]];
                    this.nc_state = "O-XOO-X--";
                    this.annotation = "The naught player plays the center center so the [2, 2] element of the matrix is set to -1"
                    this.play_number = 5;
                    break;
                }
                case 5: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["-1", "-1", "0"],
                        ["1", "0", "1"]];
                    this.nc_state = "O-XOO-X-X";
                    this.annotation = "The cross player plays the bottom right so the [3, 3] element of the matrix is set to 1"
                    this.play_number = 6;
                    break;
                }
                case 6: {
                    this.matrix_data = [ 
                        ["-1", "0", "1"],
                        ["-1", "-1", "-1"],
                        ["1", "0", "1"]];
                    this.nc_state = "O-XOOOX-X";
                    this.annotation = "The naught player plays the right center so the [3, 2] element of the matrix is set to -1"
                    this.play_number = 7;
                    break;
                }
                case 7: {
                    this.nc_state = "---OOO---";
                    this.annotation = "The naught player wins on the center row"
                    this.play_number = 8;
                    break;
                }
                case 8: {
                    this.matrix_data = [ 
                        ["0", "0", "0"],
                        ["0", "0", "0"],
                        ["0", "0", "0"]];
                    this.nc_state = "---------";
                    this.annotation = "The beginning of the game is called the initial state. In this state no players have made a move and all elements of the matrix are 0";
                    this.play_number = 0;
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

.nc-state-demo {
  border-width: 2px;
  border-color: black;
  border-style: solid;
  border-radius: 5px;
  
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  padding-right: 30px;

  display: flex; 
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  background-color: rgba(0,0,0, .05)
}

.nc-state-demo-nc {
    width: 150px;
    height: 125px;
    text-align: center;
    display: grid;
    grid-template-rows: 25px 100px;
    margin: 10px;
}

.nc-state-demo-state {
  width: 150px;
  height: 125px;
  text-align: center;

  display: grid;
  margin: 10px;
  grid-template-rows: 25px 100px;
}

.nc-state-demo-buttons {
    margin: var(--margin-small);
    justify-self: stretch;
    align-self: center;
    flex-grow: 1;
}

.nc-state-demo-buttons > div {
  background-color: var(--blue-4);
  color: white;
  margin-left: var(--margin-small);
  margin-right: var(--margin-small);
  padding-left: calc(var(--margin-small) / 2);
  padding-right: calc(var(--margin-small) / 2);
  border-radius: 4px;
  border-color: black;
  border-width: 2px;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}
</style>
