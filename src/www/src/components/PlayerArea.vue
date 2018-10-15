<template>
<div class="player-area player-area-top">
    <div v-if="top" class="player-name">{{ player_name }}</div>
    <div class="player-card-area">
      <div v-for="card in cards" 
          v-bind:key="card.value" 
          v-bind:class="['card', {'card-disabled': card.disabled, 'card-selectable': selectable, 'card-selectable-disabled': selectable && card.disabled }]"
          v-on:click="cardSelected(card.value);">
          <div>{{card.text}}</div>
      </div>
    </div>
    <div v-if="bottom" class="player-name">{{ player_name }}</div>
</div>
</template>
<script lang="ts">
import Vue, { VNode } from "vue";
import PointsArea from "./PointsArea.vue";
import PointCards from "./PointCards.vue";
import PlayerHandCard from "./PlayerHandCard.vue";
import PlayerHandCardBottom from "./PlayerHandCardBottom.vue";
import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { PlayerDecidedCommand } from '@/logic/commands/player-decided.command';

let commandPublisher: ICommandPublisher;

export default Vue.extend({
    props: {
      player_name: String, 
      cards: Array, 
      selectable: Boolean,
      bottom: Boolean
    },
    beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
    },
    methods: {
        cardSelected: (value: number) => {
        const playCardCommand = new PlayerDecidedCommand();
        playCardCommand.Player1 = false;
        playCardCommand.Value = value;
        commandPublisher.publish(playCardCommand);
        }
    },
    computed: {
      top(): boolean {
        return !this.bottom;
      }
    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-area {
  border-style: solid;
  border-color: black;
  border-width: 0px;
}
.player-card-area {
  text-align: center;

  padding-top: 2.5%; 
  padding-bottom: 2.5%;
  background: rgba(0, 0, 0, .1);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.player-name {
  margin: 0px;
  text-align: center;
  
  font-size: 50px;
  
  color: var(--light-shades-color);
  
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  background: var(--light-accent-color);
}

.points-card-area {
  grid-row: 2;
  grid-column: 1;
}


.points-area {
  grid-row: 0;
  grid-column: 2;
}

.card {
  margin-left: 5px;
  margin-right: 5px;

  background-color: var(--dark-accent-color);
  border-radius: 10px;
  border-width: 3px; 
  border-style: solid;
  border-color: black;

  cursor:default;

  width: 50px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
}

.card-selectable:hover {
  cursor: pointer;
  border-color: white;
}
.card-selectable-disabled {
  background: rgba(155, 155, 155, .5);
  border-color: black;
  cursor: no-drop;
}


.card > div {
  color: black;
  font-size: 45px;
  display: flex;
  text-align: center;
}

.card-disabled {
  background-color: var(--dark-accent-disabled-color);
}

.card-disabled > div {
  color: black;
}
.card-selectable-disabled:hover {
  background: rgba(155, 155, 155, .5);
  border-color: black;
  cursor: no-drop;
}
</style>
