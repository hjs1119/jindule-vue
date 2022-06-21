import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLoading from 'vuejs-loading-plugin'
import Vuetify from 'vuetify/lib/framework'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueLoading)
Vue.use(Vuetify)

const vuetify = new Vuetify({})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
