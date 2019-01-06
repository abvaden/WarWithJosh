<template>
  <div id="app" class="app-layout">
    <navigation id="navigation" />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from "@/components/Navigation.vue"


export default Vue.extend({
  name: "App",
  components: { 
    Navigation
  },
  computed: {
  },
});
</script>

<style src="./assets/styles/colors.css"></style>
<style src="./assets/styles/margins.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
  height: 100vh;
  width: 100vw;
}

@media only screen and (max-width: 813px) {
  .app-layout {
    display: grid;
    column-gap: 0px;
    grid-template-columns: 0fr 1fr;
  }
}

@media only screen and (min-width: 813px) {
  .app-layout {
    display: grid;
    column-gap: 0px;
    grid-template-columns: 150px auto;
  }
}

@media only screen and (max-width: 813px) {
  #navigation {
    display: none;
  }
}

#navigation {
  grid-column: 1;
}

#content {
  grid-column:  2;
}

</style>
