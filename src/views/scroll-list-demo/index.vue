<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import Demo from './base.demo'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>滚动列表</h2>
          <n-alert type="info">
            可以循环滚动插入的内容
          </n-alert>
          <demo />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
