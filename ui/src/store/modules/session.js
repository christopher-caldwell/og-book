import { timeSessionIsValid } from '@/store/constants'

export default {
  state: {
    token: null,
    expiredDate: null
  },
  getters: {
    isSessionValid(state){
      return state.expiredDate > Date.now()
    } 
  },
  actions: {
    beginNewSession({ commit }, token){
      commit('UPDATE_SESSION', token)
    },
    restoreSessionFromLocalStorage({ commit }){
      const previousSession = JSON.parse(localStorage.getItem('session'))
      if(previousSession && previousSession > Date.now()){
        commit('UPDATE_SESSION', previousSession.token)
      }
    },
    endSession({ commit }){
      commit('END_SESSION')
    }
  },
  mutations: {
    UPDATE_SESSION(state, token){
      state.token = token
      state.expiredDate = Date.now() + timeSessionIsValid
    },
    END_SESSION(state){
      state.token = ''
      expiredDate = 0
    }
  }
}