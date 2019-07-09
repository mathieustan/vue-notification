import Vue from 'vue';
import App from './App.vue';
import VueNotification from '../..';

Vue.use(VueNotification);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
