<script setup>
import {NLayout, NLayoutContent, NAlert, NButton, NSpace, NCard} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"

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
  a.download = `data.zip`;
  a.click();
  window.URL.revokeObjectURL(url)
}

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
          <n-card>
            示例文件目录结构
<pre>
  -- hello.txt
  -- package
  ---- hello2.txt
</pre>
            <template #footer>
              <n-space justify="flex-end">
                <n-button type="info" @click="makeZip">生成压缩包</n-button>
              </n-space>
            </template>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

