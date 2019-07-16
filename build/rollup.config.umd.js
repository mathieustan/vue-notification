import { terser } from 'rollup-plugin-terser';

import base from './rollup.config.base';

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-notification.umd.js',
    format: 'umd',
    name: 'VueNotification',
    exports: 'named',
    globals: { vue: 'Vue' },
  },
  plugins: [...base.plugins, terser()],
});

export default config;
