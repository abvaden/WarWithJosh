<template>
    <text v-bind:class="[isBlackCard ? 'blackCard' : 'redCard', 'card']" v-on:click="clicked">{{character}}</text>
</template>

<script lang="ts">
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { PlayingCard, CardSuit, cardFactory } from "@/logic/models/card";

export default {
    props: {
        card: Object
    },
    methods: {
        clicked()  {
            this.$emit("clicked");
        }
    },
    computed: {
        character(): string {
            const playingCard = <PlayingCard>this.card;
            let valueBase = 0;
            switch (playingCard.suit) {
                case(CardSuit.Spade): {
                    valueBase = 0x1F0A1
                    break;
                }
                case(CardSuit.Heart): {
                    valueBase = 0x1F0B1
                    break;
                }
                case(CardSuit.Diamond): {
                    valueBase = 0x1F0C1
                    break;
                }
                case(CardSuit.Club): {
                    valueBase = 0x1F0D1
                    break;
                }
            }

            let valueModifier = 0;
            switch (playingCard.name) {
                case ("1"): {
                    valueModifier = 1;
                    break;
                }
                case ("2"): {
                    valueModifier = 2;
                    break;
                }
                case ("3"): {
                    valueModifier = 3;
                    break;
                }
                case ("4"): {
                    valueModifier = 4;
                    break;
                }
                case ("5"): {
                    valueModifier = 5;
                    break;
                }
                case ("6"): {
                    valueModifier = 6;
                    break;
                }
                case ("7"): {
                    valueModifier = 7;
                    break;
                }
                case ("8"): {
                    valueModifier = 8;
                    break;
                }
                case ("9"): {
                    valueModifier = 9;
                    break;
                }
                case ("10"): {
                    valueModifier = 10;
                    break;
                }
                case ("J"): {
                    valueModifier = 11;
                    break;
                }
                case ("Q"): {
                    valueModifier = 12;
                    break;
                }
                case ("K"): {
                    valueModifier = 13;
                    break;
                }
            }
            return String.fromCodePoint(valueBase + valueModifier);
        },
        isBlackCard(): boolean {
            const playingCard = <PlayingCard>this.card;
            switch (playingCard.suit) {
                case(CardSuit.Spade): {
                    return true;
                }
                case(CardSuit.Heart): {
                    return false;
                }
                case(CardSuit.Diamond): {
                    return false;
                }
                case(CardSuit.Club): {
                    return true;
                }
                default: {
                    return false;
                }
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
   -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.redCard {
    fill: rgb(150,0,0);
    color: rgb(150,0,0);
    background-color: rgb(150,0,0);
}
.blackCard {
    color: rgb(0, 0, 0);
}
</style>
