import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

const voltoModules = path.resolve(
  __dirname,
  '../../core/packages/volto/node_modules',
);

// Libraries the add-on uses through Volto, which provides them at runtime.
// They are not dependencies of the add-on package, so tests resolve them
// from Volto's own node_modules.
const voltoProvided = Object.fromEntries(
  ['react-cookie', 'react-redux', 'react-router-dom'].map((name) => [
    name,
    path.join(voltoModules, name),
  ]),
);

export default defineConfig({
  ...voltoVitestConfig,
  resolve: {
    alias: {
      '@plone/volto': path.resolve(__dirname, '../../core/packages/volto/src'), // Add paths accordingly
      // 'promise-file-reader': require.resolve('promise-file-reader') // Add to identify dependency from package
    },
  },
  test: {
    ...voltoVitestConfig.test,
    // Vitest projects do not inherit the root resolve.alias, so the add-on
    // alias is added to each project. The add-on imports itself by package
    // name, which Volto resolves at build time.
    projects: voltoVitestConfig.test.projects.map((project) => ({
      ...project,
      resolve: {
        ...project.resolve,
        alias: {
          ...project.resolve?.alias,
          ...voltoProvided,
          '@plone-collective/volto-authomatic': path.resolve(__dirname, 'src'),
        },
      },
    })),
  },
});
