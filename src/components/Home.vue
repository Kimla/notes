<template lang="pug">
    div.home
        div.inner
            h1 Your notes!

            div.notes
                router-link.note( :to="`/note/${key}`" v-for="(note, key) in notes" :key="key" )
                    h2 {{ note.title }}

        buttonEl( :button="{ label: 'Create note' }" @clicked="createNote()" )
        buttonEl( :button="{ label: 'Logout' }" @clicked="logout()" )
</template>

<script>
import firebase from 'firebase';
import buttonEl from '@/components/Button.vue'

export default {
    name: 'home',
    components: {
        buttonEl,
    },
    computed: {
        notes() {
            return this.$store.getters.notes;
        }
    },
    methods: {
        createNote() {
            this.$store.commit('createNote');
        },
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
.inner {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.10), 1px 2px 10px rgba(0, 0, 0, 0.08);
    padding: 30px 15px;
    margin-bottom: 30px;
}
.notes {
    .note {
        margin-bottom: 6px;
        line-height: 1.5;
        font-size: 16px;
    }
}
</style>
