import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store';
import firebase from 'firebase'

Vue.config.productionTip = false

let config = {
    apiKey: "AIzaSyDhLfMC5caoWyEvZNrVKk15lsrwOILvP80",
    authDomain: "notes-23d10.firebaseapp.com",
    databaseURL: "https://notes-23d10.firebaseio.com",
    projectId: "notes-23d10",
    storageBucket: "notes-23d10.appspot.com",
    messagingSenderId: "33467293471"
};
firebase.initializeApp(config);

/* eslint-disable no-new */
let app;
firebase.auth().onAuthStateChanged((user) => {
    if ( !app ) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})
