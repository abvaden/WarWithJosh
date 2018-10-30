<template>
    <div class="all-cards-area">
        <div v-for="card in pointCards" v-bind:key="card.index" 
            class="flip-container"
            v-bind:class="{ 'flip-container-flipped': !card.isHidden, 'point-card-hidden': card.isHidden}">
            <div class="flipper">
                <div class="front point-card"> 
                    <div>{{card.face}}</div>
                </div>
                <div class="back point-card">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { PlayCardCommand } from '../logic/commands/play-card.command';
import { setInterval, clearInterval } from 'timers';
let commandPublisher: ICommandPublisher;

export default Vue.extend({
  components: {  },
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  destroyed: () => {
  },
  data() {
    return StaticGameState.Game;
  },
  methods: {
  },
  computed: {
      pointCards():  Array<{ index: number; isHidden: boolean; face: number; }> {
        const totalCards = this.hasBegun ? (this.remainingTricks + 1) : 13;
        const cards = [];
        for (let i = 0 ; i < totalCards; i++) {
            cards.push({
                index: i,
                isHidden: true,
                face: 5
            });
        }
        if (this.hasBegun && (this.trickPoints != 0)) {
            cards[cards.length - 1].isHidden = false;
            cards[cards.length - 1].face = <number>StaticGameState.Game.trickPoints;   
        }

        return cards;
    }
  }
});
</script>


<style scoped>
@media only screen and (max-width: 700px) {
    .flip-container-flipped .flipper, .flip-container-flipped .flipper {
        transform: rotateY(180deg) translateX(var(--card-overlap-s));
    }

    .all-cards-area {
        margin-top: auto;
        margin-bottom: auto;
        padding-left: 110px;
        min-width: 250px;
        display: block;
    }

    .flip-container {
        display: inline-block;
        margin-left: var(--card-overlap-s);
        perspective: 1000;
    }

    .point-card-hidden {
        margin-left: var(--card-overlap-s);
    }
}

@media only screen and (min-width: 700px) {
    .flip-container-flipped .flipper, .flip-container-flipped .flipper {
        transform: rotateY(180deg) translateX(var(--card-overlap));
    }

    .all-cards-area {
        margin-top: auto;
        margin-bottom: auto;
        padding-left: 110px;
        min-width: 300px;
        width: 220px;
        display: block;
    }

    .flip-container {
        display: inline-block;
        margin-left: var(--card-overlap);
        perspective: 1000;
    }
    .point-card-hidden {
        margin-left: var(--card-overlap);
    }
}
.card-table {
    display: flex;
    background-color: white;
    overflow: hidden;
}



.flip-container, .front, .back {
	width: var(--card-width);
	height: var(--card-height);
}

/* flip speed goes here */
.flipper {
    transition: 1.0s;
	transform-style: preserve-3d;
    position: relative;
}

/* hide back of pane during swap */
.front, .back {
	backface-visibility: hidden;
	position: absolute;
    top: 0;
	left: 0;
}

/* front pane, placed above back */
.back {
  z-index: 2;
  background: gray;
}

/* back, initially hidden pane */
.front {
  transform: rotateY(180deg);
  background: white;
}

.point-card {
    text-align: center;
    width: var(--card-width);
	height: var(--card-height);
    border-width: 2px;
    border-style: solid;
    border-color: black;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    flex-direction: column;
}

.point-card div {
    margin: auto;
    font-size: 25px;
    font-weight: bolder;
    color: black;
}
</style>
