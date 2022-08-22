<script setup>
import {NLayout,NLayoutContent,NAlert,NSpace} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import BaseDemo from './base.demo'


</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>富文本编辑器</h2>
          <n-alert type="info">
            在开发中
          </n-alert>
        </n-space>
        <base-demo></base-demo>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>