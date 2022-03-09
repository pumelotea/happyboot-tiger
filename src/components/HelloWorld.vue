<script setup>
import {reactive, ref} from 'vue'
import { NButton } from 'naive-ui'

defineProps({
  msg: String
})

const a = ref("asdasd")

const count = ref(0)

const xx = reactive({
  x:0,y:0
})

xx.y = 1
xx.x = 1

function test(){
  a.value = "askjndakjsndkjansdkjanskdjansdkajsnd"
  console.log(xx)
}



</script>

<template>
  <h1>{{ msg }}</h1>
  <div>{{a}}</div>
  <n-button type="error" @click="test">asdasdasd</n-button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <n-button type="error" @click="count++">count is: {{ count }}</n-button>
  asdasd
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
