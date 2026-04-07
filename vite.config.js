import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
        `,
        silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-functions', 'if-function']
      }
    }
  },
  server: {
    proxy: {
      // Proxy /api/* to the Vercel dev CLI when running locally.
      // If `vercel dev` is not running, the form still works:
      // the store catches the error and shows a dev-mode success message.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('error', () => { /* silently ignore – handled in form.js */ })
        }
      }
    }
  }
})
