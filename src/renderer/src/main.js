import App from './App.vue'
import { registerRouter } from './routers'
import store from './stores'
import 'virtual:uno.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'
import './assets/styles/index.css'

async function bootstrap() {
  if (import.meta.env.VITE_APP_ENV === 'development') {
    // const { devtools } = await import('@vue/devtools')
    // devtools.connect()
  }

  const app = createApp(App)
  app.use(store)
  registerRouter(app)
  app.mount('#app')
}

bootstrap()
