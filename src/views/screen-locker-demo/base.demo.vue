<hb-demo>
基本用法
</hb-demo>
<script setup>
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'
import HbAdminScreenLocker from '@/components/HbAdminScreenLocker'

const show = ref(false)
const message = useMessage()
function unlock () {
  message.success('解锁成功')
}
</script>
<template>
  <hb-admin-screen-locker
    v-model:open="show"
    @unlock="unlock"
  />
  <n-space style="margin-top: 10px">
    <n-button
      type="info"
      @click="show=true"
    >
      打开锁屏
    </n-button>
  </n-space>
</template>
<style scoped>

</style>
