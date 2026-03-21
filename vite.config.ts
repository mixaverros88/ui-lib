import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiLib',
      fileName: 'ui-lib',
    },
    rollupOptions: {
      external: ['vue', 'vue-router', '@heroicons/vue/24/outline', '@heroicons/vue/24/solid'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          '@heroicons/vue/24/outline': 'HeroiconsOutline',
          '@heroicons/vue/24/solid': 'HeroiconsSolid',
        },
      },
    },
  },
})
