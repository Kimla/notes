<template lang="pug">
    aside.sidebar
        div.sidebar__notes
            router-link.sidebar__note( :to="`/note/${note.key}/${note.slug}`" v-for="(note, key) in notes" :class="activeKey === note.key ? 'is-active' : ''" :key="note.key" )
                span( v-if="note.title" ) {{ note.title }}
                span( v-else ) (Unnamed)

        button.sidebarButton( @click="createNote()" )
            div.sidebarButton__inner
                img.sidebarButton__icon( :src="noteIcon" )
                span.sidebarButton__label Create new note

        button.sidebarButton(  @click="logout()" )
            div.sidebarButton__inner
                img.sidebarButton__icon( :src="logoutIcon" )
                span.sidebarButton__label Logout
</template>
<script>
import firebase from 'firebase';
import noteIcon from '@/assets/note.svg';
import logoutIcon from '@/assets/logout.svg';

export default {
    name: 'sidebar',
    data() {
        return {
            noteIcon,
            logoutIcon
        }
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
.sidebarButton {
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    background-color: #2196F3;
    color: #fff;
    margin-bottom: 4px;
    cursor: pointer;
    &__inner {
        display: flex;
        align-items: center;
        padding: 15px;
    }
    &__icon {
        width: 20px;
        height: auto;
    }
    &__label {
        margin-left: 10px;
    }
}
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
