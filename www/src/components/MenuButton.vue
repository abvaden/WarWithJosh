<template>
    <div id="menu-button" v-on:click.stop="onClick" >&equiv;</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        onClick(): void {
            this.$emit('button-click');
        }
    }
})
</script>


<style scoped>
#menu-button {
  padding-left: 10px;

  color: black;
  font-weight: bold;
  user-select: none;

  font-size: 50px;
  width: 30px;
  height: 50px;
}
</style>
