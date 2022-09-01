<script setup>
import HbAdminDevTool from '@/components/dev/HbAdminDevTool.vue'
import { useMessage, useThemeVars } from 'naive-ui'
import HbAdminLoading from '@/components/HbAdminLoading.vue'
window.$message = useMessage()
const vars = useThemeVars()
</script>
<template>
  <router-view />
  <!--
    生产环境下这个dev-tool可以注释掉
  -->
  <hb-admin-dev-tool />
  <hb-admin-loading />
  <!--
    用于放置一些需要全局fixed的弹出组件，并且让组件支持适配主题。
    注意：如果直接放到document.body下那么会脱离naive-ui的config-provider,就无法使用它提供的主题适配变量了。
  -->
  <div id="pop-body" />
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
