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
import { StaticGameState } from "@/logic/models/gamestate"
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { container } from '@/main';
import { RequestStartGameCommand } from "@/logic/commands/request-start-game.command";
import { ToggleDialogCommand } from "@/logic/commands/toggle-dialog.command";
import { ChangeTutorialPopupPersistanceCommand } from '@/logic/commands/change-tutorial-popup-persistance.command';
import { StartTutorialCommand } from '@/logic/commands/start-tutorial.command';

let commandPublisher: ICommandPublisher;

export default Vue.extend({
  beforeCreate: () => {
      commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.Tutorial;
  },
  methods: {
      toggle_display_popup(value: Event): void {
          const changeElement = value.target;
          if (changeElement == null) {
              return;
          }
          const inputElement = changeElement as HTMLInputElement;
          const changePopupPersistanceCommand = new ChangeTutorialPopupPersistanceCommand();
          changePopupPersistanceCommand.value = !inputElement.checked;

          commandPublisher.publish(changePopupPersistanceCommand);
      },
      start_game_click: () => {
          const requestStartGameCommand = new RequestStartGameCommand();
          commandPublisher.publish(requestStartGameCommand);
      },
      tutorial_button_click: () => {
          const startTutorialCommand = new StartTutorialCommand();
          commandPublisher.publish(startTutorialCommand);

          const closeDialogCommand = new ToggleDialogCommand();
          closeDialogCommand.open = false;
          commandPublisher.publish(closeDialogCommand);
      }
  },
  computed: {
      popup_open(): boolean {
          return this.show_popup;
      },
      popup_continue_to_display(): boolean {
          return !this.continue_to_show;
      },
      popup_display_body(): boolean {
          return !this.is_loading;
      },
      popup_display_loading(): boolean {
          return this.is_loading;
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
