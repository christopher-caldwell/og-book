import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    popupShown: false,
    loading: false,
    apiUrl: "https://fr6pnyhq8e.execute-api.us-east-1.amazonaws.com/Stage",
    loggedInUser: {
      username: "billy",
      name: "Bill Nye",
      email: "bill@nye.scienceguy",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTcyNDYyNjgsImV4cCI6MTU1NzY3ODI2OH0.Ko6iKhj4XuDQ9vHS6ZpgDvUrAlXlVH8m2Wb8TSROSog"
    },
    popupInfo: {
      title: "",
      confirmation: "",
      content: ""
    },
    formPopup: false
  },
  getters: {},
  mutations: {
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    showPopup(state, payload) {
      state.popupShown = true;
      state.popupInfo = payload;
    },
    hidePopup(state) {
      state.popupShown = false;
    },
    toggleFormPopup(state, payload) {
      payload === "open" ? (state.formPopup = true) : (state.formPopup = false);
    }
  }
});
