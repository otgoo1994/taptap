

import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import VueSocketio from 'vue-socket.io';
import router from './router';
import { detectRequest, keyboards, createEvent, methods } from './common.js';
import GAuth from 'vue-google-oauth2';
// import './plugins/click-away'
import VueQRCodeComponent from 'vue-qrcode-component'

import './scss/app.scss';

const appUrl = window.location.hostname == 'localhost' ? 'http://localhost:8001' : 'https://api.typing.mn';
const token = localStorage.getItem('token');


const gauthOption = {
  clientId: '76197459130-fsnge4nig8e3qje6ughaene2hp3u0dgj.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

// Vue.use(GAuth, gauthOption);

Vue.prototype.$newSocket = VueSocketio;
Vue.prototype.$appUrl = appUrl;
Vue.prototype.$axios = axios;
Vue.prototype.$_request = detectRequest;
Vue.prototype.$_keyboards = keyboards;
Vue.prototype.$_event = createEvent;
Vue.prototype.$_method = methods;
Vue.use(ElementUI);
Vue.component('qr-code', VueQRCodeComponent)
Vue.use(Antd);

Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);


if(token != null) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    Vue.use(new VueSocketio({
        debug: false, 
        connection: appUrl,
        options : { query: { token: token } },
        vuex: {
          actionPrefix: 'SOCKET_',
          mutationPrefix: 'SOCKET_'
        }
    }));
}

window.Event = new Vue();

Event.$on('member', () => {
    const tokenReplace = localStorage.getItem('token');
    if(tokenReplace != null) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + tokenReplace;        
        Vue.use(new VueSocketio({
            debug: false, 
            connection: appUrl,
            options : { query: { token: tokenReplace } },
            vuex: {
              actionPrefix: 'SOCKET_',
              mutationPrefix: 'SOCKET_'
            }
        }));
    }
});

Event.$on('set-user-point', (point) => {
  var user = JSON.parse(localStorage.getItem('user'));
  user.point = point;
  localStorage.user = JSON.stringify(user);
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')