<script setup>
import { NResult, NSpace, NButton } from 'naive-ui'
</script>
<template>
  <n-space
    style="height: 100%"
    justify="center"
    align="center"
  >
    <n-result
      size="huge"
      status="500"
      title="500 服务器错误"
      description="服务器出错可能说明该雇更多程序员了"
    >
      <template #footer>
        <n-button>返回首页</n-button>
      </template>
    </n-result>
  </n-space>
</template>

<style scoped>

</style>
