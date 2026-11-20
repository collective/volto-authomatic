import { defineConfig } from 'vitest/config';
import voltoVitestConfig from '@plone/volto/vitest.config.mjs';
import path from 'path';

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
          '@plone-collective/volto-authomatic': path.resolve(__dirname, 'src'),
        },
      },
    })),
  },
});
