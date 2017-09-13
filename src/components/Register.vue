<template lang="pug">
    div.register.form
        h1 Register

        div.input-holder
            label.label( for="email" ) Email
            input.input( type="email" id="email" name="email" v-model="email")

        div.input-holder
            label.label( for="password" ) Password
            input.input( type="password" id="password" name="password" v-model="password" )

        div.form__bottom
            div.login-link-holder
                router-link.form-link( to="/login" ) Already have an account?

            div.button-holder
                buttonEl( :button="{ label: 'Register' }" @clicked="register()" )
</template>

<script>
import firebase from 'firebase';
import buttonEl from '@/components/Button.vue'

export default {
    name: 'register',
    components: {
        buttonEl,
    },
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
            let notice = {
                message: 'Good job, your account is now created!',
                status: 'is-success',
            };

            this.$store.dispatch('showNotice', notice);

            this.$router.push({ path: '/' });
        },
        handeError(err) {

            let message = 'Try again!';

            if ( err.code === "auth/email-already-in-use" ) {
                message = "This user allready exists!";
            } else if ( true ) {
                message = err.message;
            }

            let notice = {
                message: message,
                status: 'is-error',
            };

            this.$store.dispatch('showNotice', notice);
        }
    },
    created() {
        const currentUser = firebase.auth().currentUser;
        if ( currentUser ) {
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="scss">
</style>
