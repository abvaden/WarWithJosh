<template>
  <div class="modal" 
       v-bind:class="{ modalopen: IsOpen }">
    <div class="modal-content">
      <div>
        <h3 class="consoleText">{{ Message }}</h3>
      </div>
      <div>
        <!-- <div v-on:click="closeDialog" class="consoleOption">
          <span class="consoleText">Close</span>
        </div>
        <div v-on:click="closeDialog" class="consoleOption">
          <span class="consoleText">Log in</span>
        </div> -->
        <div v-on:click="selectPlay" v-on:mouseenter="selectOption" class="consoleOption">
          <span class="consoleText consoleOptionSelected">Play</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { ToggleDialogCommand } from '@/logic/commands/toggle-dialog.command';
import { StartGameCommand } from "../logic/commands/start-game.command";

let commandPublisher: ICommandPublisher;

export default {
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.SetupDialog;
  },
  methods: {
    selectPlay: () => {
      const closeDialogCommand = new ToggleDialogCommand();
      closeDialogCommand.open = false;
      commandPublisher.publish(closeDialogCommand);

      const startGameCommand = new StartGameCommand();
      commandPublisher.publish(startGameCommand);
    },
    selectOption: () => {
      
    }
  }
}
</script>
<style scoped>
.modal {
    display: none; 
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
}

.modalopen {
  display: block;
}

.modal-content {
    background-color: #30312F;
    margin-top: 15%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 15%;
    padding: 20px;
    margin: 15% 5% 15% 5%; /* 15% from the top and centered */
    height: 70%;
    max-width: 90%;
    max-height: 70%;
}

.consoleText {
  color: #DCE5EB;
  font-size: 24px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.consoleOption {
  width: 33%;
  float: left;
}

.consoleOption :hover {
  font-weight: bold;
  text-decoration: underline;
}

.consoleOptionSelected span {
  font-size: 120%;
}

/* The Close Button */
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>
