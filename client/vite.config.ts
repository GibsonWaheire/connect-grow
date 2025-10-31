import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  root: __dirname,
  build: {
    // Advanced minification settings
    minify: mode === 'production' ? 'terser' : false,
    terserOptions: mode === 'production' ? {
      compress: {
        drop_console: true, // Remove console.log statements
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific functions
        passes: 2, // Multiple compression passes
        unsafe: true, // Enable unsafe optimizations
        unsafe_comps: true, // Unsafe comparisons
        unsafe_math: true, // Unsafe math optimizations
        unsafe_proto: true, // Unsafe prototype optimizations
        unsafe_regexp: true, // Unsafe regex optimizations
        unsafe_undefined: true, // Unsafe undefined optimizations
        conditionals: true, // Optimize conditionals
        evaluate: true, // Evaluate constant expressions
        booleans: true, // Optimize booleans
        loops: true, // Optimize loops
        unused: true, // Remove unused variables
        dead_code: true, // Remove dead code
        side_effects: false, // Assume no side effects
        properties: true, // Optimize property access
        sequences: true, // Optimize sequences
        collapse_vars: true, // Collapse variables
        reduce_vars: true, // Reduce variables
        hoist_funs: true, // Hoist functions
        hoist_vars: true, // Hoist variables
        if_return: true, // Optimize if-return
        join_vars: true, // Join variables
        keep_fargs: false, // Remove function arguments
        keep_fnames: false, // Remove function names
        keep_infinity: false, // Remove Infinity
        negate_iife: true, // Negate IIFE
        reduce_funcs: true, // Reduce functions
        toplevel: true, // Optimize top level
        warnings: false, // Suppress warnings
      },
      mangle: {
        toplevel: true, // Mangle top level names
        eval: true, // Mangle eval names
        keep_fnames: false, // Don't keep function names
        properties: {
          regex: /^_/, // Mangle properties starting with _
        },
      },
      format: {
        comments: false, // Remove all comments
        beautify: false, // Don't beautify
        ascii_only: true, // ASCII only output
        keep_numbers: false, // Don't keep numbers
        wrap_iife: true, // Wrap IIFE
        wrap_func_args: true, // Wrap function arguments
      },
      sourceMap: false, // No source maps in production
    } : undefined,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        // Obfuscate chunk names
        chunkFileNames: mode === 'production' ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
        entryFileNames: mode === 'production' ? 'assets/[hash].js' : 'assets/[name]-[hash].js',
        assetFileNames: mode === 'production' ? 'assets/[hash].[ext]' : 'assets/[name]-[hash].[ext]',
      },
      external: mode === 'production' ? [] : undefined, // No externals in production
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
    // Additional build optimizations
    target: 'es2015', // Target modern browsers
    cssCodeSplit: true, // Split CSS
    reportCompressedSize: false, // Don't report compressed size
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
