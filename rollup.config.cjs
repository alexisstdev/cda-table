const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json'); // <-- Import the JSON plugin
const packageJson = require('./package.json');

module.exports = {
  input: 'src/index.jsx', // Entry point for your library
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
    }),
    json(), // <-- Use the JSON plugin here
  ],
  external: [
    'react',
    'react-dom',
    '@chakra-ui/react',
    '@emotion/react',
    '@emotion/styled',
  ],
};
