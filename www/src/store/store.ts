import Vue from 'vue';
import * as Vuex from "vuex";


Vue.use(Vuex);

type RootContext = Vuex.ActionContext<RootState, RootState>;
export interface RootState {
}

export const store = new Vuex.Store<RootState>({});
