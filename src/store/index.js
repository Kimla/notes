import Vue from 'vue';
import Vuex from 'vuex';
import * as notice from './modules/notice';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        notice,
    }
});
