<template lang="pug">
    div#app
        router-view
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'app',
    data() {
        return {
            loaded: false,
        }
    }
}
</script>

<style lang="scss">

</style>
