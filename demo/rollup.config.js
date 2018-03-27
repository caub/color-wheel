import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: ['index.js', 'vendor.js'],
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    resolve({
      jsnext: true,
      customResolveOptions: {
        moduleDirectory: ['node_modules', '../node_modules'],
      },
    }),
    commonjs({
      include: ['node_modules/**', '../node_modules/**'],
    }),
    babel({
      exclude: ['node_modules/**', '../node_modules/**'],
    }),
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
  experimentalCodeSplitting: true,
};
