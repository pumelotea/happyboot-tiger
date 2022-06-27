<script setup>
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
  a.download = `data.zip`;
  a.click();
  window.URL.revokeObjectURL(url)
}
</script>
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
</template>
