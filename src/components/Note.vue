<template lang="pug">
    div.note( v-if="note" )
        div
            input( type="text" :value="note.title" placeholder="Title" ref="title" )

        div
            textarea( placeholder="Content" ref="content" :value="note.content" )

        div
            buttonEl( :button="{ label: 'Back', link: '/' }" )
            buttonEl( @clicked="remove()" :button="{ label: 'Remove' }" )
            buttonEl( @clicked="save()" :button="{ label: 'Save' }" )
</template>

<script>
import {slugify} from '@/helpers/helpers';
import buttonEl from '@/components/Button.vue';

export default {
    name: 'note',
    components: {
        buttonEl,
    },
    data() {
        return {
            title: '',
            content: '',
        }
    },
    computed: {
        note() {
            const notes = this.$store.getters.notes;
            const id = this.$route.params.id;

            if ( !notes || notes.length < 1 ) {
                return false;
            }

            for (var i = 0; i < notes.length; i++) {
                if ( notes[i].key === id ) {
                    return notes[i];
                }
            }

            return false;
        }
    },
    methods: {
        remove() {
            this.$store.commit('removeNote', this.$route.params.id);

            let notice = {
                message: 'Your note is now removed!',
                status: 'is-success',
            };

            this.$router.replace('/');

            this.$store.dispatch('showNotice', notice);
        },
        save() {
            const data = {
                id: this.$route.params.id,
                note: {
                    title: this.$refs.title.value,
                    slug: slugify(this.$refs.title.value),
                    content: this.$refs.content.value,
                    updated_at: Date.now(),
                }
            };
            this.$store.commit('updateNote', data);

            let notice = {
                message: 'Your note is now saved!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);
            this.$router.replace(`/note/${data.id}/${data.note.slug}`);
        },
        handleKeyDown(e) {
            const self = this;
            if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey))      {
                e.preventDefault();
                self.save();
            }
        }
    },
    created() {
        document.addEventListener("keydown", this.handleKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleKeyDown);
    },
}
</script>

<style lang="scss" scoped>
    input,
    textarea {
        border: 0;
        padding: 15px;
        width: 100%;
        margin-bottom: 30px;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0px 8px 28px rgba(0, 0, 0, 0.10), 1px 2px 10px rgba(0, 0, 0, 0.08);
        outline: 0;
    }

    textarea {
        resize: none;
        height: 240px;
    }
</style>
