// vite.config.ts
import { defineConfig } from "file:///sessions/blissful-laughing-mayer/mnt/ui-lib/node_modules/vite/dist/node/index.js";
import vue from "file:///sessions/blissful-laughing-mayer/mnt/ui-lib/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import tailwindcss from "file:///sessions/blissful-laughing-mayer/mnt/ui-lib/node_modules/@tailwindcss/vite/dist/index.mjs";
import dts from "file:///sessions/blissful-laughing-mayer/mnt/ui-lib/node_modules/vite-plugin-dts/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/sessions/blissful-laughing-mayer/mnt/ui-lib";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.vue"]
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "UiLib",
      fileName: "ui-lib"
    },
    rollupOptions: {
      external: ["vue", "vue-router", "@heroicons/vue/24/outline", "@heroicons/vue/24/solid"],
      output: {
        globals: {
          vue: "Vue",
          "vue-router": "VueRouter",
          "@heroicons/vue/24/outline": "HeroiconsOutline",
          "@heroicons/vue/24/solid": "HeroiconsSolid"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvYmxpc3NmdWwtbGF1Z2hpbmctbWF5ZXIvbW50L3VpLWxpYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL2JsaXNzZnVsLWxhdWdoaW5nLW1heWVyL21udC91aS1saWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Nlc3Npb25zL2JsaXNzZnVsLWxhdWdoaW5nLW1heWVyL21udC91aS1saWIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ0B0YWlsd2luZGNzcy92aXRlJ1xyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cydcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgdGFpbHdpbmRjc3MoKSxcclxuICAgIGR0cyh7XHJcbiAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyoudnVlJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXHJcbiAgICAgIG5hbWU6ICdVaUxpYicsXHJcbiAgICAgIGZpbGVOYW1lOiAndWktbGliJyxcclxuICAgIH0sXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ0BoZXJvaWNvbnMvdnVlLzI0L291dGxpbmUnLCAnQGhlcm9pY29ucy92dWUvMjQvc29saWQnXSxcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgdnVlOiAnVnVlJyxcclxuICAgICAgICAgICd2dWUtcm91dGVyJzogJ1Z1ZVJvdXRlcicsXHJcbiAgICAgICAgICAnQGhlcm9pY29ucy92dWUvMjQvb3V0bGluZSc6ICdIZXJvaWNvbnNPdXRsaW5lJyxcclxuICAgICAgICAgICdAaGVyb2ljb25zL3Z1ZS8yNC9zb2xpZCc6ICdIZXJvaWNvbnNTb2xpZCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLG9CQUFvQjtBQUNuVixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUp4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixJQUFJO0FBQUEsTUFDRixrQkFBa0I7QUFBQSxNQUNsQixTQUFTLENBQUMsZUFBZSxjQUFjO0FBQUEsSUFDekMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLGNBQWMsNkJBQTZCLHlCQUF5QjtBQUFBLE1BQ3RGLFFBQVE7QUFBQSxRQUNOLFNBQVM7QUFBQSxVQUNQLEtBQUs7QUFBQSxVQUNMLGNBQWM7QUFBQSxVQUNkLDZCQUE2QjtBQUFBLFVBQzdCLDJCQUEyQjtBQUFBLFFBQzdCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
