<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import DemoContain from './contain.demo'
import DemoCover from './cover.demo'
import DemoFill from './fill.demo'
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>缩放卡片</h2>
          <n-alert type="info">
            该卡片可以方便的缩放一些数据可视化组件
          </n-alert>
          <demo-contain />
          <demo-cover />
          <demo-fill />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
