<template lang="pug">
    div.home
        div.inner
            h1 Hello!
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

    },
    methods: {

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
</style>
