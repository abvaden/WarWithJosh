<template>
    <popup :popup_open="open">
        <template slot="header">
            <div class="popup-title-text">War with Josh</div>
        </template>

        <template slot="body">
            <p>
                Welcome to War with Josh <br />
                <br />
                If you are new here we suggest trying out the tutorial first.<br />
                <br />
            </p>
        </template>

        <template slot="footer">
            <div class="button" id="tutorial-button"  v-on:click.stop="tutorial_button_click" v-if="popup_display_body">Tutorial</div>
            <div class="button" id="start-button" v-on:click.stop="start_game_click" v-if="popup_display_body">Play</div>
        </template>
    </popup>
  
</template>

<script lang="ts">
import Vue from "vue";
import Popup from "../Popup.vue";

import { tutorialDialogOpen, loading } from "../../store/Dialog.module";
import { startGame as startGame } from "../../store/GameBoard.module";


export default Vue.extend({
    props: {
        open: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        Popup
    },
  methods: {
      start_game_click(): void {
          this.$emit("play-clicked");
      },
      tutorial_button_click(): void {
          this.$emit("tutorial-clicked");
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


<style src="../../assets/styles/text-style.css"></style>
<style scoped>

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

</style>
