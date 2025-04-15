export default [
  {
    path: 'demo',
    name: 'demo',
    component: () => import('@renderer/views/demo.vue'),
    meta: {
      leftMenuSelectedKey: 'demo',
    },
  },
]
