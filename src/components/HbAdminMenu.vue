<script setup>
import {computed, h, toRaw} from "vue"
import {NIcon, NMenu} from "naive-ui"
import {
  CubeOutline
} from "@vicons/ionicons5"
import framework from '.././global/framework'
import {useRouter} from "vue-router";

const router = useRouter()

const menuTree = framework.getMenuTree()

const currentMenuRoute = framework.getCurrentMenuRoute()


function renderIcon(icon) {
  if (!icon){
    return () => h(NIcon, null, {default: () => h(CubeOutline)})
  }
  return () =>h('i',{class: icon})
}

function menuDataAdapter(rawMenuTree) {
  function traversal(tree){
    const list = []
    for (let i=0;i<tree.length;i++){
      if (tree[i].hide){
        continue
      }
      const subMenu = {
        name:tree[i].name,
        menuId:tree[i].menuId,
        icon:renderIcon(tree[i].icon),
        original:toRaw(tree[i])
      }
      if (tree[i].children.length > 0){
        subMenu.children = traversal(tree[i].children)
      }
      list.push(subMenu)
    }
    return list
  }

  return traversal(rawMenuTree)
}

const naviMenuData = computed(()=>{
  return menuDataAdapter(menuTree.value)
})


function menuChoose(key,item) {
  framework.clickMenuItem(key,menuItems => {
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
      label-field="name"
      @update:value="menuChoose"
      :value="currentMenuRoute?.menuItem.menuId || null"
  />
</template>

<style scoped>
.hb-admin-menu-com {
}
</style>
