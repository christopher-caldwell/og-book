import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import Vuetify from '@/plugins/Vuetify'
import Vuelidate from '@/plugins/Vuelidate'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  Vuetify,
  Vuelidate
}).$mount('#app')
