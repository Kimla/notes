<template lang="pug">
    aside.sidebar
        div.notes
            router-link.note( :to="`/note/${note.key}/${note.slug}`" v-for="(note, key) in notes" :key="note.key" )
                h2( v-if="note.title" ) {{ note.title }}
                h2( v-else ) (Unnamed)

        buttonEl( :button="{ label: 'Create note' }" @clicked="createNote()" )
        buttonEl( :button="{ label: 'Logout' }" @clicked="logout()" )
</template>
<script>
import firebase from 'firebase';
import buttonEl from '@/components/Button.vue';

export default {
    name: 'sidebar',
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

                this.$store.commit('resetNotes');
                this.$store.dispatch('showNotice', notice);
                this.$router.replace('/login');
            });
        }
    }
}
</script>

<style lang="scss">
.sidebar {
    position: fixed;
    background-color: #fff;
    width: 300px;
    top: 0;
    left: 0;
    height: 100%;
    padding: 30px;
    top: 53px;
}
.notes {
    .note {
        margin-bottom: 6px;
        line-height: 1.5;
        font-size: 16px;
    }
}
</style>
