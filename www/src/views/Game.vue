<template>
  <div id="app">
    <WinnerDialog />
    <Game-Board />
    <TutorialPopup id="tutorial-popup"/>
    <ErrorPopup id="error-popup"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameBoard from "../components/GameBoard.vue";
import ErrorPopup from "../components/ErrorPopup.vue";
import WinnerDialog from "../components/WinnerDialog.vue";
import TutorialPopup from "../components/TutorialPopup.vue";

import { GameModule } from "../store/Game.module";

export default Vue.extend({
  name: "App",
  components: {
    GameBoard,
    WinnerDialog,
    TutorialPopup,
    ErrorPopup
    },

  computed: {
  },
  mounted(): void {

  },
  created(): void {
    if (this.$store.state.Game === undefined) {
      this.$store.registerModule("Game", GameModule);
    }
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#tutorial-popup {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 3;
  z-index: 5;
}
#error-popup {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 3;
  z-index: 6;
}
</style>
