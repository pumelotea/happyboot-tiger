<script setup>
import {NSpin} from 'naive-ui'
import 'highlight.js/styles/atom-one-light.css'
import {ref} from "vue"

const props = defineProps({
  code:{
    type:String,
    required:true
  }
})

const codeHtml = ref('')

const worker = new Worker('/worker/highlight.js',{name: 'highlight'})
// 主线程中，监听子线程 worker 回发的数据
worker.onmessage = (msg) => {
  const result = JSON.parse(msg.data)
  codeHtml.value = result.value
  worker.terminate()
}
// 主线程中，监听 worker 错误
worker.onerror = (err) => {
  worker.terminate()
}

// 主线程中，向子线程 worker 发送数据
worker.postMessage(props.code)


</script>
<template>
  <code><pre class="hb-admin-code" v-if="codeHtml" v-html="codeHtml"></pre></code>
</template>

<style scoped>
.hb-admin-code{
  font-size: 14px;
  font-family: v-mono, SFMono-Regular, Menlo, Consolas, Courier, monospace !important;
}
</style>