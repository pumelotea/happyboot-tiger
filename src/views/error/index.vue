<script setup>
import { NResult, NSpace, NButton, NLayout } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

function retry () {
  router.push('/')
}
</script>
<template>
  <div>
    <n-layout class="hb-admin-error">
      <n-space
        style="height: 100%"
        justify="center"
        align="center"
      >
        <n-result
          size="huge"
          status="404"
          title="发生了一点意外"
        >
          <template #footer>
            <n-button
              type="primary"
              @click="retry"
            >
              点击这里试试
            </n-button>
          </template>
        </n-result>
      </n-space>
    </n-layout>
  </div>
</template>

<style scoped>
.hb-admin-error{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: 100% 100%;
}
</style>
