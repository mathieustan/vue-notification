import { terser } from 'rollup-plugin-terser';

import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-notification.min.js',
    format: 'iife',
    name: 'VueNotification',
  },
});

config.plugins.push(terser());

export default config;
