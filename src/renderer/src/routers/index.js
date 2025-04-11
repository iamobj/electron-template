import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routerMap'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' }
  },
})

export const registerRouter = app => app.use(router)

export default router
