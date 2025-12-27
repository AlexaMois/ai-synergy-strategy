import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/',
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable minification
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize source maps for production
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core bundle
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // Router bundle
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'router';
          }
          // Radix UI - split into smaller chunks
          if (id.includes('@radix-ui/react-accordion')) {
            return 'radix-accordion';
          }
          if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-alert-dialog')) {
            return 'radix-dialog';
          }
          if (id.includes('@radix-ui/react-dropdown-menu') || id.includes('@radix-ui/react-menubar')) {
            return 'radix-menu';
          }
          if (id.includes('@radix-ui/react-toast')) {
            return 'radix-toast';
          }
          if (id.includes('@radix-ui/react-tabs')) {
            return 'radix-tabs';
          }
          if (id.includes('@radix-ui/react-tooltip') || id.includes('@radix-ui/react-popover') || id.includes('@radix-ui/react-hover-card')) {
            return 'radix-overlay';
          }
          if (id.includes('@radix-ui')) {
            return 'radix-other';
          }
          // TanStack Query
          if (id.includes('@tanstack/react-query')) {
            return 'tanstack-query';
          }
          // Recharts (if used)
          if (id.includes('recharts') || id.includes('d3-')) {
            return 'charts';
          }
          // Other large dependencies
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/date-fns')) {
            return 'date-fns';
          }
        },
        // Optimize asset file names for caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|webp|avif/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    // Inline smaller assets as base64
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Enable CSS optimization
  css: {
    devSourcemap: false,
    // Optimize CSS in production
    postcss: {
      plugins: [],
    },
  },
  esbuild: {
    // Remove console.log in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
    // Minify CSS class names in production
    legalComments: 'none',
  },
}));
