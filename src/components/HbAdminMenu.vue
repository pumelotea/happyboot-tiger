<script setup>
import { NIcon, NMenu, NBadge, NTooltip } from 'naive-ui'
import { isMenuCollapsed } from '@/global/config'
import HbAdminLogo from '@/components/HbAdminLogo.vue'
import HbAdminLogo2 from '@/components/HbAdminLogo2.vue'
import {
  naviMenuDataFiltered,
  naviMenuData,
  menuChoose,
  topLevelMenuChoose,
  topLevelMenuActive
} from '@/global/menu'
import framework from '@/global/framework'
const vars = useThemeVars()
const currentMenuRoute = framework.getCurrentMenuRoute()
const props = defineProps({
  mode: {
    type   : String,
    default: null
  }
})
</script>
<template>
  <div class="hb-admin-menu-com">
    <div
      v-if="!isMenuCollapsed"
      class="hb-admin-menu-top-level-box"
    >
      <hb-admin-logo2 v-if="!isMenuCollapsed" />
      <div class="hb-admin-menu-top-level">
        <div
          v-for="e in naviMenuData"
          :key="e.menuId"
          class="hb-admin-menu-top-level-item"
          :class="{'active': topLevelMenuActive(e.menuId)}"
          @click="topLevelMenuChoose(e.menuId, e)"
        >
          <i
            :class="`${e.original.icon}`"
            style="font-size: 24px"
          />
          <div class="hb-admin-menu-top-level-item-name">
            {{ e.name }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="naviMenuDataFiltered.length"
      class="hb-admin-menu-sub-level"
    >
      <hb-admin-logo v-if="isMenuCollapsed" />
      <n-menu
        class="animate__animated animate__faster animate__slideInRight"
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

.hb-admin-menu-item{
  white-space: nowrap;
  word-break: keep-all;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 5px;
}

.hb-admin-menu-item-label{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
