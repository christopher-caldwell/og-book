import userServices from '@/services/user'

export default {
  state: {
    firstName: null,
    lastName: null,
    emailAddress: null,
    role: null
  },
  getters: {
    usersName(state){
      if(state.firstName && state.lastName) return `${state.firstName} ${state.lastName}`
    }
  },
  actions: {
    async registerUser({ commit, dispatch }, userInformation){
      try {
        const responseFromStoringUser = await userServices.register({...userInformation})
        commit('UPDATE_USER_INFORMATION', responseFromStoringUser)
        dispatch('session/beginNewSession', responseFromStoringUser.token)
      } catch(error) {
        console.log('reg error', error)
      }
    },
    restoreUserFromLocalStorage({ commit }){
      const previousUser = JSON.parse(localStorage.getItem('user'))
      if (previousUser) {
        commit('UPDATE_USER_INFORMATION', previousUser)
        dispatch('session/restoreSessionFromLocalStorage')
      }
    },
    logout({ commit, dispatch }){
      dispatch('session/endSession')
      commit('RESET_USER')
    }
  },
  mutations: {
    UPDATE_USER_INFORMATION(state, userInformation){
      localStorage.setItem('user',JSON.stringify(userInformation))
      state = {
        ...state,
        ...userInformation
      }
    },
    RESET_USER(state){
      state = {
        firstName: null,
        lastName: null,
        emailAddress: null,
        role: null
      }
    }
  }
}