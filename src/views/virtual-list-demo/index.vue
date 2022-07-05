<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace,} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from "./base.demo";
import {onMounted, ref,} from "vue";

const pics = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
]

const list = ref([])

onMounted(()=>{
  for (let i = 0; i < 20; i++) {
    list.value.push({
      avatar: pics[i % pics.length],
      name: "张三------" + i,
      age: (Math.random() * 100 + 1).toFixed(0),
      score: (Math.random() * 10 + 1).toFixed(2)
    })
  }
})

function addData(){
  for (let i = 0; i < 20; i++) {
    list.value.push({
      avatar: pics[i % pics.length],
      name: "张三------" + i,
      age: (Math.random() * 100 + 1).toFixed(0),
      score: (Math.random() * 10 + 1).toFixed(2)
    })
  }
}
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>虚拟列表</h2>
          <n-alert type="info">
            高性能虚拟列表
          </n-alert>
          <demo/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>


