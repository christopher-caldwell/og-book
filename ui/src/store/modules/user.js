import userServices from '@/services/user'

export default {
  state: {
    firstName: null,
    lastName: null,
    emailAddress: null,
    role: null
  },
  getters: {

  },
  actions: {
    async registerUser({ commit }, userInformation){
      try {
        const responseFromStoringUser = await userServices.register({...userInformation})
        commit('UPDATE_USER_INFORMATION', responseFromStoringUser)
      } catch(error) {
        console.log('reg error', error)
      }
    }
  },
  mutations: {
    UPDATE_USER_INFORMATION(state, userInformation){
      state = {
        ...state,
        ...userInformation
      }
    }
  }
}