import { terser } from 'rollup-plugin-terser';

import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    compact: true,
    file: 'dist/vue-notification.min.js',
    format: 'iife',
    name: 'VueNotification',
    exports: 'named',
    globals: { vue: 'Vue' },
  },
  plugins: [...base.plugins, terser()],
});

export default config;
