import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import Promise from 'es6-promise/auto';



// To add to window
if (!window.Promise) {
    window.Promise = Promise;
}



Vue.use(Vuex);

export default new Vuex.Store({
    state,
    mutations,
    actions,
});