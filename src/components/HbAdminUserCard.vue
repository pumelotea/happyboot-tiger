<script setup>
import {NAvatar,NLayout,NLayoutHeader,NIcon,NButton} from "naive-ui";
import {
  SettingsOutline
} from "@vicons/ionicons5"
import {isMenuCollapsed} from "../global/config";
</script>

<template>
  <n-layout>
    <n-layout-header  style="border-top: solid 1px var(--n-border-color)">
      <div class="hb-admin-user-card-com">
        <n-avatar size="large" round src="https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG"/>
        <span class="nickname" v-if="!isMenuCollapsed">千阳</span>
        <span style="flex: 1" v-if="!isMenuCollapsed"></span>
        <n-button text>
          <n-icon size="24" :component="SettingsOutline" v-if="!isMenuCollapsed"></n-icon>
        </n-button>
      </div>
    </n-layout-header>
  </n-layout>
</template>

<style scoped>
.hb-admin-user-card-com {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nickname{
  font-weight: bold;
  margin-left: 10px;
  color: var(--n-text-color);
  transition: color .3s var(--n-bezier);
}
</style>
