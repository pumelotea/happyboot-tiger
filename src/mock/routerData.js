const routerData = [
  {
    name       : '主控台',
    path       : '/dashboard',
    view       : '/dashboard/index.vue',
    isRouter   : true,
    isKeepalive: true,
    icon       : 'ri-dashboard-line',
    type       : 'menu',
    children   : []
  },
  {
    name       : '工作台',
    path       : '/work-desk',
    view       : '/work-desk/index.vue',
    isRouter   : true,
    isKeepalive: true,
    icon       : 'ri-shape-line',
    type       : 'menu',
    children   : []
  },
  {
    name       : '错误页面',
    path       : '/error',
    view       : '/security/index.vue',
    isRouter   : false,
    isKeepalive: false,
    type       : 'menu',
    icon       : 'ri-error-warning-line',
    children   : [
      {
        name       : '404',
        path       : '/404',
        view       : '/error404/index.vue',
        isRouter   : true,
        isKeepalive: true,
        type       : 'menu',
        icon       : 'ri-window-line',
        children   : []
      },
      {
        name       : '500',
        path       : '/500',
        view       : '/error500/index.vue',
        isRouter   : true,
        isKeepalive: true,
        type       : 'menu',
        icon       : 'ri-window-line',
        children   : []
      },
      {
        name       : '403',
        path       : '/403',
        view       : '/error403/index.vue',
        isRouter   : true,
        isKeepalive: true,
        type       : 'menu',
        icon       : 'ri-window-line',
        children   : []
      }
    ]
  },
  {
    name       : '基础列表',
    path       : '/base-list',
    view       : '/base-list/index.vue',
    isRouter   : true,
    isKeepalive: true,
    type       : 'menu',
    icon       : 'ri-bank-card-2-line',
    children   : []
  },
  {
    name       : '基础卡片',
    path       : '/card-list',
    view       : '/card-list/index.vue',
    isRouter   : true,
    isKeepalive: true,
    type       : 'menu',
    icon       : 'ri-table-line',
    children   : []
  },
  {
    name       : '系统设置',
    path       : '/setting',
    view       : '',
    isRouter   : false,
    isKeepalive: false,
    icon       : 'ri-tools-line',
    type       : 'menu',
    children   : [
      {
        name       : '菜单设置',
        path       : '/menu',
        view       : '/permission/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-menu-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '用户管理',
        path       : '/user',
        view       : '/user/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-user-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '角色管理',
        path       : '/role',
        view       : '/role/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-file-user-line',
        type       : 'menu',
        children   : []
      }
    ]
  },
  {
    name       : '示例',
    path       : '/demo',
    view       : '',
    isRouter   : false,
    isKeepalive: false,
    icon       : 'ri-collage-fill',
    type       : 'menu',
    budge      : {
      value: '11',
      type : 'info'
    },
    children: [
      {
        name       : '权限点',
        path       : '/point',
        view       : '/point-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-command-line',
        type       : 'menu',
        children   : [
          {
            name         : '新增',
            permissionKey: 'add',
            path         : '',
            view         : '',
            isRouter     : false,
            isKeepalive  : false,
            type         : 'point',
            children     : []
          },
          {
            name         : '编辑弹出框取消',
            permissionKey: 'cancel',
            path         : '',
            view         : '',
            isRouter     : false,
            isKeepalive  : false,
            type         : 'point',
            children     : []
          }
        ]
      },
      {
        name       : '自定义导航标题',
        path       : '/custom-tab-title',
        view       : '/custom-tab-title-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-compass-discover-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '富文本编辑器',
        path       : '/editor',
        view       : '/editor-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-file-text-line',
        type       : 'menu',
        children   : [],
        budge      : {
          value: '新',
          type : 'info'
        }
      },
      {
        name       : '图片预览组件',
        path       : '/image-preview',
        view       : '/image-preview-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-gallery-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '图片上传组件',
        path       : '/uploader',
        view       : '/uploader-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-upload-line',
        type       : 'menu',
        children   : [],
        budge      : {
          value: '新',
          type : 'info'
        }
      },
      {
        name       : '头像裁剪组件',
        path       : '/avatar',
        view       : '/avatar-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-crop-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '锁屏组件',
        path       : '/screen-locker',
        view       : '/screen-locker-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-mac-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '图标选择组件',
        path       : '/icon-select',
        view       : '/icon-select-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-remixicon-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '打印组件',
        path       : '/print',
        view       : '/print-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-printer-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '剪贴板',
        path       : '/copy',
        view       : '/copy-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-clipboard-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '二维码生成',
        path       : '/qrcode',
        view       : '/qrcode-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-qr-code-line',
        type       : 'menu',
        children   : []
      },
      {
        name       : '视差卡片',
        path       : '/parallax',
        view       : '/parallax-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-artboard-2-line',
        type       : 'menu',
        children   : []
      }
    ]
  },
  {
    name       : '隐藏页面',
    path       : '/hide',
    view       : '/hide/index.vue',
    isRouter   : true,
    isKeepalive: false,
    hide       : true,
    icon       : 'ri-send-plane-2-line',
    type       : 'menu',
    children   : []
  }
]

export default routerData
