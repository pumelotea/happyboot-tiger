<script setup>
import HbAdminDevTool from "@/components/dev/HbAdminDevTool.vue";
import { useMessage,useThemeVars } from 'naive-ui'
import HbAdminLoading from "@/components/HbAdminLoading.vue";
window.$message = useMessage()
const vars = useThemeVars()
</script>
<template>
  <router-view/>
  <hb-admin-dev-tool/>
  <hb-admin-loading/>
</template>

<style>
::-webkit-scrollbar {
  width: v-bind(vars.scrollbarWidth);
  height: v-bind(vars.scrollbarHeight);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: v-bind(vars.scrollbarBorderRadius);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: v-bind(vars.scrollbarBorderRadius);
  background-color: v-bind(vars.scrollbarColor);
}

::-webkit-scrollbar-thumb:hover {
  background-color: v-bind(vars.scrollbarColorHover);
}
</style>
