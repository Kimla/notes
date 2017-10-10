<template lang="pug">
    div.note( v-if="note" )
        div.note__header
            input( type="text" :value="note.title" placeholder="Title" ref="title" )
            div.note__buttons
                buttonIcon( @clicked="remove()" :icon="removeIcon" )
                buttonIcon( @clicked="save()" :icon="saveIcon" )

        div.note__content
            textarea( placeholder="Content" ref="content" :value="note.content" )
</template>

<script>
import {slugify} from '@/helpers/helpers';
import buttonIcon from '@/components/buttonIcon.vue';
import removeIcon from '@/assets/remove_icon.svg';
import saveIcon from '@/assets/save_icon.svg';

export default {
    name: 'note',
    components: {
        buttonIcon
    },
    data() {
        return {
            removeIcon,
            saveIcon,
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
.note {
    height: 100%;
    &__header {
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
    }
    &__content {
        height: calc(100% - 56px);
    }
    &__buttons {
        display: flex;
        padding: 0 15px;
    }
    .buttonIcon {
        margin-left: 10px;
    }
}

input,
textarea {
    border: 0;
    padding: 15px;
    width: 100%;
    background-color: #fff;
    border-radius: 0;
    outline: 0;
}

textarea {
    resize: none;
    height: 100%;
}
</style>
