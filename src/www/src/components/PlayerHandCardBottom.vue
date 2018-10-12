<template>
    <div class="container">
        <div class="flip-container"
             v-bind:class="{ 'flip-container-flipped': play, 'ready': ready }">
            <div class="flipper">
                <div class="front point-card"> 
                    <div>{{value}}</div>
                </div>
                <div class="back point-card">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";

export default {
  props: [ "ready", "value", "play", "bottom" ]
}
</script>


<style scoped>
:root {
  --card-height: 140px;
  --card-max-height: 70%;
  --card-width: 100px;
  --card-max-width: 25%;
  --card-half-width: 70px;
}
.container {
    overflow: hidden;
    width: 100%;
}
/* entire container, keeps perspective */
.flip-container {
    position: relative;
    perspective: 1000;
    left: 50%;
    top:100%;
}

/* flip the pane when clicked */
.flip-container-flipped .flipper, .flip-container-flipped .flipper {
    transform: translateX(calc(var(--card-width))) rotateY(180deg);
}

.flip-container, .front, .back {
	width: var(--card-width);
	height: var(--card-height);
}

/* flip speed goes here */
.flipper {
    transition: 1.0s;
	transform-style: preserve-3d;
    position: absolute;
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

.ready {
    transition: 0.6s;
    transform: translateX(calc(var(--card-width) * 0.75)) translateY(-105%);
}
</style>
