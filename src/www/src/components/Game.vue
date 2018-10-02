<template>
  <div class="fullscreenGame">
    <!-- Player 1 Area -->
    <div class="player-area player-area-top">
      <div class="player-name">{{player1_name}}</div>
      <div class="player-card-area">
        <div v-for="card in player2_cards" 
            v-bind:key="card.value" 
            style="display: inline-block;" 
            v-bind:class="['card', {'card-disabled': card.disabled}]"
            v-on:click="cardSelected(card.value)">
          <h5>{{card.text}}</h5>
        </div>
      </div>
    </div>

    <!-- Player 2 Area -->
    <div class="player-area player-area-bottom">
      <div class="player-card-area">
        <div v-for="card in player2_cards" 
            v-bind:key="card.value" 
            style="display: inline-block;" 
            v-bind:class="['card', {'card-disabled': card.disabled}]"
            v-on:click="cardSelected(card.value)">
          <h5>{{card.text}}</h5>
        </div>
      </div>
      <div class="player-name">{{player2_name}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';

let commandPublisher: ICommandPublisher;

export default {
  components: {  },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Game;
  },
  methods: {
    cardSelected: (value: number) => {
      const cardIndex = StaticGameState.Game.player1_cards.findIndex(x => x.value === value);
      const cardOption = StaticGameState.Game.player1_cards.find(x => x.value === value);
      if (cardOption === undefined) {
        // Card was already disabled and could not be selected
        return;
      }

      const newOption = {
        value: cardOption.value,
        text: cardOption.text,
        disabled: true
      }
      StaticGameState.Game.player1_cards.splice(cardIndex, 1, newOption);
      // this.$set(StaticGameState.Game.player1_cards, cardIndex, newOption);
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
  min-height: 100%;
  margin-bottom: -50px;
  height:100%; 
  width:100%;
  margin: 0;
  overflow: hidden;
}

.player-area {
  position: absolute;
  display: block; 
  width: 100%; 
  left: 0px;
  background: rgba(0, 0, 0, .1);
  border-width: 2px;
  border-style: solid;
  fill: rgba(255, 255, 255, .1);
  border-width: 1;
  border-color: black;
  height: 20%;
}
.player-area-top {
  top: 0%;
}
.player-area-bottom {
  top: 80%;
}

.player-card-area {
  widows: 100%;
  text-align: center;

}

.player-name {
  display: block;
  border-top-width: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  font-size: 50px;
  fill: rgba(220,229,235, 1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}



.card {
  margin-top: 10px;
  margin-bottom: 10px;

  margin-left: 10px;
  margin-right: 10px;

  border-width: 3px;
  border-style: solid;
  border-color: black;

  height: 100px;
  width: 50px;
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

.card > h5 {
  color: white;
  text-align: center;
  vertical-align: middle;
}
</style>
