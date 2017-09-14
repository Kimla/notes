import firebase from 'firebase';
import {router} from '../../router';

export const state = {
    notesRef: false,
    notes: [],
};

export const getters = {
    notes(state) {
        return state.notes;
    },
};

export const mutations = {
    setNotesRef: (state, payload) => {
        state.notesRef = payload;
    },
    createNote: (state, payload) => {
        var newPostRef = state.notesRef.push({
            'title': '',
            'content': ''
        });
        router.push('/note/' + newPostRef.key);
    },
    removeNote: (state, payload) => {
        var user = firebase.auth().currentUser;
        let noteRef = firebase.database().ref('users/' + user.uid + '/notes/' + payload);
        noteRef.remove();
    },
    updateNote: (state, payload) => {
        var user = firebase.auth().currentUser;
        let noteRef = firebase.database().ref('users/' + user.uid + '/notes/' + payload.id);
        noteRef.update(payload.note);
    },
    setNotes: (state, payload) => {
        state.notes = payload;
    }
};

export const actions = {

};
