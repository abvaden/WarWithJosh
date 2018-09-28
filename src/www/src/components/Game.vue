<template>
  <svg class="fullscreenGame" viewBox=0,0,100,100 v-on:onresize="resized"> 
    <rect x="0" y="0" width="100" height="100" style="fill: rgba(255, 0, 0, .05);"/>
    <rect x="0" y="0" width="100" height="25" class="player-area"></rect>
    <text x="50" y="3" alignment-baseline="middle" text-anchor="middle" class="player-name">{{player1_name}}</text>

    <card v-for="(card, index) in player1_cards" 
          v-bind:key="index"
          v-bind:card="card"
          v-bind:x="cardX(index, true)" 
          v-bind:y="cardY(index, true)"  
          height="10" 
          width="5" 
          class="playing-card" 
          v-on:clicked="cardClicked(card)"/>
      
    
    <rect x="0" y="75" width="100" height="25" class="player-area"></rect>
    <text x="50" y="97.5" alignment-baseline="middle" text-anchor="middle" class="player-name">{{player2_name}}</text>
  </svg>
</template>

<script lang="ts">
import Card from "./Card.vue";
import CardDeck from "./CardDeck.vue";
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayingCard } from '@/logic/models/card';

let commandPublisher: ICommandPublisher;

export default {
  components: { Card, CardDeck },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Game;
  },
  methods: {
    resized: () => {
      console.log("Resized");
    },
    cardX: (index: number, player1: boolean): number => {
      return 25 + 15 * index;
    },
    cardY: (index: number, player1: boolean): number => {
      return player1 ? 20 : 100 - 12.5;
    },
    cardClicked(card: PlayingCard): void {
      console.log(card.name);
    }
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullscreenGame {
  position: absolute; 
  display: block;
  top:0; 
  left:0; 
  height:100%; 
  width:100%;
  overflow: hidden;
}

.playing-card {

}

.player-area {
  fill: rgba(255, 255, 255, .1);
  border-width: 1;
  border-color: black;
}
.player-name {
  font-size: 5px;
  fill: #DCE5EB
}
.player-name-top {
}
.player-name-bottom {
}
</style>
