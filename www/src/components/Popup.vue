<template>
    <div v-bind:class="['modal', {'modal-open': popup_open}]">
        <div class="modal-content" :style="computedStyle">
            <div class="popup-title-bar">
                <slot name="header" />
            </div>

            <div class="popup-body">
                <slot name="body"/>
            </div>

            <div class="popup-footer">
                <slot name="footer"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { startGame as StartInteractiveGame, startTutorial } from "../store/Game.module";
import { tutorialDialogOpen, loading } from "../store/Dialog.module";
import { startGame as startGame } from "../store/GameBoard.module";


export default Vue.extend({
  props: {
      popup_open: {
          type: Boolean,
          required: true
      },
      backgroundColor: {
          type: String,
          required: false,
          default: ""
      }
  },
  computed: {
      computedStyle(): string {
          return (this.backgroundColor !== "") ? `background: ${this.backgroundColor}` : "";
      }
  }
});
</script>


<style scoped>
.modal {
    display: none; 
    z-index: 1; 
    width: 100%; 
    max-width: 100%;
    height: 100%; 
    max-height: 100%;
    overflow: hidden;
    background: transparent;
}

.modal-open {
    display: inline-block;
    background-color: rgba(0, 0, 0, .75);
}

.modal-content { 
    margin-top: 15%;
    margin-left: 15%;
    margin-right: 15%;
    margin-bottom: 15%;
    max-height: 70%;

    display: grid;
    
    grid-template-rows: .3fr 1 fr .3fr;


    background: white;

    border-radius: 15px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
}

.popup-title-bar {
    grid-row: 1;
    height: 50px;
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: space-between;
}

.popup-body {
    grid-row: 2;

    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
}

.popup-footer {
    grid-row: 3;

    display: flex;
    margin-left: 15px;
    margin-right: 5px;
}
</style>
