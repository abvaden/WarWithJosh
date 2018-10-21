<template>
  <div class="fullscreen-game">
    <div v-bind:class="['player-area-top', {'hidden-area': hide_top_player_area }]"></div>
    <div v-bind:class="['player-area-bottom', {'hidden-area': hide_bottom_player_area }]"></div>
    <div v-bind:class="['points-card-area', {'hidden-area': hide_points_card_area }]"></div>
    <div v-bind:class="['points-area', {'hidden-area': hide_points_area }]"></div>

    <div class="tooltip-text-layer tutorial-text-container" id="tooltip-player-area-top-container" v-if="stage == 'Opponent'"> 
      <span class="tooltip-text-font" 
            id="tooltip-player-area-top-text">
            This is your oponents hand. <br />
            When the game starts each player has cards numbered 1-13. <br />
            These are refered to a bid cards.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;"/>
    </div>

    <div class="tooltip-text-layer tutorial-text-container" id="tooltip-player-area-bottom-container" v-if="stage == 'Player'"> 
      <span class="tooltip-text-font" 
            id="tooltip-player-area-top-text">
            This is your hand. <br /> <br />
            Your goal is to outbid your opponent to win the hand and collect the points for the hand. <br /> <br />
            To place your bid click on one of the cards in your hand, be careful though each value may
            only be bid once.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;"/>
    </div>

    <div class="tooltip-text-layer tutorial-text-container" id="tooltip-well-cards-container" v-if="stage == 'Well-Cards'"> 
      <span class="tooltip-text-font" 
            id="tooltip-player-area-top-text">
            These are Well cards <br />
            At the start of each hand the top well card will be drawn. The value of 
            this card determines the number of points available for this hand.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;"/>
    </div>

    <div class="tooltip-text-layer tutorial-text-container" id="tooltip-points-area-container" v-if="stage == 'Cumulative-Points'"> 
      <span class="tooltip-text-font" 
            id="tooltip-player-area-top-text">
            This is the score board <br />
            After each hand is complete, the player who had the higher bid wins the points for that hand. 
            The player that has won the most points after all 13 hands is the winner.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import NextButton from "./NextButton.vue";

import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { AdvanceTutorialCommand } from "@/logic/commands/advance-tutorial.command";

let commandPublisher: ICommandPublisher;

export default Vue.extend({
  components: { NextButton },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Tutorial;
  },
  methods: {
    advance_tutorial_click: () => {
      const advanceTutorialCommand = new AdvanceTutorialCommand();
      commandPublisher.publish(advanceTutorialCommand);
    }
  },
  computed: {
    hide_top_player_area(): boolean {
      if (!this.is_running) {
        return false;
      }
      return this.stage != "Opponent";
    },
    hide_bottom_player_area(): boolean {
      if (!this.is_running) {
        return false;
      }
      return this.stage != "Player";
    },
    hide_points_card_area(): boolean {
      if (!this.is_running) {
        return false;
      }
      return this.stage != "Well-Cards";
    },
    hide_points_area(): boolean {
      if (!this.is_running) {
        return false;
      }
      return this.stage != "Cumulative-Points";
    }
  }
});
</script>

<!-- Import the shared layout of the game -->
<style src="../assets/styles/game-layout.css"></style>

<style scoped>
.hidden-area {
    background-color: black;
    opacity: .75;
}


.tooltip-text-font {
  font-size: 2em;
  color: white;
}

#tooltip-player-area-top-container {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  max-width: 500px;
  justify-self: center;
}

#tooltip-player-area-bottom-container {
  display: flex;
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  max-width: 500px;
  justify-self: center;
  align-items: flex-end;
}

#tooltip-well-cards-container {
  display: flex;
  grid-row: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  justify-self: center;
  align-items: flex-start;
}

#tooltip-points-area-container {
  display: flex;
  grid-row: 2;
  grid-column: 1;
  width: 100%;
  justify-self: center;
  align-items: center;
}

.tooltip-text-layer {
  z-index:2;
}

.tutorial-text-container {
  margin-left: 15px;
  margin-right: 15px;

  user-select: none;
}

.next-button {
  font-size: 3em;
  margin-left: auto;

  user-select: none;
}
</style>
