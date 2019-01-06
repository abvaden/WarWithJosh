<template>
  <div id="app" class="app-layout">
    <div :class="['navigation', {'navigation-open': !navigationOpen}]">
      <navigation id="navigation"/>
    </div>
    
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navigation from "@/components/Navigation.vue"
import { setInterval } from 'timers';


export default Vue.extend({
  name: "App",
  components: { 
    Navigation
  },
  computed: {
  },
  mounted(): void {
    setInterval(() => {
      this.navigationOpen = !this.navigationOpen;
    }, 1000);
  },
  data(): {navigationOpen: boolean, appDiv: Element | undefined} {
    return {
      navigationOpen: false,
      appDiv: undefined
    }
  }
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
    position: absolute;
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  /* 
  .navigation {
    position: absolute;
    top: 0;
    left: -150px;
    width: 150px;
    height: 100vh;
    overflow: hidden;
    animation: nav-slide-close 450ms;
    animation-timing-function: ease-out;

    background-color: var(--blue-2);
  }

  .navigation-open {
    left: 0px;
    animation: nav-slide-open 450ms;
    animation-timing-function: ease-out;
  }

  @keyframes nav-slide-open {
    from { left: -150px; }
    to { left: 0px; }
  }

  @keyframes nav-slide-close {
    from { left: 0px; }
    to { left: -150px; }
  } 
  */

  .navigation {
    position: absolute;
    top: 0px;
    left: 0px;

    width: 150px;
    height: 100vh;
    transform: translateX(-150px);
    animation: nav-slide-close 450ms;
    animation-timing-function: ease-out;

    background-color: var(--blue-2);
  }

  .navigation-open {
    transform: translateX(0px);
    animation: nav-slide-open 450ms;
    animation-timing-function: ease-out;
  }

  @keyframes nav-slide-open {
    from { transform: translateX(-150px); }
    to { transform: translateX(0px); }
  }

  @keyframes nav-slide-close {
    from { transform: translateX(0px); }
    to { transform: translateX(-150px); }
  }

  .content {
    overflow-y: scroll;
    width: 100%;
  }


}

@media only screen and (min-width: 813px) {
  .app-layout {
    display: grid;
    column-gap: 0px;
    grid-template-columns: 150px auto;
  }

  .navigation {
    grid-column: 1;
  }

  .content {
    grid-column:  2;
  }
}

</style>
