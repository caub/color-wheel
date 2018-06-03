import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

const useGlobalImports = {
  transformBundle: source =>
    source.replace(/^import (\w+).*$/gm, '// $1 defined from unpkg')
}

export default {
  input: 'demo/index.js',
  // experimentalCodeSplitting: true,
  // manualChunks: {
  //   'vendor': ['react', 'react-dom', 'react-jss', 'classnames']
  // },
  output: {
    file: 'demo/dist/index.js',
    format: 'es',
  },
  external: ['react-dom', 'react', 'classnames', 'react-jss'], // it makes bundle too big else..
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    resolve({
      jsnext: true
    }),
    // commonjs({
    //   include: 'node_modules/**',
    //   exclude: ['src/**', 'demo/**'],
    // }),
    babel(),
    useGlobalImports
  ],
  watch: {
    exclude: ['node_modules/**'],
  },
};
