<template>
  <div id="app">
    <WinnerDialog />
    <Game />
    <!-- <Tutorial v-if="Tutorial.is_running" /> -->
    <TutorialPopup id="tutorial-popup" style="z-index: 5;"/>
  </div>
</template>

<script lang="ts">
import Game from "./components/Game.vue";
import Tutorial from "./components/Tutorial.vue";
import WinnerDialog from "./components/WinnerDialog.vue";
import TutorialPopup from "./components/TutorialPopup.vue";

import { Component, Prop, Vue } from 'vue-property-decorator';
import { IGameState, StaticGameState } from '@/logic/models/gamestate';

export default Vue.extend({
  name: "App",
  components: { Game, WinnerDialog, Tutorial, TutorialPopup },  
  data() {
    return StaticGameState;
  },
  computed: {
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
</style>
