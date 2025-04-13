import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { bytecodePlugin, defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode)
  return {
    main: {
      plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    preload: {
      plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    },
    renderer: {
      resolve: {
        alias: {
          '@renderer': resolve('src/renderer/src'),
          '@': resolve('src'),
        },
      },
      plugins: [
        vue(),
        UnoCSS(),
        AutoImport({
          eslintrc: { // 自动生成自动导入全局变量，将文件合并到eslint配置，避免eslint报错
            enabled: true,
            filepath: './.eslintrc-auto-import.json',
            globalsPropValue: true,
          },
          imports: [
            'vue',
            'vue-router',
            'pinia',
            {
              'naive-ui': ['useMessage', 'useDialog', 'NIcon'],
              'alova': ['useRequest'],
              '@alova/scene-vue': [['useForm', 'useAlovaForm']],
              'dayjs': [['default', 'dayjs']],
            },
            {
              '@renderer/apis': [['default', 'apis']],
              '@renderer/utils/storage': ['ILocalStorage', 'ISessionStorage'],
            },
          ],
          // injectAtEnd: true,
          dirs: [
            './src/stores',
          ],
        }),
        Components({
          resolvers: [
            NaiveUiResolver(),
          ],
          dirs: [
            './src/components',
          ],
        }),
        vueDevTools({
          launchEditor: 'trae',
        }),
        codeInspectorPlugin({
          bundler: 'vite',
          editor: 'trae',
          // editor: 'code',
        }),
      ],
      server: {
        proxy: {
          '/api': {
            target: env.VITE_APP_API_BASE_URL,
            changeOrigin: true,
            rewrite: path => path.replace(/^\/api/, ''),
          },
        },
      },
    },
  }
})
