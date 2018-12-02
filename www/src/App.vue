<template>
  <div id="app">
    <WinnerDialog />
    <Game />
    <TutorialPopup id="tutorial-popup"/>
    <ErrorPopup id="error-popup"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Game from "./components/Game.vue";
import ErrorPopup from "./components/ErrorPopup.vue";
import WinnerDialog from "./components/WinnerDialog.vue";
import TutorialPopup from "./components/TutorialPopup.vue";


export default Vue.extend({
  name: "App",
  components: { Game, WinnerDialog, TutorialPopup, ErrorPopup },  

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
#error-popup {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 3;
  z-index: 6;
}
</style>
