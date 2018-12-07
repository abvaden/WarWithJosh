<template>
    <div class="points-container">
        <div class="player1-name-container player-name-container" style="">
            <p><b>{{player1_name}} <br /> {{player1_points}}</b></p>
        </div>
        <div class="player-name-container player2-name-container">
            <p><b>{{player2_name}} <br /> {{player2_points}}</b></p>
        </div>
        <div class="player-points-container">
            <div v-for="(trick_history, i) in play_history" 
                 class="player-points-row"
                 v-bind:class="{ 'player-points-row-alt': (i + 1) % 2 === 0}"
                 v-bind:key="trick_history.trickNumber">
                <div class="player-points-cell player1-points-cell">
                    <span>{{ trick_history.player1_value + " " }}</span>
                    <span class="player-trick-points-text">{{ renderPoints(trick_history.player1_score) }}</span>
                </div>
                <div class="player-points-cell player2-points-cell">
                    <span>{{ trick_history.player2_value + " "}}</span>
                    <span class="player-trick-points-text">{{ renderPoints(trick_history.player2_score) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as ScoreboardModule from "../store/Scoreboard.module";

export default Vue.extend({
  methods: {
      renderPoints: (pointsValue: undefined | number): string => {
          if (!pointsValue) {
              return "(-)";
          }
          else {
              return "(" + pointsValue.toString() + ")";
          }
      }
  },
  computed: {
      player1_name(): string {
          return ScoreboardModule.getPlayer1Name(this.$store);
      },
      player2_name(): string {
          return ScoreboardModule.getPlayer2Name(this.$store);
      },
      player1_points(): string {
          const score = ScoreboardModule.getPlayer1Score(this.$store);
          if (score === undefined) {
              return "0";
          }

          return score.toFixed(0);
      },
      player2_points(): string {
          const score = ScoreboardModule.getPlayer2Score(this.$store);
          if (score === undefined) {
              return "0";
          }

          return score.toFixed(0);
      },
      play_history(): ScoreboardModule.PlayHistory[] {
          return ScoreboardModule.getPlayHistory(this.$store);
      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.points-container {
    display: grid;   
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr;
}
.player-name-container {
    justify-content: stretch; 
    text-align: center;
    color: white;

    border-top: 0px;
    border-bottom: 2.5px;
    border-style: solid;
    border-color: white;
}
.player1-name-container {
    grid-row: 1;
    grid-column: 1;
    border-left-width: 0px;
    border-right-width: 1.25px;
}
.player2-name-container {
    grid-row: 1;
    grid-column: 2;
    border-left-width: 1.25px;
    border-right-width: 0px;
}
.player-points-container {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 3;
    overflow-y: auto;
}
.player-points-row {
    text-align: center;
    justify-items: center;
    width: 100%;
}
.player-points-row-alt {
    background: rgba(0, 0, 0, .1);
}
.player-points-cell {
    display: inline-block;
    height: 100%;
    width: calc(50% - 2.5px);

    padding-top: 5px;
    padding-bottom: 5px;

    border-color: white;
    border-style: solid;
    border-width: 0px;
}
.player1-points-cell {
    border-right-width: 1.25px;
    border-left-width: 0px;
    color: white;
}
.player2-points-cell {
    border-left-width: 1.25px;
    border-right-width: 0px;
    color: white;
}
.player-trick-points-text {
    color: rgba(155, 155, 155, .5)
}
</style>
