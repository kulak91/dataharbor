import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import viteSvgr from 'vite-plugin-svgr';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [tsconfigPathsPlugin(), react(), viteSvgr()],
});
