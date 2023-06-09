import Vue from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import vuetify from '@/plugins/vuetify'
import vuelidate from '@/plugins/vuelidate'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  vuelidate,
  render: h => h(App)
}).$mount('#app')
