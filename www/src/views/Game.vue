<template>
  <div class="game-container">
    <tutorial-popup id="tutorial-popup" 
                   :open="tutorialOpen"
                   class="fullArea" 
                   v-on:play-clicked="tutorial_play_clicked"
                   v-on:tutorial-clicked="tutorial_start_clicked"/>
    <div class="fullArea">
      <game-board />
    </div>
    
    <winner-dialog class="fullArea"/>
    
    <error-popup id="error-popup" class="fullArea"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameBoard from "../components/Game/GameBoard.vue";
import ErrorPopup from "../components/ErrorPopup.vue";
import WinnerDialog from "../components/Game/WinnerDialog.vue";
import TutorialPopup from "../components/Game/TutorialPopup.vue";

import { GameModule } from "../store/Game.module";
import { startGame as StartInteractiveGame, startTutorial } from "../store/Game.module";

export default Vue.extend({
  name: "Game",
  components: {
    GameBoard,
    WinnerDialog,
    TutorialPopup,
    ErrorPopup
    },
  data() {
    return {
      tutorialOpen: true,
    }
  },
  methods: {
    tutorial_play_clicked(): void {
      this.tutorialOpen = false;
      StartInteractiveGame(this.$store);
    },
    tutorial_start_clicked(): void {
      this.tutorialOpen = false;
      startTutorial(this.$store);
    }
  },
  created(): void {
    if (this.$store.state.Game === undefined) {
      this.$store.registerModule("Game", GameModule);
    }
  }
});
</script>

<style>
.fullArea {
  grid-row: 1;
  grid-column: 1;
  position: relative;
  top: 0px;
  left: 0px;
}

.game-container {
  --primary-background-color: #2c3e50;
  --light-accent-color: #857F80;  
  --light-shades-color: #F9F8F8;
  --dark-accent-color: #5f8783;
  --dark-accent-disabled-color: #5d6160;
  --dark-shades-color: #285282;

  --error-text-color: #D32F2F;
  
  --card-overlap: -90px;
  --card-overlap-s: -97px;


  --card-height: 140px;
  --card-max-height: 70%;
  --card-width: 100px;
  --card-max-width: 25%;
  --card-half-width: 70px;

  --render-break-width: 600px;

  display: grid;
  height: 100%;
  box-sizing: border-box;
  border-top-width: 0px;
  border-bottom-width: 0px;
  border-right-width: 0px;
  border-left-width: 2px;
  border-color: black;
  border-style: solid;
  
  background-color: var(--primary-background-color);
}



</style>
