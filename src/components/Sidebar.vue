<template lang="pug">
    aside.sidebar
        div.sidebar__notes
            router-link.sidebar__note( :to="`/note/${note.key}/${note.slug}`" v-for="(note, key) in notes" :class="activeKey === note.key ? 'is-active' : ''" :key="note.key" )
                span( v-if="note.title" ) {{ note.title }}
                span( v-else ) (Unnamed)

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
        activeKey() {
            return this.$route.params.id;
        },
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
    height: calc(100% - 53px);
    top: 53px;
    border-right: 1px solid #ddd;
    display: none;
    @media (min-width: 760px) {
        display: block;
    }
    &__notes {
        margin-bottom: 20px;
    }
    &__note {
        color: #333;
        text-decoration: none;
        padding: 15px;
        border-bottom: 1px solid #ddd;
        display: block;
        font-size: 18px;
        background-color: #fff;
        transition: 0.25s;
        &.is-active,
        &:hover {
            background-color: #EEF3F8;
        }
    }
}
</style>
