<script setup>
import {NLayout,NLayoutContent,NButton,NAlert,NSpace,NCard,NInput,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue";
import {ref} from "vue";
import HbAdminDemoCard from "@/components/HbAdminDemoCard";
import Demo from "./demo";
const data = ref('')
const message = useMessage()
function copy(){
  navigator.clipboard.writeText(data.value).then(()=> {
    message.info("复制成功")
  }, (error)=> {
    console.log(error)
  })
}

const code = `<script setup>
import {NButton,NSpace,NInput,useMessage} from 'naive-ui'
import {ref} from "vue"
const data = ref('')
const message = useMessage()
function copy(){
  navigator.clipboard.writeText(data.value).then(()=> {
    message.info("复制成功")
  }, (error)=> {
    console.log(error)
  })
}
<\/script>
<template>
  <n-input v-model:value="data"><\/n-input>
  <n-space justify="flex-end" style="margin-top: 10px">
    <n-button type="primary" @click="copy">复制到剪贴板<\/n-button>
  <\/n-space>
<\/template>
`
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
          <hb-admin-demo-card title="基本用法" :code="code">
            <demo/>
          </hb-admin-demo-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
