<template>
  <div>
    <div id="app" class="app-layout">

      <div class="content">
        <router-view />
      </div>

      <div :class="['navigation', {'navigation-open': navigationOpen, 'navigation-close': navigationClose}]">
        <navigation id="navigation" @routeChanged="RouteChanged"/>
      </div>
    </div>

    <menu-button class="menu-button" @button-click="MenuButtonClick" />
  </div>
  
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from "@/components/Navigation.vue";
import MenuButton from "@/components/MenuButton.vue";
import { setInterval } from 'timers';


export default Vue.extend({
  name: "App",
  components: { 
    Navigation,
    MenuButton
  },
  data() {
    return {
      navOpen: false,
      navigationSet: false
    }
  },
  computed: {
    navigationOpen(): boolean {
      return this.navigationSet && this.navOpen;
    },
    navigationClose(): boolean {
      return this.navigationSet && !this.navOpen;
    }
  },
  methods: {
    MenuButtonClick(): void {
      this.navigationSet = true;
      this.navOpen = !this.navOpen;
    },
    RouteChanged(): void {
      this.navOpen = false;
    }
  }
});
</script>

<style src="./assets/styles/colors.css"></style>
<style src="./assets/styles/margins.css"></style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  
  position: absolute;
  top: 0;
  left: 0px;

  height: 100vh;
  width: 100vw;
}

@media only screen and (max-width: 813px) {
  .app-layout {
    display: grid;
    height: 100%;
    width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
 
  .navigation {
    position: fixed;
    top: 0px;
    left: -150px;

    width: 150px;
    height: 100%;

    background-color: var(--blue-2);
  }

  #navigation {
    margin-top: 65px;
  }

  .navigation-open {
    transform: translateX(150px);
    animation: nav-slide-open 450ms;
    animation-timing-function: ease-out;
  }

  .navigation-close {
    transform: translateX(0px);
    animation: nav-slide-close 450ms;
    animation-timing-function: ease-out;
  }

  @keyframes nav-slide-open {
    from { transform: translateX(0px); }
    to { transform: translateX(150px); }
  }

  @keyframes nav-slide-close {
    from { transform: translateX(150px); }
    to { transform: translateX(0px); }
  }

  .content {
    grid-column: 1;
    grid-row: 1;

    width: 100%;
    height: 100%;
  }

  .navigation-text-color {
    color: white;
  }

  .navigation-item-selected {
    color: #666666;
  }

  .menu-button {
    position: fixed;
    top: 0px;
    left: 0px;
  }
}

@media only screen and (min-width: 813px) {
  .app-layout {
    display: grid;
    column-gap: 0px;
    grid-template-columns: 150px 1fr;
    grid-template-rows: 1fr;
  }

  .navigation {
    grid-column: 1;
    position: fixed;
  }

  .content {
    grid-column:  2;
  }

  .menu-button {
    display: none;
  }

  .navigation-text-color {
    color: black;
  }

  .navigation-item-selected {
    color: var(--blue-5);
  }
}

</style>
