import Vue from "vue";
import Vuex from "vuex";

import user from '@/store/modules/user'
import session from '@/store/modules/session'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    applicationIsReady: false
  },
  getters: {
    isApplicationReady(state){
      return state.isApplicationReady
    }
  },
  actions: {
    boot({ commit, dispatch }){
      dispatch('session/restoreSessionFromLocalStorage')
      dispatch('user/restoreUserFromLocalStorage')
      commit('APPLICATION_READY')
    }
  },
  mutations: {
    APPLICATION_READY(state){
      state.applicationIsReady = true
    }
  },
  modules: {
    user,
    session
  }
});
