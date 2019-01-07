<template>
    <div class="navigation-container">
        <router-link to="/home" 
                   class="font-size-medium navigation-item navigation-text-color" 
                   active-class="navigation-item-selected font-weight-extra-heavy"
                   @click.native.stop="RouteClick"
                   tag="div">Home</router-link>
      
        <router-link to="/design" 
                    class="font-size-medium navigation-item navigation-text-color" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.stop="RouteClick"
                    tag="div">AI Design</router-link>
        <router-link to="/game" 
                    class="font-size-medium navigation-item navigation-text-color" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.capture="RouteClick"
                    tag="div">Game</router-link>
        <router-link to="/glossary" 
                    class="font-size-medium navigation-item navigation-text-color" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.capture="RouteClick"
                    tag="div">Glossary</router-link>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    methods: {
        RouteClick(): void {
            this.$emit("routeChanged");
        }
    }
})
</script>

<style scoped>
.navigation-container {
    display: flex;
    flex-direction: column;
    user-select: none;
}

.navigation-container:first-child {
    border-top-width: 2px;
}

.navigation-container:last-child {
    border-bottom-width: 2px;
}
.navigation-container > .navigation-item {
  border-left-width: 0px;
  border-right-width: 0px;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.navigation-item {
  margin-left: var(--margin-small);
  cursor: pointer;
  
  border-color: gray;
  border-style: solid;
  padding-top: var(--margin-small);
  padding-bottom: var(--margin-small);
}

.navigation-item:first-child {
    border-top-width: 0px;
}

.navigation-item:last-child {
    border-bottom-width: 0px;
}

.navigation-item:hover {
  text-decoration: underline;
  text-decoration-color: var(--blue-5);
}

.navigation-item-selected:hover {
    text-decoration: none;
}
</style>

