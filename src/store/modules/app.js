import firebase from 'firebase';

export const state = {
    user: false,
};

export const getters = {
    user(state) {
        return state.user;
    }
};

export const mutations = {
    setUser: (state, payload) => {
        state.user = payload;
    }
};

export const actions = {

};
