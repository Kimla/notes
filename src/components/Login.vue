<template lang="pug">
    div.login.form
        h1 Login

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" v-model="email" )

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" v-model="password" )

        div.form__bottom
            div.register-link-holder
                router-link.form-link( to="/register" ) Don't have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Login' }" @clicked="login()" )
</template>

<script>
import firebase from 'firebase';
import buttonEl from '@/components/Button.vue'

export default {
    name: 'login',
    components: {
        buttonEl,
    },
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
            let notice = {
                message: 'You are now logged in!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);

            this.$router.replace('/');
        },
        handeError(err) {
            let notice = {
                message: 'You have entered an invalid username or password!',
                status: 'is-error',
            };

            this.$store.dispatch('showNotice', notice);
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
