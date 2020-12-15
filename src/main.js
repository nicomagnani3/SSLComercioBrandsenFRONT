import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./veevalidate";
import { BootstrapVue,BootstrapVueIcons   } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
import VueFormWizard from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
Vue.use(VueFormWizard)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)

import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'

Vue.use(VueGlide)

// register globally

import VueHotkey from 'v-hotkey'

Vue.use(VueHotkey)
import moment from 'moment'
Vue.filter('formatDate', function (value) {
      if (value) {
        return moment.utc(String(value)).format('DD-MM-YYYY')
      }
});

Vue.config.productionTip = false

new Vue({
   router,
   store,
  render: h => h(App), 
}).$mount('#app')
