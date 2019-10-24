import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/modules/user'
import session from '@/store/modules/session'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    applicationIsReady: false
  },
  getters: {},
  actions: {
    boot({ commit, dispatch }) {
      dispatch('restoreSessionFromLocalStorage')
      dispatch('restoreUserFromLocalStorage')
      commit('APPLICATION_READY')
    }
  },
  mutations: {
    APPLICATION_READY(state) {
      state.applicationIsReady = true
    }
  },
  modules: {
    user,
    session
  }
})
