<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import DemoCard from './card.demo'
import DemoModal from './modal.demo'
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>头像裁剪组件</h2>
          <n-alert type="info">
            在卡片组件中使用，支持拖拽图片到灰色区域内
          </n-alert>
          <demo-card />
          <n-alert type="info">
            在弹出框组件中使用，点击灰色头像组件体验裁剪
          </n-alert>
          <demo-modal />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
