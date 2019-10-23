import Vue from 'vue'
import './plugins/vuetify'
import './plugins/veeValidate';
import App from './App.vue'
import VueRouter from 'vue-router';
import { router } from './routes/routes';
import { store } from './store/store';

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
