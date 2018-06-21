import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');
// const libraryName = 'emotion-media-query';

const plugins = [
  // Compile TypeScript files
  typescript({ useTsconfigDeclarationDir: true }),
  // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
  commonjs(),
  // Allow node_modules resolution, so you can use 'external' to control
  // which external modules to include in the bundle
  // https://github.com/rollup/rollup-plugin-node-resolve#usage
  resolve(),
  // uglify
  terser({ warnings: true, safari10: true }),
  // Resolve source maps to the original source
  sourceMaps()
];

export default {
  input: `src/index.ts`,
  output: [
    // { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', 'emotion'],
  watch: {
    include: 'src/**'
  },
  plugins,
};
