<template>
  <div class="fullscreenGame">
    <!-- Player 1 Area -->
    <PlayerArea v-bind:player_name="player1_name" v-bind:cards="player1_cards" class="player-area-top" />

    <PointsArea class="points-area"/>


    <PointCards class="points-card-area" />

    <PlayerHandCard class="points-card-area" v-bind:ready="player1_handReady" v-bind:play="player1_play" v-bind:value="player1_handValue" />
    <PlayerHandCardBottom class="points-card-area" v-bind:ready="player2_handReady" v-bind:play="player2_play" v-bind:value="player2_handValue" />

    <!-- Player 2 Area -->
    <PlayerArea v-bind:player_name="player2_name" v-bind:cards="player2_cards" class="player-area-bottom" v-bind:selectable="true" v-bind:bottom="true"/>
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import PointsArea from "./PointsArea.vue";
import PointCards from "./PointCards.vue";
import PlayerHandCard from "./PlayerHandCard.vue";
import PlayerHandCardBottom from "./PlayerHandCardBottom.vue";
import PlayerArea from "./PlayerArea.vue";
import { StaticGameState, INumberOption } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { PlayerDecidedCommand } from '@/logic/commands/player-decided.command';

let commandPublisher: ICommandPublisher;

export default Vue.extend({
  components: { PointsArea, PointCards, PlayerHandCard, PlayerHandCardBottom, PlayerArea },
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
.fullscreenGame {
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
.player-area-top {
  border-bottom-width: 2px;
  grid-row: 1;
  grid-column-start: 1;
  grid-column-end: 3;
}
.player-area-bottom {
  grid-row: 3;
  grid-column-start: 1;
  grid-column-end: 3;
  
  border-top-width: 2px;
}

.points-card-area {
  grid-row: 2;
  grid-column: 1;
}

.points-area {
  grid-row: 0;
  grid-column: 2;
}
</style>
