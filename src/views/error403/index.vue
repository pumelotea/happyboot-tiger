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
      status="403"
      title="403 禁止访问"
      description="总有些门是对你关闭的"
    >
      <template #footer>
        <n-button>返回首页</n-button>
      </template>
    </n-result>
  </n-space>
</template>

<style scoped>

</style>
