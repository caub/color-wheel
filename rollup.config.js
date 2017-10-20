import babel from 'rollup-plugin-babel';

export default [{
	input: 'demo/index.js',
	output: {
		file: 'dist/color-wheel-demo.js',
		format: 'umd'
	},
	plugins: [
		babel()
	],
	watch: {
		exclude: ['node_modules/**']
	},
	external: ['react', 'react-dom', 'styled-components'],
	globals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'styled-components': 'styled'
	}
}, {
	input: 'src/index.js',
	output: {
		file: 'dist/color-wheel.js',
		format: 'es'
	},
	plugins: [
		babel()
	],
	external: ['react', 'styled-components'],
	globals: {
		'react': 'React',
		'styled-components': 'styled'
	}
}];