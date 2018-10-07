<template>
  <div id="app" v-on:keyup.stop="doThis">
    <GameSetup />
    <Game />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GameSetup from './components/GameSetup.vue';
import Game from "./components/Game.vue";
import { IGameState, StaticGameState } from '@/logic/models/gamestate';
export default {
  name: "App",
  components: { GameSetup, Game},  
  data() {
    return StaticGameState;
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
