import Vue from 'vue';
import Vuex from 'vuex';
import * as app from './modules/app';
import * as notes from './modules/notes';
import * as notice from './modules/notice';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        app,
        notes,
        notice,
    }
});
