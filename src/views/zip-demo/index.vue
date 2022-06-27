<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminDemoCard from "@/components/HbAdminDemoCard"
import Demo from "./demo"

const code = `<script setup>
import {NButton, NSpace} from 'naive-ui';
import jszip from 'jszip'

async function makeZip(){
  const pack = jszip()
  pack.file("hello.txt", 'hello world')
  pack.folder("package").file("hello2.txt", 'hello happyboot tiger')
  const data = await pack.generateAsync({type: "uint8array"})
  const blob = new Blob([data])
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = \`data.zip\`;
  a.click();
  window.URL.revokeObjectURL(url)
}
<\/script>
<template>
  示例文件目录结构
  <pre>
  -- hello.txt
  -- package
  ---- hello2.txt
</pre>
  <n-space justify="flex-end" style="margin-top: 10px">
    <n-button type="info" @click="makeZip">生成压缩包</n-button>
  </n-space>
<\/template>
`
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>压缩包生成</h2>
          <n-alert type="info">
            基于jszip实现
          </n-alert>
          <hb-admin-demo-card title="基本用法" :code="code">
            <demo/>
          </hb-admin-demo-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

