import framework from '@/global/framework'
import { computed, h } from 'vue'
import { isMenuCollapsed } from '@/global/config'
import { NBadge, NIcon, NTooltip } from 'naive-ui'
import { CubeOutline } from '@vicons/ionicons5'
import router from './router'

const menuTree = framework.getMenuTree()
const currentMenuRoute = framework.getCurrentMenuRoute()

/**
 * 适配菜单
 * @param rawMenuTree
 * @returns {*[]}
 */
function menuDataAdapter (rawMenuTree) {
  function traversal (tree) {
    const list = []
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].hide) {
        continue
      }
      const subMenu = {
        name    : tree[i].name,
        menuId  : tree[i].menuId,
        icon    : renderIcon(tree[i].icon),
        original: toRaw(tree[i]),
        label   : renderLabel(tree[i].name, tree[i].budge, tree[i].menuId)
      }
      if (tree[i].children.length > 0) {
        subMenu.children = traversal(tree[i].children)
      }
      list.push(subMenu)
    }
    return list
  }

  return traversal(rawMenuTree)
}

const naviMenuData = computed(() => {
  return menuDataAdapter(menuTree.value)
})
const chooseTopLevel = ref(null)
const naviMenuDataFiltered = computed(() => {
  if (isMenuCollapsed.value) {
    return naviMenuData.value
  }
  return chooseTopLevel.value?.children || []
})

const showMenuCollapsedBtn = computed(() => {
  return naviMenuDataFiltered.value.length > 0
})

function menuChoose (key, item) {
  const node = item.original
  if (node.externalLink) {
    if (node.linkTarget === 'blank') {
      window.open(node.externalLinkAddress, '_blank')
      return
    }
    if (node.linkTarget === 'self') {
      window.open(node.externalLinkAddress, '_self')
      return
    }
  }
  framework.clickMenuItem(key, menuItems => {
    router.push(menuItems[0].routerPath)
  })
}

function topLevelMenuChoose (key, item) {
  chooseTopLevel.value = item
  menuChoose(key, item)
}

function topLevelMenuActive (menuId) {
  if (!currentMenuRoute.value) {
    return
  }
  const rootItem = currentMenuRoute.value.menuItem.breadcrumb[0]
  return menuId === rootItem.menuId
}

function renderIcon (icon) {
  if (!icon) {
    return () => h(NIcon, null, { default: () => h(CubeOutline) })
  }
  return () => h(NIcon, null, { default: () => h('i', { class: icon }) })
}

function renderLabel (text, badge, menuId) {
  if (!badge) {
    return () => h('div', { class: 'hb-admin-menu-item', id: `m-item-${menuId}` }, { default: () => text })
  }
  return () => h('div', { class: 'hb-admin-menu-item', id: `m-item-${menuId}` }, {
    default: () => [
      h(NTooltip, { placement: 'right' }, {
        trigger: () => h('div', { class: 'hb-admin-menu-item-label' }, { default: () => text }), default: () => text
      }),
      h(NBadge, { value: badge.value, type: badge.type })
    ]
  })
}

function scrollIntoView (menuId) {
  nextTick(() => {
    setTimeout(() => {
      const id = `m-item-${menuId}`
      const element = document.getElementById(id)
      if (!element) return
      element.parentElement.parentElement.parentElement.scrollIntoView({ behavior: 'smooth' }) // 平滑滚动
    }, 600)
  })
}

watch(currentMenuRoute, () => {
  if (!currentMenuRoute.value) {
    return
  }
  const rootItem = currentMenuRoute.value.menuItem?.breadcrumb[0]
  chooseTopLevel.value = naviMenuData.value.find(element => element.menuId === rootItem.menuId)

  scrollIntoView(currentMenuRoute.value.menuItem.menuId)
}, {
  immediate: true
})

export {
  naviMenuDataFiltered,
  naviMenuData,
  menuChoose,
  topLevelMenuChoose,
  topLevelMenuActive,
  showMenuCollapsedBtn
}
