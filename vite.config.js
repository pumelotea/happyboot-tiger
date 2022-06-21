import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('./src')
      }
    ],
    extensions: ['.js', '.json', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
  }
})
