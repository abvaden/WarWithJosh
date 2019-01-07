<template>
  <div v-bind:class="['modal', {'modal-open': popup_open}]">
        <div class="modal-content">
            <div class="popup-title-bar">
                <div id="popup-title-text">Error</div>
            </div>

            <div class="popup-body error">
                <p>
                    {{ error_message }}
                </p>
            </div>

            <div class="popup-footer">
                <div class="button" id="dismiss-button" v-on:click.stop="dismiss_click">Dismiss</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { errorDialogOpen, errorMessage, openDialog, DialogType } from "../store/Dialog.module";

export default Vue.extend({
  methods: {
      dismiss_click() {
        openDialog(this.$store, DialogType.Tutorial);
      },
  },
  computed: {
      popup_open(): boolean {
          return errorDialogOpen(this.$store);
      },
      error_message(): string {
          return errorMessage(this.$store);
      }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    max-width: 100%;
    height: 100%; 
    max-height: 100%;
    overflow: auto; 
    background: transparent;
}

.modal-open {
    display: block;
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

#popup-title-text {
    align-self: flex-start;
    color: var(--error-text-color);
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 25px;
    font-weight: bold;
    font-size: 1.6em;
}

.popup-body {
    grid-row: 2;

    color: black;
    margin-left: 15px;
    margin-right: 15px;

}

.popup-footer {
    grid-row: 3;

    display: flex;
    margin-left: 15px;
    margin-right: 5px;
}

.button {
    background-color: var(--error-text-color);

    color: white;
    width: min-content;

    border-color: black;
    border-style: solid;
    border-radius: 5px;
    border-width: 2px;


    padding-left: 15px;
    padding-right: 15px;
    padding-top: 5px;
    padding-bottom: 5px;

    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
}

.button:hover {
    border-color: gray;
    color: black;
    filter: brightness(125%);
}

#dismiss-button {
    margin-left: auto;
}
</style>
