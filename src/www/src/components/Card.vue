<template>
    <text v-on:click="clicked">{{character}}</text>
</template>

<script lang="ts">

export default {
    props: {
        card: Object
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
