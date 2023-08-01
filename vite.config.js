import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    proxy: {
      // api是自行设置的请求前缀，任何请求路径以/api开头的请求将被代理到对应的target目标
      '/baidu': {
        target: 'https://www.baidu.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baidu/, ''),
      },
      '/harmonyos': {
        target: 'https://developer.harmonyos.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/harmonyos/, ''),
      },
    },
  },
})
