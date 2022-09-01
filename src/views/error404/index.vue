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
      status="404"
      title="404 资源不存在"
      description="生活总归带点荒谬"
    >
      <template #footer>
        <n-button>返回首页</n-button>
      </template>
    </n-result>
  </n-space>
</template>

<style scoped>

</style>
