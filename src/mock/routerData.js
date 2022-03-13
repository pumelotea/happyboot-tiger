const routerData = [
  {
    name: '介绍',
    path: '/desc',
    view: '/desc/index.vue',
    isRouter: true,
    isKeepalive: true,
    icon:'ri-markdown-line',
    type: 'menu',
    children: []
  },
  {
    name: '主控台',
    path: '/dashboard',
    view: '/dashboard/index.vue',
    isRouter: true,
    isKeepalive: true,
    icon:'ri-dashboard-line',
    type: 'menu',
    children: []
  },
  {
    name: '工作台',
    path: '/work-desk',
    view: '/work-desk/index.vue',
    isRouter: true,
    isKeepalive: true,
    icon:'ri-shape-line',
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
    icon:'ri-bank-card-2-line',
    children: []
  },
  {
    name: '基础卡片',
    path: '/card-list',
    view: '/card-list/index.vue',
    isRouter: true,
    isKeepalive: true,
    type: 'menu',
    icon:'ri-table-line',
    children: []
  },
  {
    name: '系统设置',
    path: '/setting',
    view: '',
    isRouter: false,
    isKeepalive: false,
    icon:'ri-tools-line',
    type: 'menu',
    children: [
      {
        name: '菜单设置',
        path: '/menu',
        view: '/permission/index.vue',
        isRouter: true,
        isKeepalive: false,
        icon:'ri-menu-line',
        type: 'menu',
        children: []
      },
      {
        name: '用户管理',
        path: '/user',
        view: '/user/index.vue',
        isRouter: true,
        isKeepalive: false,
        icon:'ri-user-line',
        type: 'menu',
        children: []
      },
      {
        name: '角色管理',
        path: '/role',
        view: '/role/index.vue',
        isRouter: true,
        isKeepalive: false,
        icon:'ri-file-user-line',
        type: 'menu',
        children: []
      },
    ]
  },
]

export default routerData
