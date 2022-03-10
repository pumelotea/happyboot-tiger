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
    name: '数据',
    path: '/data',
    view: '',
    isRouter: false,
    isKeepalive: true,
    icon:'ri-medal-line',
    type: 'menu',
    children: [
      {
        name: '原始数据',
        path: '/raw',
        view: '/data-raw/index.vue',
        isRouter: true,
        isKeepalive: true,
        icon:'ri-cloud-fill',
        type: 'menu',
        children: []
      },
      {
        name: '菜单数据',
        path: '/menu',
        view: '/data-menu/index.vue',
        isRouter: true,
        isKeepalive: true,
        icon:'ri-bar-chart-2-fill',
        type: 'menu',
        children: []
      },
      {
        name: '导航数据',
        path: '/nav',
        view: '/data-nav/index.vue',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        children: []
      },
      {
        name: '面包屑数据',
        path: '/breadcrumb',
        view: '/data-breadcrumb/index.vue',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        children: []
      },
    ]
  },
  {
    name: '指纹',
    path: '/fingerprint',
    view: '/fingerprint/index.vue',
    isRouter: true,
    isKeepalive: true,
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
    name: 'Security',
    path: '/security',
    view: '/security/index.vue',
    isRouter: true,
    isKeepalive: true,
    type: 'menu',
    children: []
  },
  {
    name: '多层菜单',
    path: '/demo',
    view: '',
    isRouter: false,
    isKeepalive: false,
    type: 'menu',
    children: [
      {
        name: '1-1',
        path: '/links',
        view: '',
        isRouter: false,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '1-1-1',
            path: '',
            view: '',
            isRouter: true,
            isKeepalive: true,
            externalLink: true, //外链
            linkTarget: '_self', //刷新自己
            externalLinkAddress: 'http://www.squirrelzoo.com',
            type: 'menu',
            children: []
          },
          {
            name: '1-1-2',
            path: '',
            view: '',
            isRouter: true,
            isKeepalive: true,
            externalLink: true, //外链
            externalLinkAddress: 'http://www.squirrelzoo.com',
            linkTarget: '_blank', //浏览器标签
            type: 'menu',
            children: []
          },
          {
            name: '1-1-3',
            path: '/squirrelzoo',
            view: '/iframe',
            isRouter: true,
            isKeepalive: true,
            externalLink: true, //外链
            externalLinkAddress: 'http://www.squirrelzoo.com',
            linkTarget: '_tab', //页内标签
            type: 'menu',
            children: []
          },
          {
            name: '1-1-4',
            path: '/baidu',
            view: '/iframe',
            isRouter: true,
            isKeepalive: true,
            externalLink: true, //外链
            externalLinkAddress: 'http://www.baidu.com',
            linkTarget: '_tab', //页内标签
            type: 'menu',
            children: []
          }
        ]
      },
      {
        name: '1-2',
        path: '/user-mgt',
        view: '',
        isRouter: false,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '2-1',
            path: '/adv',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'menu',
            children: [
              {
                name: '2-1-1',
                path: '/xxxxxx111',
                view: '/role',
                isRouter: true,
                isKeepalive: false,
                type: 'menu',
                children: []
              }
            ]
          }
        ]
      },
      {
        name: '1-3',
        path: '',
        view: '',
        isRouter: false,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '3-1',
            path: '/test/aaa',
            view: '/role',
            isRouter: true,
            isKeepalive: false,
            type: 'menu',
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '两层菜单',
    path: '/system',
    view: '',
    isRouter: false,
    isKeepalive: false,
    type: 'menu',
    children: [
      {
        name: '1-1',
        path: '/user',
        view: '/user',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: []
      },
      {
        name: '1-2',
        path: '/role',
        view: '/role',
        isRouter: true,
        isKeepalive: true,
        type: 'menu',
        children: [
          {
            name: '新增',
            permissionKey: 'add',
            path: '',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'point',
            children: []
          },
          {
            name: '编辑弹出框取消',
            permissionKey: 'cancel',
            path: '',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'point',
            children: []
          }
        ]
      },
      {
        name: '1-3',
        path: '/department',
        view: '/department',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '新增',
            permissionKey: 'add',
            path: '',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'point',
            children: []
          }
        ]
      },
      {
        name: '1-4',
        path: '/region',
        view: '/region',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '新增',
            permissionKey: 'add',
            path: '',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'point',
            children: []
          }
        ]
      },
      {
        name: '1-5',
        path: '/menu',
        view: '/menu',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: [
          {
            name: '新增',
            permissionKey: 'add',
            path: '',
            view: '',
            isRouter: false,
            isKeepalive: false,
            type: 'point',
            children: []
          }
        ]
      },
      {
        name: '1-6',
        path: '/log-report',
        view: '/log-report',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: []
      }
    ]
  },
  {
    name: '隐藏路由1级',
    path: '/hide',
    view: '',
    isRouter: false,
    isKeepalive: false,
    type: 'menu',
    hide: true, //隐藏路由
    children: [
      {
        name: '隐藏路由2级',
        path: '/test',
        view: '/hide',
        isRouter: true,
        isKeepalive: false,
        type: 'menu',
        children: []
      }
    ]
  }
]

export default routerData
