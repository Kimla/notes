<template lang="pug">
    div.buttonIcon( @click="clicked()" )
        div.buttonIcon__inner
            img.buttonIcon__icon( :src="icon" )
</template>

<script>

export default {
    name: 'buttonIcon',
    props: ['icon'],
    methods: {
        clicked() {
            this.$emit('clicked');
        }
    }
}
</script>

<style lang="scss">
.buttonIcon {
    cursor: pointer;
    &__inner {

    }
    &__icon {
        height: 30px;
        width: auto;
    }
}
</style>
