<template>
  <div id="fullscreen-game">
    <!-- Player 1 Area -->
    <div id="menu-button" v-on:click.stop="menu_button_click">
      &equiv;
    </div>
    
    <PlayerArea v-bind:player_name="player1_name" v-bind:cards="player1_cards" id="player-area-top" />

    <PointsArea id="points-area"/>


    <PointCards id="points-card-area" />

    <PlayerHandCard id="points-card-area" v-bind:ready="player1_handReady" v-bind:play="player1_play" v-bind:value="player1_handValue" />
    <PlayerHandCardBottom id="points-card-area" v-bind:ready="player2_handReady" v-bind:play="player2_play" v-bind:value="player2_handValue" />

    <!-- Player 2 Area -->
    <PlayerArea id="player-area-bottom" v-bind:player_name="player2_name" v-bind:cards="player2_cards" v-bind:selectable="true" v-bind:bottom="true"/>

    <TutorialPopup id="tutorial-popup" style="z-index: 1;"/>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import PointsArea from "./PointsArea.vue";
import PointCards from "./PointCards.vue";
import PlayerHandCard from "./PlayerHandCard.vue";
import PlayerHandCardBottom from "./PlayerHandCardBottom.vue";
import PlayerArea from "./PlayerArea.vue";
import TutorialPopup from "./TutorialPopup.vue";
import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { PlayerDecidedCommand } from '@/logic/commands/player-decided.command';
import { ToggleDialogCommand } from '@/logic/commands/toggle-dialog.command';

let commandPublisher: ICommandPublisher;

export default Vue.extend({
  components: { PointsArea, PointCards, PlayerHandCard, PlayerHandCardBottom, PlayerArea, TutorialPopup },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Game;
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
    }
  },
  computed: {
    player1_play(): boolean {
      return this.player1_handReady && (this.player1_handValue !== undefined);
    },
    player2_play(): boolean {
      return this.player2_handReady && (this.player2_handValue !== undefined);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#fullscreen-game {
  position: absolute; 

  margin: auto;

  height:100%; 
  width:100%;
  
  display: grid;
  grid-template-columns: auto minmax(250px, 250px);
  grid-template-rows: min-content minmax(300px, auto) min-content;
  align-content: stretch;
  align-items: stretch;
  justify-items: stretch;
}

.player-area {
  border-style: solid;
  border-color: black;
  border-width: 0px;
}
#player-area-top {
  border-bottom-width: 2px;
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 3;
}
#player-area-bottom {
  grid-row: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  
  border-top-width: 2px;
}

#points-card-area {
  grid-row: 2;
  grid-column: 1;
}

#points-area {
  grid-row: 2;
  grid-column: 2;
}

#tutorial-popup {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 3;
}

#menu-button {
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 3;

  position: absolute;
  top: 10px;
  left: 10px;
  align-self: flex-start;

  color: black;
  font-weight: bold;
  user-select: none;

  font-size: 25px;
}

#menu-button:hover{
  color: white;
}
</style>
