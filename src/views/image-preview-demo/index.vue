<script setup>
import { NLayout, NLayoutContent, NAlert, NButton, NSpace, NCard } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import Demo from './base.demo'
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片预览组件</h2>
          <n-alert type="info">
            传入一个图片数组即可，支持预览图列表，点击图片预览
          </n-alert>
          <demo />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
