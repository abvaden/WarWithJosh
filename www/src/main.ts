import "reflect-metadata";

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { router } from './router';
import { store } from "./store/store";

//import './registerServiceWorker';


import './assets/styles/global.css';
import './assets/styles/buttons.css';


Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(VueRouter);

new Vue({
  render: (h) => {
    return h(App);
  },
  router,
  store,
}).$mount('#app');