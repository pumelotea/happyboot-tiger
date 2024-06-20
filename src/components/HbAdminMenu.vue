<script setup>
import { computed, h, toRaw } from 'vue'
import { NIcon, NMenu, NBadge, NTooltip } from 'naive-ui'
import {
  CubeOutline
} from '@vicons/ionicons5'
import framework from '@/global/framework'
import { useRouter } from 'vue-router'
import {isMenuCollapsed} from "@/global/config";
import HbAdminLogo from "@/components/HbAdminLogo.vue";
import HbAdminLogo2 from "@/components/HbAdminLogo2.vue";

const router = useRouter()

const vars = useThemeVars()

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
const chooseTopLevel = ref(null)
const naviMenuDataFiltered = computed(() => {
  if (isMenuCollapsed.value){
    return naviMenuData.value
  }
  return chooseTopLevel.value?.children || []
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


function topLevelMenuChoose(key, item){
  chooseTopLevel.value = item
  menuChoose(key, item)
}

const props = defineProps({
  mode: {
    type   : String,
    default: null
  }
})

</script>
<template>
  <div class="hb-admin-menu-com">
    <div class="hb-admin-menu-top-level-box" v-if="!isMenuCollapsed">
      <hb-admin-logo-2 v-if="!isMenuCollapsed"/>
      <div class="hb-admin-menu-top-level">
        <div class="hb-admin-menu-top-level-item" v-for="e in naviMenuData" :key="e.menuId" @click="topLevelMenuChoose(e.menuId, e)" :class="{'active': e.menuId === chooseTopLevel?.menuId}">
          <i :class="`${e.original.icon}`" style="font-size: 24px"></i>
          <div class="hb-admin-menu-top-level-item-name">{{e.name}}</div>
        </div>
      </div>
    </div>
    <div class="hb-admin-menu-sub-level animate__animated animate__faster animate__slideInRight" v-if="naviMenuDataFiltered.length">
      <hb-admin-logo v-if="isMenuCollapsed"/>
      <n-menu
        :mode="props.mode"
        :options="naviMenuDataFiltered"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        key-field="menuId"
        label-field="label"
        :value="currentMenuRoute?.menuItem.menuId || null"
        :dropdown-props="{ scrollable: true, menuProps: () => ({style: 'max-height: 300px;'}) }"
        @update:value="menuChoose"
      />
    </div>
  </div>
</template>

<style>
.hb-admin-menu-com {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.hb-admin-menu-top-level-box{
  display: flex;
  flex-direction: column;
  box-shadow: v-bind(vars.boxShadow2);
}

.hb-admin-menu-top-level{
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: auto;
  z-index: 1;
}

.hb-admin-menu-top-level-item{
  width: 64px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  flex-direction: column;
}

.hb-admin-menu-top-level-item.active{
  color: v-bind(vars.primaryColor) !important;
}




.hb-admin-menu-top-level-item-name{
  font-size: 10px;
  margin-top: -5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hb-admin-menu-top-level-item:hover{
  opacity: 0.6;
}

.hb-admin-menu-sub-level{
  flex: 1;
  overflow: auto;
  height: 100%;
  max-width: 240px;
  width: 240px;
  z-index: 0;
}
</style>
