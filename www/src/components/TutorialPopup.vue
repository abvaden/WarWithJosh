<template>
  <div v-bind:class="['modal', {'modal-open': popup_open}]">
        <div class="modal-content">
            <div class="popup-title-bar">
                <div id="popup-title-text">War with Josh</div>
                <!-- <div class="button" id="exit-button">x</div> -->
            </div>

            <div class="popup-body" v-if="popup_display_body">
                <p>
                    Welcome to War with Josh <br /><br />
                    If you are new here we suggest trying out the tutorial first.
                </p>
            </div>

            <div class="popup-body" v-else-if="popup_display_loading">
                <div class="progress"></div>
            </div>

            <div class="popup-body error" v-else-if="popup_display_error">
                <p>
                    Welcome to War with Josh <br /><br />
                    If you are new here we suggest trying out the tutorial first.
                </p>
            </div>

            <div class="popup-footer">
                <!-- <span id="disable-checkbox"><input type="checkbox" v-bind:checked="popup_continue_to_display" id="disable-checkbox-input" @change="toggle_display_popup($event)"><label for="disable-checkbox-input">Disable Tutorial</label></span> -->
                <div class="button" id="tutorial-button"  v-on:click.stop="tutorial_button_click" v-if="popup_display_body">Tutorial</div>
                <div class="button" id="start-button" v-on:click.stop="start_game_click" v-if="popup_display_body">Play</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { tutorialDialogOpen, loading } from "../store/Dialog.module";
import { startGame } from "../store/Game.module";


export default Vue.extend({
  methods: {
      start_game_click(): void {
          this.$store.dispatch("startGame");
      },
      tutorial_button_click(): void {
        const store = this.$store;
        store.dispatch("startTutorial");
      }
  },
  computed: {
      popup_open(): boolean {
          return tutorialDialogOpen(this.$store);
      },
      popup_display_body(): boolean {
          return !loading(this.$store);
      },
      popup_display_loading(): boolean {
          return loading(this.$store);
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
    color: black;
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

#tutorial-button {
    margin-left: auto;
}
#exit-button {
    align-self: flex-start;
    color: rgba(0, 0, 0, 0.5);
    font-weight: bold;
    font-size: 1em;
    margin-right: 10px;
    margin-top: 5px;


    text-align: center;

    text-align: center;
    vertical-align: middle;

    background: #CFD8DC;
    color: black;
    padding: 3px;

}
#exit-button:hover {
    color: red;
}
#disable-checkbox {
    align-self: center;
}

.button {
    background-color: #2196F3;

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

.progress {
    border: 16px solid lightgray;
    border-top: 16px solid #9FA8DA;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
