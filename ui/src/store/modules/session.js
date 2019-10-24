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
    
  },
  mutations: {

  }
}