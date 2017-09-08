<template lang="pug">
    div.home
        h1 Hello world
        button( @click="logout()" ) logout
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'home',
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                this.$router.replace('login');
            });
        }
    }
}
</script>

<style lang="scss">
</style>
