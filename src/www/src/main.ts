import "reflect-metadata";

import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { Container } from 'inversify';
import { CommandingContainerModule, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { UIModule } from '@/Bootstrap';
import { IGameState, GameState_IOC_Key } from '@/logic/models/gamestate';
import { OpenDialogCommand } from '@/logic/commands/open-dialog.command';

export let container: Container;

import './assets/styles/global.css';

const loadData = async (): Promise<IGameState> => {
  container = new Container();
  container.load(CommandingContainerModule);
  container.load(UIModule);
  
  const commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  await commandPublisher.start();

  const gameState = container.get<IGameState>(GameState_IOC_Key);

  return gameState;
};


Vue.config.productionTip = false;

loadData().then(x => {
  new Vue({
    render: (h) => {
      return h(App);
    },
    data: () => { return x; }
  }).$mount('#app');
});
