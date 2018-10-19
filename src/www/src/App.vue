<template>
  <div id="app">
    <!-- <GameSetup v-if="SetupDialog.IsOpen"/> -->
    <WinnerDialog />
    <!-- <Game v-if="game_visible"/> -->
    <Game/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameSetup from './components/GameSetup.vue';
import Game from "./components/Game.vue";
import WinnerDialog from "./components/WinnerDialog.vue";
import { IGameState, StaticGameState } from '@/logic/models/gamestate';
export default Vue.extend({
  name: "App",
  components: { GameSetup, Game, WinnerDialog},  
  data() {
    return StaticGameState;
  },
  computed: {
    game_visible(): boolean{
      return !(this.WinnerDialog.isOpen || this.SetupDialog.IsOpen);
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
</style>
