<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace, NCard } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import DemoBase from './base.demo.vue'
import DemoH from './h.demo.vue'
import DemoW from './w.demo.vue'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片组件</h2>
          <n-alert type="info">
            设置宽高后，图片将按比例缩放到完整显示较小的边，长的边会进行裁剪(不设置宽高时，为图片原始宽高)
          </n-alert>
          <demo-base />
          <demo-h />
          <demo-w />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
