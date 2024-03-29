
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import VueSocketio from 'vue-socket.io';
import router from './router'
import { detectRequest } from './common.js';
// import './plugins/click-away'

import './scss/app.scss';
const appUrl = window.location.hostname == 'localhost' ? 'http://localhost:8001' : 'https://api.typing.mn';
const token = localStorage.getItem('token');
Vue.prototype.$newSocket = VueSocketio;
Vue.prototype.$appUrl = appUrl;
Vue.prototype.$_request = detectRequest;
Vue.prototype.$axios = axios;
Vue.use(ElementUI, { locale })
Vue.use(Antd);

Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);


if(token != null) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
}

window.Event = new Vue();


Event.$on('set-user-point', (point) => {
  var user = JSON.parse(localStorage.getItem('user'));
  user.point = point;
  localStorage.user = JSON.stringify(user);
});

Event.$on('logged-new-user', () => {
  const token = localStorage.getItem('token');
    if(token != null) {
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')