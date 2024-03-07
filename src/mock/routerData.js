const routerData = [
  {
    name       : '组件库',
    path       : '/components',
    view       : '/component-list/index.vue',
    isRouter   : true,
    isKeepalive: true,
    icon       : 'ri-apps-line',
    poster     : 'components.png',
    type       : 'menu',
    children   : []
  },
  {
    name       : '主控台',
    path       : '/dashboard',
    view       : '/dashboard/index.vue',
    isRouter   : true,
    isKeepalive: true,
    icon       : 'ri-dashboard-line',
    poster     : 'dashboard.png',
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
    poster     : 'work-desk.png',
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
        poster     : '404.png',
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
        poster     : '500.png',
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
        poster     : '403.png',
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
    poster     : 'base-list.png',
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
    poster     : 'card-list.png',
    children   : []
  },
  {
    name       : '跳转方式',
    path       : '/goto-mode',
    view       : '',
    isRouter   : false,
    isKeepalive: false,
    type       : 'menu',
    icon       : 'ri-link',
    children   : [
      {
        name               : 'iframe内嵌外链',
        path               : '/iframe-link',
        view               : '/iframe/index.vue',
        isRouter           : true,
        isKeepalive        : false,
        icon               : 'ri-links-line',
        poster             : 'iframe-link.png',
        type               : 'menu',
        externalLink       : true, // 外链
        linkTarget         : '_tab', // 刷新自己
        externalLinkAddress: 'https://happykit.org',
        children           : []
      },
      {
        name               : 'blank跳出外链',
        path               : '/out-link',
        view               : '/iframe/index.vue',
        isRouter           : true,
        isKeepalive        : false,
        icon               : 'ri-links-line',
        type               : 'menu',
        externalLink       : true, // 外链
        linkTarget         : '_blank',
        externalLinkAddress: 'https://happykit.org',
        children           : []
      },
      {
        name               : 'self跳出外链',
        path               : '/out-link',
        view               : '/iframe/index.vue',
        isRouter           : true,
        isKeepalive        : false,
        icon               : 'ri-links-line',
        type               : 'menu',
        externalLink       : true, // 外链
        linkTarget         : '_self',
        externalLinkAddress: 'https://happykit.org',
        children           : []
      }
    ]
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
        poster     : 'menu.png',
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
        poster     : 'user.png',
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
        poster     : 'role.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '百度地图',
        path       : '/baidu-map',
        view       : '/baidu-map-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-map-line',
        poster     : 'baidu-map.png',
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
      value: '22',
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
        poster     : 'point.png',
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
        isKeepalive: true,
        icon       : 'ri-compass-discover-line',
        poster     : 'custom-tab-title.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '富文本编辑器',
        path       : '/editor',
        view       : '/editor-demo/index.vue',
        isRouter   : true,
        isKeepalive: true,
        icon       : 'ri-file-text-line',
        poster     : 'editor.png',
        type       : 'menu',
        children   : [],
        budge      : {
          value: 'beta',
          type : 'error'
        }
      },
      {
        name       : '图片组件',
        path       : '/image',
        view       : '/image-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-image-line',
        poster     : 'image.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '多图片预览组件',
        path       : '/image-preview',
        view       : '/image-preview-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-gallery-line',
        poster     : 'image-preview.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '滚动列表',
        path       : '/scroll-list',
        view       : '/scroll-list-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-file-list-line',
        poster     : 'scroll-list.png',
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
        poster     : 'uploader.png',
        type       : 'menu',
        children   : [],
        budge      : {
          value: '开发中',
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
        poster     : 'avatar.png',
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
        poster     : 'screen-locker.png',
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
        poster     : 'icon-select.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '图片工厂',
        path       : '/image-factory',
        view       : '/image-factory-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-building-3-line',
        poster     : 'image-factory.png',
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
        poster     : 'print.png',
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
        poster     : 'copy.png',
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
        poster     : 'qrcode.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '压缩包生成',
        path       : '/zip',
        view       : '/zip-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-file-zip-line',
        poster     : 'zip.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '缩放卡片',
        path       : '/scale-card',
        view       : '/scale-card-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-aspect-ratio-line',
        poster     : 'scale-card.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : 'ECharts图表',
        path       : '/charts',
        view       : '/charts-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-pie-chart-line',
        poster     : 'charts.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '视频播放器',
        path       : '/video',
        view       : '/video-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-video-line',
        poster     : 'video.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '音频播放器',
        path       : '/audio',
        view       : '/audio-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-music-2-line',
        poster     : 'audio.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '滚动区域',
        path       : '/roll-area',
        view       : '/roll-area-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-layout-masonry-line',
        poster     : 'roll-area.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '虚拟列表',
        path       : '/virtual-list',
        view       : '/virtual-list-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-list-check',
        poster     : 'virtual-list.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : '天气预报',
        path       : '/weather',
        view       : '/weather-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-cloud-line',
        poster     : 'weather.png',
        type       : 'menu',
        children   : []
      },
      {
        name       : 'Markdown编辑器',
        path       : '/markdown',
        view       : '/markdown-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-markdown-line',
        poster     : 'markdown.png',
        type       : 'menu',
        children   : [],
        budge      : {
          value: '新',
          type : 'error'
        }
      },
      {
        name       : '可调整容器',
        path       : '/adjustable-container',
        view       : '/adjustable-container-demo/index.vue',
        isRouter   : true,
        isKeepalive: false,
        icon       : 'ri-shape-line',
        poster     : 'adjustable-container.png',
        type       : 'menu',
        children   : [],
        budge      : {
          value: '新',
          type : 'error'
        }
      }
    ]
  },
  {
    name       : '隐藏页面',
    path       : '/hide',
    view       : '/hide/index.vue',
    isRouter   : true,
    isKeepalive: true,
    hide       : true,
    icon       : 'ri-send-plane-2-line',
    poster     : 'hide.png',
    type       : 'menu',
    children   : []
  }
]

export default routerData
