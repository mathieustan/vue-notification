import { Notification } from './components';

const install = (Vue, opts = {}) => {
  Notification.options = opts;
  Vue.prototype.$notify = Notification;
};

// Plugin
const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
};

export default plugin;

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}
