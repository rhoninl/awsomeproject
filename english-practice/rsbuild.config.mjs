import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: 'English Vocabulary Practice',
  },
  output: {
    assetPrefix: './',
  },
  server: {
    port: 3001,
  },
});
