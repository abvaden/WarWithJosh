<template>
  <div id="app" class="app-layout">
    <div id="navigation">
      <router-link to="/home" 
                   class="font-size-medium margin-top-small navigation-parent-item" 
                   active-class="navigation-item-selected"
                   tag="div">
        Home
        <router-link to="/home#what"
                   class="font-size-small font-color-secondary navigation-child-item" 
                   active-class="navigation-item-selected"
                   tag="div">What</router-link>
        <router-link to="/home#what"
                   class="font-size-small font-color-secondary navigation-child-item" 
                   active-class="navigation-item-selected"
                   tag="div">How</router-link>
        <router-link to="/home#what"
                   class="font-size-small font-color-secondary navigation-child-item" 
                   active-class="navigation-item-selected"
                   tag="div">Why</router-link>
      </router-link>
      
      <router-link to="/game" 
                   class="font-size-medium margin-top-small navigation-parent-item" 
                   active-class="navigation-item-selected"
                   tag="div">Game</router-link>
    </div>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
  name: "App",
  components: { 
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

.navigation-item-selected {
  color: var(--blue-5);
}

.navigation-parent-item {
  margin-left: var(--margin-small);
  cursor: pointer;
}

.navigation-child-item {
  margin-left: var(--margin-medium);
}

.navigation-child-item:hover {
  margin-left: var(--margin-medium);
  text-decoration: none;
}

.navigation-item:hover {
  text-decoration: underline;
  text-decoration-color: var(--blue-5);
}
</style>
