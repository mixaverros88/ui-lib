import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      // Treat src/ as the entry root so generated d.ts files live at
      // dist/*.d.ts (not dist/src/*.d.ts). Without this, the auto-inserted
      // dist/index.d.ts is just `export {}` because it can't find the real
      // index.d.ts at the path package.json's `types` field points to.
      entryRoot: 'src',
      include: ['src/**/*.ts', 'src/**/*.vue', 'env.d.ts'],
      exclude: ['src/**/*.{test,spec}.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UiLib',
      fileName: 'ui-lib',
    },
    rolldownOptions: {
      // @vuepic/vue-datepicker is a regular dependency (auto-installed for
      // consumers) — keep its JS external so apps don't bundle two copies. Its
      // CSS subpath isn't matched here, so it's folded into ui-lib.css.
      external: ['vue', 'vue-router', '@heroicons/vue/24/outline', '@heroicons/vue/24/solid', '@vuepic/vue-datepicker'],
      output: {
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          '@heroicons/vue/24/outline': 'HeroiconsOutline',
          '@heroicons/vue/24/solid': 'HeroiconsSolid',
          '@vuepic/vue-datepicker': 'VueDatePicker',
        },
      },
    },
  },
})
