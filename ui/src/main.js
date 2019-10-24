import Vue from 'vue'
import App from '@/App.vue'
import router from '@/routes/routes'
import store from '@/store/store'
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
