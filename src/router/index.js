import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Note from '@/components/Note'

Vue.use(Router)

export const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/note/:id/:slug',
            name: 'noteWithSlug',
            component: Note
        },
        {
            path: '/note/:id/',
            name: 'noteWithoutSlug',
            component: Note
        }
    ]
})
