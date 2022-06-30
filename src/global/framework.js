// 创建框架实例
import { createHappyFramework, createEmptyMenuItem } from 'happykit'

/**
 * UUID生成
 * @returns {string}
 */
export function uuid () {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  // tslint:disable-next-line:no-bitwise
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/**
 * 深度拷贝
 * @param source
 */
function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/**
 * 自定义菜单适配器
 * @returns {{menuTreeConverted: (*|*[]), routeMappingList: *[], menuIdMappingMap: Map<any, any>}|{convert(*): {menuTreeConverted, routeMappingList: [], menuIdMappingMap: *}}}
 */
function createMenuAdapter () {
  return {
    convert (menuTree) {
      const routeMappingList = []
      const menuIdMappingMap = new Map()
      const menuTreeConverted = []

      const menuTypeMap = {
        menu : 'menu',
        point: 'point'
      }

      const linkTargetMap = {
        _tab  : 'tab',
        _self : 'self',
        _blank: 'blank'
      }

      const forEachTree = (tree, pNode) => {
        for (let i = 0; i < tree.length; i++) {
          // 创建新的节点
          const treeNode = createEmptyMenuItem()
          treeNode.menuId = uuid()
          treeNode.name = tree[i].name || ''
          treeNode.path = tree[i].path || ''
          treeNode.icon = tree[i].icon || ''
          treeNode.view = tree[i].view || ''
          treeNode.isRouter = tree[i].isRouter || false
          treeNode.isKeepalive = tree[i].isKeepalive || false
          treeNode.type = tree[i].type || 'menu'
          treeNode.externalLink = tree[i].externalLink || false
          treeNode.linkTarget = linkTargetMap[tree[i].linkTarget] || 'tab'
          treeNode.externalLinkAddress = tree[i].externalLinkAddress || ''
          treeNode.hide = tree[i].hide || false
          treeNode.isHome = tree[i].isHome || false
          treeNode.permissionKey = tree[i].permissionKey || ''
          treeNode.budge = tree[i].budge || null

          if (!pNode) {
            pNode = createEmptyMenuItem()
            menuTreeConverted.push(pNode)
          }
          pNode.children.push(treeNode)
          // 拼接路由
          treeNode.routerPath = pNode.routerPath + treeNode.path
          // 预先生成菜单节点路径
          const tmpNode = deepClone(treeNode)
          tmpNode.children = []
          tmpNode.menuPath = []
          tmpNode.breadcrumb = []
          treeNode.menuPath = [ ...pNode.menuPath, tmpNode ]
          // breadcrumb
          treeNode.breadcrumb = [ ...pNode.breadcrumb, tmpNode ]

          // 记录id映射表
          menuIdMappingMap.set(treeNode.menuId, treeNode)

          if (treeNode.type === 'menu') {
            if (!treeNode.isRouter) {
              forEachTree(tree[i].children, treeNode)
            } else {
              // 收集权限点
              tree[i].children.forEach((e) => {
                const pointNode = createEmptyMenuItem()
                pointNode.menuId = uuid()
                pointNode.name = e.name || ''
                pointNode.path = e.path || ''
                pointNode.view = e.view || ''
                pointNode.isRouter = e.isRouter || false
                pointNode.isKeepalive = e.isKeepalive || false
                pointNode.type = menuTypeMap[e.type] || 'point'
                pointNode.externalLink = e.externalLink || false
                pointNode.linkTarget = linkTargetMap[e.externalLink] || 'tab'
                pointNode.externalLinkAddress = e.externalLinkAddress || ''
                pointNode.hide = e.hide || false
                pointNode.isHome = e.isHome || false
                pointNode.permissionKey = e.permissionKey || ''
                treeNode.pointList.push(pointNode)
                treeNode.pointsMap.set(pointNode.permissionKey, pointNode)
              })
              if (!treeNode.externalLink || (treeNode.externalLink && treeNode.linkTarget === 'tab')) {
                routeMappingList.push(treeNode)
              }
            }
          }
        }
      }
      forEachTree(menuTree)
      return {
        routeMappingList,
        menuTreeConverted: menuTreeConverted[0]?.children || [],
        menuIdMappingMap
      }
    }
  }
}

const happyFramework = createHappyFramework({
  menuAdapter: createMenuAdapter()
})
export default happyFramework
