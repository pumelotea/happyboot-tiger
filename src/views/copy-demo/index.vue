<script setup>
import {NLayout,NLayoutContent,NButton,NAlert,NSpace,NCard,NInput,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import {ref} from "vue";
const data = ref('')
const message = useMessage()
function copy(){
  navigator.clipboard.writeText(data.value).then(()=> {
    message.info("复制成功")
  }, (error)=> {
    console.log(error)
  })
}
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>剪贴板复制</h2>
          <n-alert type="info">
            使用Clipboard API实现
          </n-alert>
          <n-card>
            <n-input v-model:value="data"></n-input>
            <template #footer>
              <n-space justify="flex-end">
                <n-button type="primary" @click="copy">复制到剪贴板</n-button>
              </n-space>
            </template>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
