import "reflect-metadata";

import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import { Container } from 'inversify';
import { UIModule } from '@/Bootstrap';

import { createStore } from "./store/store";

import './assets/styles/global.css';
import './assets/styles/buttons.css';
import { IConnectionService, IConnectionService_IOC_Key } from './logic/services/Interfaces';


const container = new Container();
container.load(UIModule);

const store = createStore(container);

Vue.config.productionTip = false;
Vue.config.devtools = true;

const connectionService = container.get<IConnectionService>(IConnectionService_IOC_Key);
connectionService.Start();

new Vue({
  render: (h) => {
    return h(App);
  },
  store,
}).$mount('#app');