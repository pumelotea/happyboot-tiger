<script setup>
import { NLayout, NLayoutContent, NAlert, NCode, NButton, NSpace, NCard, NInput } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

hljs.registerLanguage('javascript', javascript)

const data = `const router = useRouter()
function goto(){
  router.push('/hide?id='+title.value,'标题字符串')
}`

const title = ref('')

const router = useRouter()

function goto () {
  // 重载后的push方法，可以支持传递标题
  router.push('/hide?id=' + title.value, title.value)
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>自定义导航按钮标题的演示</h2>
          <n-space align="center">
            <n-input
              v-model:value="title"
              placeholder="请输入自定义标题"
            />
            <n-button
              type="info"
              @click="goto"
            >
              跳转
            </n-button>
          </n-space>
          <n-alert type="info">
            标题自定义非常简单，happykit框架对push方法进行了重载，根据URL地址的Hash来映射对应的标题<br>如以下代码
          </n-alert>
          <n-card>
            <n-code
              :code="data"
              language="JavaScript"
              :hljs="hljs"
            />
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
