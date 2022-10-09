<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import Demo from './base.demo.vue'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>可动态调整的容器</h2>
          <n-alert type="info">
            可以鼠标拖拽调整容器大小
          </n-alert>
          <demo />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
