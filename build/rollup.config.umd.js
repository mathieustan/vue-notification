import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-notification.umd.js',
    format: 'umd',
    name: 'VueNotification',
  },
});

export default config;
