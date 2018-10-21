<template>
  <div class="fullscreen-game">
    <!-- Player 1 Area -->
    <div id="menu-button" class="player-area-top" v-on:click.stop="menu_button_click">&equiv;</div>
    <PlayerArea id="plyer-area-top" class="player-area player-area-top" v-bind:player_name="Game.player1_name" v-bind:cards="Game.player1_cards" />
    
    <!-- Points Columns -->
    <PointsArea class="points-area" />

    <!-- Playing card area -->
    <PointCards class="points-card-area" />
    <PlayerHandCard class="points-card-area" v-bind:ready="Game.player1_handReady" v-bind:play="player1_play" v-bind:value="Game.player1_handValue" />
    <PlayerHandCardBottom class="points-card-area" v-bind:ready="Game.player2_handReady" v-bind:play="player2_play" v-bind:value="Game.player2_handValue" />

    <!-- Player 2 Area -->
    <PlayerArea class="player-area-bottom" v-bind:player_name="Game.player2_name" v-bind:cards="Game.player2_cards" v-bind:selectable="true" v-bind:bottom="true" />

    <!-- Tutorial -->
    <div v-bind:class="['player-area-top', {'hidden-area': hide_top_player_area }]"></div>
    <div v-bind:class="['player-area-bottom', {'hidden-area': hide_bottom_player_area }]"></div>
    <div v-bind:class="['points-card-area', {'hidden-area': hide_points_card_area }]"></div>
    <div v-bind:class="['points-area', {'hidden-area': hide_points_area }]"></div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-player-area-top-container" v-if="Tutorial.stage == 'Opponent' && Tutorial.is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is your opponent's hand. <br />
            When the game starts each player has cards numbered 1-13. <br />
            These are refereed to a bid cards.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" total-count="4" current-count="2"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-player-area-bottom-container" v-if="Tutorial.stage == 'Player' && Tutorial.is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is your hand. <br /> <br />
            Your goal is to outbid your opponent to win the hand and collect the points for the hand. <br /> <br />
            To place your bid click on one of the cards in your hand, be careful though each value may
            only be bid once.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" total-count="4" current-count="3"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-well-cards-container" v-if="Tutorial.stage == 'Well-Cards' && Tutorial.is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            These are Well cards <br />
            At the start of each hand the top well card will be drawn. The value of 
            this card determines the number of points available for this hand.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" total-count="4" current-count="1"/>
    </div>
    <div class="tutorial-text-layer tutorial-text-container" id="tutorial-points-area-container" v-if="(Tutorial.stage == 'Cumulative-Points') && Tutorial.is_running"> 
      <span class="tutorial-text-font" 
            id="tutorial-player-area-top-text">
            This is the score board <br />
            After each hand is complete, the player who had the higher bid wins the points for that hand. 
            The player that has won the most points after all 13 hands is the winner.
      </span>
      <NextButton v-on:click="advance_tutorial_click" style="float: right;" total-count="4" current-count="4"/>
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


import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { PlayerDecidedCommand } from '@/logic/commands/player-decided.command';
import { ToggleDialogCommand } from '@/logic/commands/toggle-dialog.command';
import { AdvanceTutorialCommand } from "@/logic/commands/advance-tutorial.command";

let commandPublisher: ICommandPublisher;

export default Vue.extend({
  components: { PointsArea, PointCards, PlayerHandCard, PlayerHandCardBottom, PlayerArea, NextButton },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return { 
      Game: StaticGameState.Game,
      Tutorial: StaticGameState.Tutorial
    };
  },
  methods: {
    cardSelected: (value: number) => {
      const playCardCommand = new PlayerDecidedCommand();
      playCardCommand.Player1 = false;
      playCardCommand.Value = value;
      commandPublisher.publish(playCardCommand);
    },
    menu_button_click: () => {
      const showTutorialMenuCommand = new ToggleDialogCommand();
      showTutorialMenuCommand.open = true;
      showTutorialMenuCommand.tutorialDialog = true;
      commandPublisher.publish(showTutorialMenuCommand);
    },
    advance_tutorial_click: () => {
      const advanceTutorialCommand = new AdvanceTutorialCommand();
      commandPublisher.publish(advanceTutorialCommand);
    }
  },
  computed: {
    player1_play(): boolean {
      return this.Game.player1_handReady && (this.Game.player1_handValue !== undefined);
    },
    player2_play(): boolean {
      return this.Game.player2_handReady && (this.Game.player2_handValue !== undefined);
    },
    hide_top_player_area(): boolean {
      if (!this.Tutorial.is_running) {
        return false;
      }
      return this.Tutorial.stage != "Opponent";
    },
    hide_bottom_player_area(): boolean {
      if (!this.Tutorial.is_running) {
        return false;
      }
      return this.Tutorial.stage != "Player";
    },
    hide_points_card_area(): boolean {
      if (!this.Tutorial.is_running) {
        return false;
      }
      return this.Tutorial.stage != "Well-Cards";
    },
    hide_points_area(): boolean {
      if (!this.Tutorial.is_running) {
        return false;
      }
      return this.Tutorial.stage != "Cumulative-Points";
    }
  }
});
</script>

<!-- Import the shared layout of the game -->
<style src="../assets/styles/game-layout.css"></style>
<style scoped>
#menu-button {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 3;

  position: absolute;
  left: 10px;
  align-self: flex-start;

  color: black;
  font-weight: bold;
  user-select: none;

  font-size: 50px;
}

#menu-button:hover{
  color: white;
}

.player-area {
  border-style: solid;
  border-color: black;
  border-width: 0px;
}

.player-area-top {
  border-bottom-width: 2px;
}
.player-area-bottom {
  border-top-width: 2px;
}

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
