<script setup>
import { computed, h, toRaw } from 'vue'
import { NIcon, NMenu, NBadge, NTooltip } from 'naive-ui'
import {
  CubeOutline
} from '@vicons/ionicons5'
import framework from '@/global/framework'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuTree = framework.getMenuTree()

const currentMenuRoute = framework.getCurrentMenuRoute()

function renderIcon (icon) {
  if (!icon) {
    return () => h(NIcon, null, { default: () => h(CubeOutline) })
  }
  return () => h(NIcon, null, { default: () => h('i', { class: icon }) })
}

function renderLabel (text, badge) {
  if (!badge) {
    return () => h('div', { class: 'hb-admin-menu-item' }, { default: () => text })
  }
  return () => h('div', { class: 'hb-admin-menu-item' }, {
    default: () => [
      h(NTooltip, { placement: 'right' }, {
        trigger: () => h('div', { class: 'hb-admin-menu-item-label' }, { default: () => text }), default: () => text
      }),
      h(NBadge, { value: badge.value, type: badge.type })
    ]
  })
}

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
        label   : renderLabel(tree[i].name, tree[i].budge)
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

</script>
<template>
  <n-menu
    class="hb-admin-menu-com"
    :options="naviMenuData"
    show-trigger
    :collapsed-width="64"
    :collapsed-icon-size="22"
    key-field="menuId"
    label-field="label"
    :value="currentMenuRoute?.menuItem.menuId || null"
    @update:value="menuChoose"
  />
</template>

<style>
.hb-admin-menu-com {
}

.hb-admin-menu-item{
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  justify-content: space-between;
  padding: 5px 5px;
  box-sizing: border-box;
  height: 100%;
}

.hb-admin-menu-item-label{
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 5px;
}
</style>
