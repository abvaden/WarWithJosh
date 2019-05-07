<template>
    <div class="navigation-container">
        <router-link to="/home" 
                   class="font-size-medium navigation-item font-color-alt-primary" 
                   active-class="navigation-item-selected font-weight-extra-heavy"
                   @click.native.stop="RouteClick"
                   tag="div">
            <h3>Home</h3>
        </router-link>
      
        <router-link to="/design" 
                    class="font-size-medium navigation-item font-color-alt-primary" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.stop="RouteClick"
                    tag="div">
            <h3>AI Design</h3>
        </router-link>

        <router-link to="/game" 
                    class="font-size-medium navigation-item font-color-alt-primary" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.capture="RouteClick"
                    tag="div">
            <h3>Game</h3>
        </router-link>

        <router-link to="/glossary" 
                    class="font-size-medium navigation-item font-color-alt-primary" 
                    active-class="navigation-item-selected font-weight-extra-heavy"
                    @click.native.capture="RouteClick"
                    tag="div">
            <h3>Glossary</h3>
        </router-link>
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
    height: 100vh;
    background-color: var(--blue-5);
    flex-direction: column;
    user-select: none;
}


.navigation-container h3 {
    margin-top: 0px;
    margin-bottom: 0px;
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
  padding-left: 15px;
  padding-right: 15px;
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
  text-decoration-color: var(--text-alt-primary);
  background-color: var(--blue-3);
}

.navigation-item-selected:hover {
    text-decoration: none;
}

.navigation-item-selected h3 {
    color: var(--text-alt-secondary)
}
</style>
