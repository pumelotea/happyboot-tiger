<hb-demo>
基本用法
</hb-demo>
<script setup>
import { NButton, NSpace, NInput, useMessage } from 'naive-ui'
import { ref } from 'vue'
const data = ref('')
const message = useMessage()
function copy () {
  navigator.clipboard.writeText(data.value).then(() => {
    message.info('复制成功')
  }, (error) => {
    console.log(error)
  })
}
</script>
<template>
  <n-input v-model:value="data" />
  <n-space
    justify="flex-end"
    style="margin-top: 10px"
  >
    <n-button
      type="primary"
      @click="copy"
    >
      复制到剪贴板
    </n-button>
  </n-space>
</template>
