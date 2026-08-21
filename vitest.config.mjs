import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { defineConfig } from 'vitest/config';
import { transformWithEsbuild } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const workspaceRoot = path.resolve(__dirname, '../..');
const voltoRoot = fs.existsSync(path.join(workspaceRoot, 'core/packages/volto')) ? path.join(workspaceRoot, 'core/packages/volto') : path.dirname(fileURLToPath(import.meta.resolve('@plone/volto/package.json')));
const requireFromVolto = createRequire(path.join(voltoRoot, 'package.json'));

function resolvePackageRoot(packageName, workspacePath) {
  const localPath = path.join(workspaceRoot, workspacePath);
  if (fs.existsSync(localPath)) return localPath;
  return path.dirname(requireFromVolto.resolve(`${packageName}/package.json`));
}

const voltoSlateRoot = resolvePackageRoot('@plone/volto-slate', 'core/packages/volto-slate');
const componentsRoot = resolvePackageRoot('@plone/components', 'core/packages/components');
const baseConfig = (await import(pathToFileURL(path.join(voltoRoot, 'vitest.config.mjs')).href)).default;
const setupGlobals = fs.existsSync(path.join(voltoRoot, 'test-setup-globals-vitest.js')) ? path.join(voltoRoot, 'test-setup-globals-vitest.js') : path.join(voltoRoot, 'test-setup-globals.js');
const addonsLoader = fs.existsSync(path.join(voltoRoot, 'test-addons-loader.js')) ? path.join(voltoRoot, 'test-addons-loader.js') : path.join(voltoRoot, 'jest-addons-loader.js');
const setupFiles = [setupGlobals, path.join(voltoRoot, 'test-setup-config.jsx')];
const setupAfterEnv = path.join(voltoRoot, 'jest-setup-afterenv.js');
if (fs.existsSync(setupAfterEnv)) setupFiles.push(setupAfterEnv);
setupFiles.push(addonsLoader);

const addonPackage = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const aliases = {
  ...(baseConfig.resolve?.alias ?? {}),
  '@plone/volto': path.join(voltoRoot, 'src'),
  '@plone/volto-slate': path.join(voltoSlateRoot, 'src'),
  '@plone/components': path.join(componentsRoot, 'src'),
  '@root': path.join(voltoRoot, 'src'),
  '@package': path.join(__dirname, 'src'),
  '~': path.join(voltoRoot, 'src'),
  'load-volto-addons': addonsLoader,
  [addonPackage.name]: path.join(__dirname, 'src'),
};

const workspacePackages = path.join(workspaceRoot, 'packages');
if (fs.existsSync(workspacePackages)) {
  for (const packageDirectory of fs.readdirSync(workspacePackages)) {
    const packageRoot = path.join(workspacePackages, packageDirectory);
    const manifestPath = path.join(packageRoot, 'package.json');
    if (!fs.existsSync(manifestPath) || !fs.existsSync(path.join(packageRoot, 'src'))) {
      continue;
    }
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (manifest.name) aliases[manifest.name] = path.join(packageRoot, 'src');
  }
}

const jsxSourceRoots = Object.values(aliases).filter((aliasPath) => typeof aliasPath === 'string');
const jsxInJsPlugin = {
  name: 'volto-addon-jsx-in-js',
  enforce: 'pre',
  transform(code, id) {
    const filePath = id.split('?')[0];
    if (!filePath.endsWith('.js') || !jsxSourceRoots.some((sourceRoot) => filePath === sourceRoot || filePath.startsWith(`${sourceRoot}${path.sep}`))) {
      return null;
    }
    return transformWithEsbuild(code, filePath, {
      loader: 'jsx',
      jsx: 'automatic',
    });
  },
};

export default defineConfig({
  plugins: [jsxInJsPlugin, ...(baseConfig.plugins ?? [])],
  define: {
    __CLIENT__: true,
    __DEVELOPMENT__: false,
    __SERVER__: false,
    __TEST__: true,
  },
  resolve: { alias: aliases },
  server: {
    deps: {
      inline: [/@eeacms/, /@plone/, /query-string/],
    },
  },
  test: {
    root: __dirname,
    isolate: true,
    globals: true,
    environment: 'jsdom',
    css: false,
    setupFiles,
    globalSetup: path.join(voltoRoot, 'global-test-setup.js'),
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    passWithNoTests: true,
    snapshotFormat: baseConfig.test?.snapshotFormat ?? {
      printBasicPrototype: false,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'cobertura'],
      reportsDirectory: process.env.COVERAGE_DIR ?? 'coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}', 'src/**/__tests__/**', 'src/**/__mocks__/**', 'src/**/*.d.ts', 'src/**/index.{js,jsx,ts,tsx}', 'src/**/*config.{js,jsx,ts,tsx}', 'src/**/*schema.{js,jsx,ts,tsx}'],
      thresholds: {
        branches: 5,
        functions: 5,
        lines: 5,
        statements: 5,
      },
    },
  },
});
