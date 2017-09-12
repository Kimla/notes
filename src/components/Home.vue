<template lang="pug">
    div.home
        h1 Hello world
        buttonEl( :button="{ label: 'Logout' }" @Clicked="logout()" )
</template>

<script>
import firebase from 'firebase';
import buttonEl from '@/components/Button.vue'

export default {
    name: 'home',
    components: {
        buttonEl,
    },
    methods: {
        logout() {
            firebase.auth().signOut().then(() => {
                let notice = {
                    message: 'You are now logged out!',
                    status: 'is-success',
                };

                this.$store.dispatch('showNotice', notice);
                this.$router.replace('login');
            });
        }
    }
}
</script>

<style lang="scss">
</style>
