<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import BaseDemo from './base.demo'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>富文本编辑器</h2>
          <n-alert type="info">
            在开发中 源码托管在github：github.com/pumelotea/vivid
          </n-alert>
        </n-space>
        <base-demo style="margin-top: 10px" />
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
