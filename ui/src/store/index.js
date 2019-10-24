import Vue from "vue";
import Vuex from "vuex";

import user from '@/store/modules/user'
import session from '@/store/modules/session'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    session
  }
});
