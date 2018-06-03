import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: {
    index: 'src/index.js',
    Wheel: 'src/Wheel.js',
    OpacityRange: 'src/OpacityRange.js'
  },
  experimentalCodeSplitting: true,
  output: {
    dir: 'dist',
    format: 'es',
  },
  external: ['react', 'classnames', 'react-jss'],
  plugins: [
    resolve({
      jsnext: true,
    }),
    babel(),
  ],
};
