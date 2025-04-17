const modules = import.meta.glob('./modules/*.js', {
  eager: true,
  import: 'default',
})

const routes = []

Object.keys(modules).forEach((key) => {
  const modulesRoutes = modules[key] || {}

  let modRoutesList = []
  if (Array.isArray(modulesRoutes))
    modRoutesList = [...modulesRoutes]
  else
    modRoutesList = [modulesRoutes]

  routes.push(...modRoutesList)
})

const layoutRoute = {
  path: '/',
  name: 'layout',
  component: () => import('@renderer/layout/index.vue'),
  children: [
    {
      path: 'home',
      name: 'home',
      component: () => import('@renderer/views/home.vue'),
      meta: {
        leftMenuSelectedKey: 'home',
      },
    },
    ...routes,
  ],
}

export default [
  {
    path: '/',
    name: 'root',
    redirect: {
      name: 'home',
    },
  },
  layoutRoute,
]
