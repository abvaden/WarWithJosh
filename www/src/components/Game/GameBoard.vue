<template>
  <div class="fullscreen-game">
    <!-- Player 1 Area -->
    <menu-button v-on:button-click="menu_button_click" class="player-area-top" v-if="ShowMenuButton"/>
    <PlayerArea id="plyer-area-top" class="player-area player-area-top" v-bind:player_name="player1_name" v-bind:cards="player1_cards" />
    
    <!-- Points Columns -->
    <PointsArea class="points-area" />

    <!-- Playing card area -->
    <PointCards class="points-card-area" />
    <PlayerHandCard class="points-card-area" v-bind:ready="player1_handReady" v-bind:play="player1_play" v-bind:value="player1_handValue" />
    <PlayerHandCardBottom class="points-card-area" v-bind:ready="player2_handReady" v-bind:play="player2_play" v-bind:value="player2_handValue" />

    <!-- Player 2 Area -->
    <PlayerArea class="player-area-bottom" v-bind:player_name="player2_name" v-bind:cards="player2_cards" v-bind:selectable="true" v-bind:bottom="true" v-on:selected="cardSelected($event)"/>

    <!-- Tutorial -->
    <div v-bind:class="['player-area-top', {'hidden-area': hide_top_player_area }]"></div>
    <div v-bind:class="['player-area-bottom', {'hidden-area': hide_bottom_player_area }]"></div>
    <div v-bind:class="['points-card-area', {'hidden-area': hide_points_card_area }]"></div>
    <div v-bind:class="['points-area', {'hidden-area': hide_points_area }]"></div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-player-area-top-container" v-if="tutorial_stage == 'Opponent' && tutorial_is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is your opponent's hand. <br />
            When the game starts each player has cards numbered 1-13. <br />
            These are refereed to a bid cards.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" :total-count="4" :current-count="2"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-player-area-bottom-container" v-if="tutorial_stage == 'Player' && tutorial_is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is your hand. <br /> <br />
            Your goal is to outbid your opponent to win the hand and collect the points for the hand. <br /> <br />
            To place your bid click on one of the cards in your hand, be careful though each value may
            only be bid once.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" :total-count="4" :current-count="3"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-well-cards-container" v-if="tutorial_stage == 'Well-Cards' && tutorial_is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            These are Well cards <br />
            At the start of each hand the top well card will be drawn. The value of 
            this card determines the number of points available for this hand.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" :total-count="4" :current-count="1"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-points-area-container" v-if="(tutorial_stage == 'Cumulative-Points') && tutorial_is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is the score board <br />
            After each hand is complete, the player who had the higher bid wins the points for that hand. 
            The player that has won the most points after all 13 hands is the winner.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" :total-count="4" :current-count="4"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import PointsArea from "./PointsArea.vue";
import PointCards from "./PointCards.vue";
import PlayerArea from "./PlayerArea.vue";
import NextButton from "./NextButton.vue";
import PlayerHandCard from "./PlayerHandCard.vue";
import PlayerHandCardBottom from "./PlayerHandCardBottom.vue";
import MenuButton from "../MenuButton.vue";

import { playCard, endGame, advanceTutorial } from "../../store/Game.module";
import { is_running as TutorialIsRunning, stage as TutorialStage } from "../../store/Tutorial.module";
import { player1_handValue, 
         player2_handValue, 
         player1_handReady, 
         player2_handReady, 
         player1_name, 
         player2_name, 
         player1_cards, 
         INumberOption, 
         player2_cards } from "../../store/GameBoard.module";

import { openDialog, DialogType } from "../../store/Dialog.module";
import { mapState } from 'vuex';

export default Vue.extend({
  components: { 
    PointsArea, 
    PointCards, 
    PlayerHandCard, 
    PlayerHandCardBottom, 
    PlayerArea, 
    NextButton, 
    MenuButton 
  },
  props: {
    ShowMenuButton: {
      Type: Boolean,
      default: false,
    }
  },
  methods: {
    cardSelected(value: number) {
      playCard(this.$store, value);
    },
    menu_button_click() {
      endGame(this.$store);
    },
    advance_tutorial_click() {
      advanceTutorial(this.$store);
    },
  },
  computed: {
    player1_handReady(): boolean {
      return player1_handReady(this.$store);
    },
    player1_name(): string {
      return player1_name(this.$store);
    },
    player1_play(): boolean {
      return player1_handReady(this.$store) && (player1_handValue(this.$store) !== undefined);
    },
    player1_handValue(): number | undefined {
      return player1_handValue(this.$store);
    },
    player1_cards(): INumberOption[] {
      return player1_cards(this.$store)
    },
    player2_handReady(): boolean {
      return player2_handReady(this.$store);
    },
    player2_name(): string {
      return player2_name(this.$store);
    },
    player2_play(): boolean {
      return player2_handReady(this.$store) && (player2_handValue(this.$store) !== undefined);
    },
    player2_handValue(): number | undefined {
      return player2_handValue(this.$store);
    },
    player2_cards(): INumberOption[] {
      return player2_cards(this.$store);
    },
    hide_top_player_area(): boolean {
      if (!TutorialIsRunning(this.$store)) {
        return false;
      }
      return TutorialStage(this.$store) != "Opponent";
    },
    hide_bottom_player_area(): boolean {
      if (!TutorialIsRunning(this.$store)) {
        return false;
      }
      return TutorialStage(this.$store) != "Player";
    },
    hide_points_card_area(): boolean {
      if (!TutorialIsRunning(this.$store)) {
        return false;
      }
      return TutorialStage(this.$store) != "Well-Cards";
    },
    hide_points_area(): boolean {
      if (!TutorialIsRunning(this.$store)) {
        return false;
      }
      return TutorialStage(this.$store) != "Cumulative-Points";
    },
    tutorial_stage(): string {
      return TutorialStage(this.$store);
    },
    tutorial_is_running(): boolean {
      return TutorialIsRunning(this.$store);
    }
  }
});
</script>

<!-- Import the shared layout of the game -->
<style src="./game-layout.css"></style>

<style scoped>
.hidden-area {
    background-color: black;
    opacity: .5;
}
.tutorial-text-font {
  font-size: 2em;
  color: white;
}

#tutorial-player-area-top-container {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  max-width: 500px;
  justify-self: center;
}

#tutorial-player-area-bottom-container {
  display: flex;
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  max-width: 500px;
  justify-self: center;
  align-items: flex-end;
}

#tutorial-well-cards-container {
  display: flex;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  justify-self: center;
  align-items: flex-start;
}

#tutorial-points-area-container {
  display: flex;
  grid-row: 2;
  grid-column: 1;
  width: 100%;
  justify-self: center;
  align-items: center;
}

.tutorial-text-layer {
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
