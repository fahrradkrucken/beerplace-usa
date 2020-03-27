import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'material-design-icons/iconfont/material-icons.css'
import 'leaflet/dist/leaflet.css';
import '@/assets/_main.scss';

Vue.config.productionTip = false;

Vue.prototype.$eventBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
