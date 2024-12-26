<script setup>
import HbAdminMenu from '@/components/HbAdminMenu.vue'
import HbAdminHead from '@/components/HbAdminHead.vue'
import HbAdminNav from '@/components/HbAdminNav.vue'
import HbAdminLogo from '@/components/HbAdminLogo.vue'
import HbAdminCopyright from '@/components/HbAdminCopyright.vue'
import { RouteAlive } from '@/global/router'

import {
  NMessageProvider,
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent,
  NEmpty, NIcon,
  zhCN,
  dateZhCN
} from 'naive-ui'

import { theme, isMenuCollapsed } from '@/global/config'
import { AlbumsOutline } from '@vicons/ionicons5'
import framework from '@/global/framework'

function onLayoutCollapsed (collapsed) {
  isMenuCollapsed.value = collapsed
}

const currentMenuRoute = framework.getCurrentMenuRoute()

</script>

<template>
  <n-config-provider
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-message-provider>
      <n-layout
        has-sider
        class="main-layout"
      >
        <n-layout-sider
          style="width: fit-content"
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :collapsed="isMenuCollapsed"
          content-style="display: flex;flex-direction: column;"
          @update:collapsed="onLayoutCollapsed"
        >
          <div style="flex: 1;overflow: auto">
            <hb-admin-menu />
          </div>
        </n-layout-sider>
        <n-layout content-style="display: flex;flex-direction: column;">
          <n-layout-header
            class="main-head"
            bordered
          >
            <hb-admin-head />
          </n-layout-header>
          <n-layout-header
            class="main-nav"
            bordered
          >
            <hb-admin-nav />
          </n-layout-header>
          <n-layout-content
            class="main-content"
            embedded
          >
            <router-view v-slot="{ Component,route }">
              <route-alive
                :is="Component"
                class="animate__animated animate__fadeIn"
                :route="route"
              />
            </router-view>
            <div
              v-if="!currentMenuRoute"
              class="empty-route-body"
            >
              <n-empty
                size="huge"
                description="还没打开页面呐 ~"
              >
                <template #icon>
                  <n-icon :component="AlbumsOutline" />
                </template>
              </n-empty>
            </div>
          </n-layout-content>
          <n-layout-footer class="main-foot">
            <hb-admin-copyright />
          </n-layout-footer>
        </n-layout>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
.main-layout {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.main-head {
  height: 60px;
}

.main-nav {
  height: 50px;
}

.main-content {
  flex: 1;
  z-index: 1;
}

.main-foot {
  height: 40px;
}

.empty-route-body {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
