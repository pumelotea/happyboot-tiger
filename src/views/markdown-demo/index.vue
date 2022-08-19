<script setup>
import {
  NLayout, NLayoutContent, NAlert, NSpace
} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from './base.demo'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding: 20px">
      <n-layout-content>
        <n-space vertical>
          <h2>Markdown编辑器</h2>
          <n-alert type="info">
            集成 https://bytemd.js.org ，唯一的遗憾就是官方没有自带的夜间模式。
          </n-alert>
          <demo/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

