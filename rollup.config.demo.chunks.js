import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

export default {
  input: 'demo/index.js',
  experimentalCodeSplitting: true,
  // manualChunks: {
  //   'vendor': ['react', 'react-dom', 'react-jss', 'classnames']
  // },
  output: {
    dir: 'demo/dist',
    format: 'es',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**',
      exclude: ['src/**', 'demo/**'],
    }),
    babel(),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
};
