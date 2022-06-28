<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from './base.demo'
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>锁屏组件</h2>
          <n-alert type="info">
            用户在操作时，如果token失效情况下，可以弹出锁屏，让用户重新登录后完成token刷新
          </n-alert>
          <demo/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
