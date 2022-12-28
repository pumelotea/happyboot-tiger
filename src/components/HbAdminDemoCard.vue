<script setup>
import { NCard, NIcon, NCode, NButton, NTabs, NTabPane, NSpace, useMessage } from 'naive-ui'
import HbAdminCode from '@/components/HbAdminCode.vue'
import { CodeOutline, CopyOutline } from '@vicons/ionicons5'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import { ref } from 'vue'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

const props = defineProps({
  code: {
    type   : String,
    default: ''
  }
})
const showCode = ref(false)
const message = useMessage()
function copy () {
  navigator.clipboard.writeText(props.code).then(() => {
    message.info('复制成功')
  }, (error) => {
    console.log(error)
  })
}

</script>
<template>
  <n-card size="small">
    <template #header-extra>
      <n-space>
        <n-button
          text
          @click="showCode = !showCode"
        >
          <n-icon :component="CodeOutline" />
        </n-button>
        <n-button
          text
          @click="copy"
        >
          <n-icon :component="CopyOutline" />
        </n-button>
      </n-space>
    </template>
    <slot />
    <template
      v-if="showCode"
      #action
    >
      <n-tabs type="segment">
        <n-tab-pane
          name="demo-code"
          tab="演示代码"
        >
          <hb-admin-code :code="props.code"></hb-admin-code>
        </n-tab-pane>
      </n-tabs>
    </template>
  </n-card>
</template>
<style scoped>

</style>
