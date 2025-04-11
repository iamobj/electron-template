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

export default [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'Demo',
    },
  },
  ...routes,
]
