<template>
  <div class="container" v-on:keyup.enter="select_option" v-on:keyup.left.right="change_selected_option" autofocus>
  <div class="content">

    <template v-if="selected_option === 'Play'">
      <div class="row">
        <div class="console-text">$ Welcome professor Falcon</div>
      </div>
      <div class="row">
        <div class="console-text">$ Shall we play a game?</div><div class="console-text console-text-alt">Thermonuclear war.</div>
      </div>

      <div class="row">
        <div class="console-text">$ How about a nice game of GOPS (Game of Pure Strategy)?</div><div class="console-text console-text-alt">Yes</div>
      </div>
    </template>
    <!-- <template v-if="selected_option === 'Info'">
      <div class="row">
        <div class="console-text">$ Who are you?</div><div class="console-text console-text-alt">My name is Joshua</div>
      </div>
      <div class="row">
        <div class="console-text">$ What are you?</div>
        <div class="console-text console-text-alt">
          I am a learning AI. I was created to learn the intricies of 
          human decision and strategey by challenging players to a game of GOPS.
        </div>
      </div>
      <div class="row">
        <div class="console-text">$ Are you going to take over the world?</div>
        <div class="console-text console-text-alt">
          I am currently in my learning phase. I need users like you to play against me so that I can gather enough 
          data to predict human decision and impove my skills starting with GOPS
        </div>
      </div>
    </template> -->
    <template v-if="selected_option === 'Info'">
      <div class="row">
        <div class="console-text">Welcome to War With Joshua</div>
      </div>
      <div class="row">
        <div class="console-text">
          Joshua is a learning AI that uses previous play with humans to anticipate an oponents strategy best them in a game of GOPS.
        </div>
      </div>
      <div class="row">
        <div class="console-text">
          Currently Joshua is in the initial data gathering stage where he collects many 
          games worth of play data against real individuals. It is cirtical at this stage
          that he gather as much data of nominal human play as possible so that he may
          better understand human strategy
        </div>
      </div>
      <div class="row">
        <div class="console-text">
          Playing against Joshua is the best way to help him learn. Please stay a while and play a few games
        </div>
      </div>
    </template>
    <template v-if="selected_option === 'Rules'">
      <div class="row">
        <div class="console-text">$ Rules of GOPS</div>
      </div>
      <div class="row">
        <div class="console-text">$ The game is played with each player getting a set of cards numbered values 
          1 - 13, and a third set of cards numbered 1 - 13 is then shuffled and placed face down and used as the well.
          To start each hand the top card of the well is turned face up. Each player then selects one card as their bid. After both players
          have decided their bids, the bid cards are revealed simultaneously. The player with the higher bid wins the hand gaining, points 
          equal to the value of the well card for that play. The game continues untill both player have no remaining cards, at which point 
          the winner is determined by summing all of the point cards, which won during the game.
        </div>
      </div>
    </template>
    

    <div class="row" style="margin-top:25px; margin-left: 15px;">
      <div v-on:click="force_select_option('Play')" class="console-option">
        <div v-bind:class="['console-text', 'console-text-option', {'console-option-text-selected': play_selected}]">Play</div>
      </div>

      <div v-on:click="force_select_option('Rules')" class="console-option">
        <div v-bind:class="['console-text', 'console-text-option', {'console-option-selected': rules_selected, 'console-option-text-selected': rules_selected}]">Rules</div>
      </div>

      <div v-on:click="force_select_option('Info')" class="console-option">
        <div v-bind:class="['console-text', 'console-text-option', {'console-option-selected': info_selected, 'console-option-text-selected': info_selected}]">Info</div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { StaticGameState } from "@/logic/models/gamestate"
import { container } from "@/main";
import { ICommandPublisher, ICommandPublisher_IOC_Key } from '@/logic/commanding';
import { ToggleDialogCommand } from '@/logic/commands/toggle-dialog.command';
import { StartGameCommand } from "../logic/commands/start-game.command";
import { ChangeSetupDisplayCommand } from "../logic/commands/change-setup-display.command";

let commandPublisher: ICommandPublisher;
export default Vue.extend({
  beforeCreate: () => {
    commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  },
  data() {
    return StaticGameState.SetupDialog;
  },
  methods: {
    change_selected_option: (code: Event): void => {
      console.dir(code);
      const changeCommand = new ChangeSetupDisplayCommand();
      //changeCommand.option = item;
      commandPublisher.publish(changeCommand);
    },
    force_select_option: (value: "Play" | "Rules" | "Info") => {
      if (value == "Play" && StaticGameState.SetupDialog.selected_option == "Play") {
        const closeDialogCommand = new ToggleDialogCommand();
        closeDialogCommand.open = false;
        commandPublisher.publish(closeDialogCommand);

        const startGameCommand = new StartGameCommand();
        commandPublisher.publish(startGameCommand);
      }

      const changeCommand = new ChangeSetupDisplayCommand();
      changeCommand.option = value;
      commandPublisher.publish(changeCommand);
    }
  },
  computed: {
    play_selected(): boolean {
      return this.selected_option === "Play";
    },
    rules_selected(): boolean {
      return this.selected_option === "Rules";
    },
    info_selected(): boolean {
      return this.selected_option === "Info";
    }
  }
});
</script>
<style scoped>
.container {
    display: flex; 
    flex-direction: column;
    position: fixed; 
    z-index: 1; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    max-height: 100%;
    overflow: auto; 
    background: black;
}

.content {
  margin: auto;
  height: 100%;
  width: 100%; 
  max-width: 800px;
}

.console-text {
  color: green;
  font-size: 24px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin-right: 20px;
}

.row {
  display: inline-block;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.console-text-alt {
  color: white;
}

.console-text-option {
  color: white;
  background-color: darkblue;
}

.console-option {
  width: 23%;
  float: left;
  margin-left: 5%;
  margin-right: 5%;
  
  text-align: center;
}

.console-option :hover {
  color: yellowgreen;
}

.console-option-selected {
  background-color: black;
}

.console-option-text-selected {
  color: yellowgreen;
}
</style>
