import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: ['src/index.js', 'src/Wheel.js', 'src/OpacityRange.js'],
  output: {
    dir: 'dist',
    format: 'es',
  },
  external: ['react', 'classnames', 'react-jss', 'styled-jss'],
  plugins: [
    resolve({
      jsnext: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  experimentalCodeSplitting: true,
};
