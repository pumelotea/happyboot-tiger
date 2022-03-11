const routerData = [
  {
    name: '介绍',
    path: '/desc',
    view: '/desc/index.vue',
    isRouter: true,
    isKeepalive: true,
    icon:'ri-pie-chart-line',
    type: 'menu',
    children: []
  },
  {
    name: '权限',
    path: '/permission',
    view: '/permission/index.vue',
    isRouter: true,
    isKeepalive: true,
    type: 'menu',
    children: []
  },
  {
    name: '错误页面',
    path: '/error',
    view: '/security/index.vue',
    isRouter: false,
    isKeepalive: false,
    type: 'menu',
    icon:'ri-error-warning-line',
    children: [
      {
        name: '404',
        path: '/404',
        view: '/error404/index.vue',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        icon: 'ri-window-line',
        children: []
      },
      {
        name: '500',
        path: '/500',
        view: '/error500/index.vue',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        icon: 'ri-window-line',
        children: []
      },
      {
        name: '403',
        path: '/403',
        view: '/error403/index.vue',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        icon: 'ri-window-line',
        children: []
      }
    ]
  },
  {
    name: '基础列表',
    path: '/base-list',
    view: '/base-list/index.vue',
    isRouter: true,
    isKeepalive: true,
    type: 'menu',
    icon:'ri-table-line',
    children: []
  },
]

export default routerData
