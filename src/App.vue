<template lang="pug">
    div#app
        pageHeader

        div.page-wrapper
            div.page-wrapper__inner
                transition(name="transform" mode="out-in" appear)
                    router-view

        sidebar
        notice
</template>

<script>
import firebase from 'firebase';
import pageHeader from './components/Header';
import notice from './components/Notice';
import sidebar from './components/Sidebar';

export default {
    name: 'app',
    components: {
        pageHeader,
        sidebar,
        notice,
    },
    data() {
        return {
            loaded: false,
        }
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if ( user ) {
                const notesRef = firebase.database().ref('users/' + user.uid + '/notes');
                notesRef.on('value', (snap) => this.$store.commit('setNotes', snap.val()));
                this.$store.commit('setUser', user);
                this.$store.commit('setNotesRef', notesRef);
            }
        });
    }
}
</script>

<style src="normalize.css/normalize.css"></style>
<style lang="scss">
    @import './style/style';
    * {
        box-sizing: border-box;
    }
    html,
    body {
        height: 100%;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont,
        "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans",
        "Droid Sans", "Helvetica Neue", sans-serif;
        letter-spacing: 0.5px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 18px;
        color: #333;
        background-color: #f5f5f5;
    }
    .page-wrapper {
        margin-left: 300px;
        width: calc(100% - 300px);
        &__inner {
            width: 1200px;
            padding: 30px;
            max-width: 100%;
        }
    }
    .transform-enter {
        opacity: 0;
        transform: translateY(30px)
    }

    .transform-enter-active {
        transition: 0.25s;
    }

    .transform-leave {

    }

    .transform-leave-active {
        transition: 0.25s;
        opacity: 0;
    }
    button {
        padding: 0;
        margin: 0;
        border: 0;
        outline: 0;
    }
    a {
        color: #2196F3;
    }
    ul,
    p,
    h1,
    h2,
    h3,
    h4 {
        margin: 0;
        padding: 0;
    }
    h1,
    h2,
    h3,
    h4 {
        font-weight: 300;
    }
    .page {
        padding: 30px 15px;
    }
    h1 {
        font-size: 28px;
        margin-bottom: 20px;
    }
    p {
        margin-bottom: 20px;
        line-height: 1.3;
    }
    b,
    strong {
        font-weight: 600;
    }
</style>
