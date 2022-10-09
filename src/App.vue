<script setup>
import {
  NMessageProvider, NConfigProvider, zhCN, dateZhCN,NNotificationProvider
} from 'naive-ui'
import { theme } from '@/global/config'
import HappyBoot from '@/HappyBoot.vue'

</script>
<template>
  <n-config-provider
    :theme="theme"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <n-notification-provider placement="bottom-left">
      <n-message-provider>
        <happy-boot />
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>
