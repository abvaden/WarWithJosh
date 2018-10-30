import "reflect-metadata";

import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import { Container } from 'inversify';
import { CommandingModule, ICommandPublisher_IOC_Key, ICommandPublisher } from '@/logic/commanding';
import { UIModule } from '@/Bootstrap';
import { IGameState, GameState_IOC_Key, InitializeGameState } from '@/logic/models/gamestate';

export let container: Container;

import './assets/styles/global.css';
import './assets/styles/buttons.css';


const loadData = async (): Promise<IGameState> => {
  container = new Container();
  container.load(CommandingModule);
  container.load(UIModule);
  
  const commandPublisher = container.get<ICommandPublisher>(ICommandPublisher_IOC_Key);
  await commandPublisher.start();

  const gameState = container.get<IGameState>(GameState_IOC_Key);

  return gameState;
};


Vue.config.productionTip = false;
Vue.config.devtools = false;

loadData().then(x => {
  new Vue({
    render: (h) => {
      return h(App);
    },
    data: () => { return x; }
  }).$mount('#app');
});
