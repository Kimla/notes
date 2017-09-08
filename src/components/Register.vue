<template lang="pug">
    div.register
        div
            input(type="text" placeholder="email" v-model="email")
        div
            input(type="password" placeholder="password" v-model="password")
        div
            button( @click="register()" ) Register
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'register',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        register() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => ( this.handleSuccess(user) ),
                (err) => ( this.handeError(err) ),
            )
        },
        handleSuccess(user) {
            this.$router.push({ path: '/' });
        },
        handeError(err) {
            console.log(err);
        }
    },
    created() {
        console.log("hello?");
        const currentUser = firebase.auth().currentUser;
        if ( currentUser ) {
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="scss">
</style>
