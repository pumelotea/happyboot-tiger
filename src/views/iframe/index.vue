<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>内嵌外链</h2>
          <n-alert type="info">
            菜单可以设置为内嵌外链，那么可以在<code>route.meta.externalLinkAddress</code>获取到外链。iframe组件可以自己定义。
          </n-alert>
          <iframe
            style="width: 100%;height: 800px"
            frameborder="0"
            :src="router.currentRoute.value.meta.externalLinkAddress"
          />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
