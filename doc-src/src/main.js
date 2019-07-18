import Vue from 'vue';
import App from './App.vue';
import VueNotification from '../..';

Vue.use(VueNotification, {
  breakpoints: {
    0: {
      bottom: true,
    },
    480: {
      top: true,
      right: true,
    },
  },
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
