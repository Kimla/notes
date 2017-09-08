<template lang="pug">
    div.login
        div
            input( type="text" placeholder="email" v-model="email" )
        div
            input( type="password" placeholder="password" v-model="password" )
        div
            button( @click="login" ) Login
            button( @click="forgotPassword()" ) forgot password
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        forgotPassword() {
            firebase.auth().sendPasswordResetEmail(this.email).then(
                (user) => ( this.handleSuccess(user) ),
                (err) => ( this.handeError(err) ),
            )
        },
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => ( this.handleSuccess(user) ),
                (err) => ( this.handeError(err) ),
            )
        },
        handleSuccess(user) {
            this.$router.replace('/');
        },
        handeError(err) {
            console.log(err);
        }
    },
    created() {
        const currentUser = firebase.auth().currentUser;
        if ( currentUser ) {
            this.$router.replace('/');
        }
    }
}
</script>

<style lang="scss">
</style>
