<script setup>
import {
  NMessageProvider, NConfigProvider, zhCN, dateZhCN
} from 'naive-ui'

import HbAdminDevTool from "./components/dev/HbAdminDevTool.vue";
import {theme} from "./global/config";

</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <router-view/>
      <hb-admin-dev-tool/>
    </n-message-provider>
  </n-config-provider>
</template>
