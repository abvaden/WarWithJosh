<template>
    <div class="container">
        <div class="content" v-if="player2_winner">
            
        </div>
        <div class="content" v-if="player1_winner">
            
        </div>
        <div class="content" v-if="tie">
            
        </div>
    </div>
</template>

<script lang="ts">
import Vue, {VNode} from "vue";
import { StaticGameState } from "@/logic/models/gamestate"

export default {
  data() {
    return StaticGameState.Game;
  },
  computed: {
      tie(): boolean {
          return this.player1_score === this.player2_score;
      },
      player1_winner(): boolean {
          return this.player1_score > this.player2_score;
      }
      player2_winner(): boolean {
          return this.player1_score < this.player2_score;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
    display: none;
    background-color: rgba(0,0,0,.5);
}

.content { 
    background-color: white;
}
</style>
