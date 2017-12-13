import babel from 'rollup-plugin-babel';

export default {
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
};
