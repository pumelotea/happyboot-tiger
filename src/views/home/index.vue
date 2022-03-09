<script setup>
import HbAdminMenu from "../../components/HbAdminMenu.vue"
import HbAdminHead from "../../components/HbAdminHead.vue"
import HbAdminNav from "../../components/HbAdminNav.vue"
import HbAdminLogo from "../../components/HbAdminLogo.vue"
import HbAdminCopyright from "../../components/HbAdminCopyright.vue"
import HbAdminUserCard from "../../components/HbAdminUserCard.vue"

import {
  NMessageProvider,
  NConfigProvider,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NLayoutFooter,
  NLayoutContent
} from "naive-ui"

import {theme,isMenuCollapsed} from "../../global/config";

function onLayoutCollapsed(collapsed){
  isMenuCollapsed.value = collapsed
}


</script>

<template>
  <n-config-provider :theme="theme">
    <n-message-provider>
      <n-layout has-sider class="main-layout">
        <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            show-trigger
            content-style="display: flex;flex-direction: column;"
            @update:collapsed="onLayoutCollapsed"
        >
          <div><hb-admin-logo/></div>
          <div style="flex: 1;overflow: auto">
            <hb-admin-menu/>
          </div>
          <div>
            <hb-admin-user-card/>
          </div>
        </n-layout-sider>
        <n-layout content-style="display: flex;flex-direction: column;">
          <n-layout-header class="main-head" bordered>
            <hb-admin-head/>
          </n-layout-header>
          <n-layout-header class="main-nav" bordered>
            <hb-admin-nav/>
          </n-layout-header>
          <n-layout-content class="main-content">
            <router-view v-slot="{ Component }">
              <component :is="Component"></component>
            </router-view>
          </n-layout-content>
          <n-layout-footer class="main-foot">
            <hb-admin-copyright/>
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
}

.main-foot {
  height: 40px;
}
</style>
