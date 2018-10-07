<template>
  <div class="fullscreenGame">
    <!-- Player 1 Area -->
    <div class="player-area player-area-top">
      <div class="player-name">{{player1_name}}</div>
      <div class="player-card-area">
        <div v-for="card in player1_cards" 
            v-bind:key="card.value" 
            v-bind:class="['card', {'card-disabled': card.disabled}]"
            v-on:click="cardSelected(card.value, false)"
            style="--aspect-ratio:2.5/3.5;">
          <div>{{card.text}}</div>
        </div>
      </div>
    </div>

    <PointsArea class="points-area"/>

    <PointCards class="points-card-area" />


    <!-- Player 2 Area -->
    <div class="player-area player-area-bottom">
      <div class="player-card-area">
        <div v-for="card in player2_cards" 
            v-bind:key="card.value" 
            v-bind:class="['card', {'card-disabled': card.disabled}]"
            v-on:click="cardSelected(card.value, true)"
            style="--aspect-ratio:2.5/3.5;">
          <div>{{card.text}}</div>
        </div>
      </div>
      <div class="player-name">{{player2_name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PointsArea from "./PointsArea.vue";
import PointCards from "./PointCards.vue";
import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { Stats } from 'fs';

let commandPublisher: ICommandPublisher;

export default {
  components: { PointsArea, PointCards },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Game;
  },
  methods: {
    cardSelected: (value: number, player2: boolean) => {
      let cardDeck: Array<INumberOption>;
      if (player2){
        cardDeck = StaticGameState.Game.player2_cards;
      } else {
        cardDeck = StaticGameState.Game.player1_cards;
      }
      const cardIndex = cardDeck.findIndex(x => x.value === value);
      const cardOption = cardDeck[cardIndex];
      if (cardOption === undefined) {
        // Card was already disabled and could not be selected
        return;
      }

      cardOption.disabled = !cardOption.disabled;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fullscreenGame {
  position: absolute; 
  top:0; 
  left:0; 
  margin: 0;

  height:100%; 
  width:100%;
  
  display: grid;
  grid-template-columns: minmax(.5fr, 0) minmax(min-content, max-content) calc(min-content + 5%);
  grid-template-rows: min-content minmax(250px, auto) min-content;
  align-content: stretch;
  align-items: stretch;
  justify-items: stretch;
}

.player-area {
  fill: rgba(255, 255, 255, .1);
  border-style: solid;
  border-color: black;
  border-width: 0px;
}
.player-area-top {
  border-bottom-width: 2px;
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 4;
}
.player-area-bottom {
  grid-row: 3;
  grid-column-start: 1;
  grid-column-end: 4;
  
  border-top-width: 2px;
}

.player-card-area {
  text-align: center;

  padding-top: 2.5%; 
  padding-bottom: 2.5%;
  background: rgba(0, 255, 255, .1);
}

.player-name {
  margin: 0px;

  text-align: center;
  
  font-size: 50px;
  
  fill: rgba(220,229,235, 1);
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background: rgba(255, 255, 0, .1);
}

.points-card-area {
  grid-row: 2;
  grid-column: 2;
}


.points-area {
  grid-row: 2;
  grid-column: 3;
}

.card {
  margin-left: 10px;
  margin-right: 10px;

  border-radius: 10px;
  border-width: 3px;
  border-style: solid;
  border-color: black;

  width: 50px;
  display: inline-block;
}
.card:hover {
  background-color: rgba(0, 0, 0, .1);
  cursor: pointer;
}


.card-disabled {
  background: rgba(155, 155, 155, .5);
  cursor: no-drop;
}
.card-disabled:hover {
  background: rgba(155, 155, 155, .5);
  cursor: no-drop;
}

.card > div {
  color: white;

  background-color: rgba(255, 255, 0, .1);

  height: 100%;
  width: 100px;
  text-align: center;
  vertical-align:middle;
}

[style*="--aspect-ratio"] > :first-child {
    width: 100%;
}
[style*="--aspect-ratio"] > img {  
    height: auto;
} 
@supports (--custom:property) {
    [style*="--aspect-ratio"] {
        position: relative;
    }
    [style*="--aspect-ratio"]::before {
        content: "";
        display: block;
        padding-bottom: calc(100% / (var(--aspect-ratio)));
    }  
    [style*="--aspect-ratio"] > :first-child {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
    }  
}
</style>
