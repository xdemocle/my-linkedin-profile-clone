import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: '#root',
      // additionalPrerenderRoutes: ["/foo", "/bar", "/baz"],
    }),
    {
      name: 'ClosePlugin', // required, will show up in warnings and errors

      // use this to catch errors when building
      buildEnd(error) {
        if (error) {
          console.error('Error bundling');
          console.error(error);
          process.exit(1);
        } else {
          console.log('Build ended');
        }
      },

      // use this to catch the end of a build without errors
      closeBundle() {
        console.log('Bundle closed');
        process.exit(0);
      },
    },
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
