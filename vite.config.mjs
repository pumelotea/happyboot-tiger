import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
import demo from './plugin/demo'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    demo(),
    vue(),
    AutoImport({
      dts:true,
      eslintrc: {
        enabled: true,
      },
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
            'useThemeVars'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
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
