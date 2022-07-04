<hb-demo>
基本用法
</hb-demo>
<script setup>
import { NSpace } from 'naive-ui'
import HbAdminImagePreview from '@/components/HbAdminImagePreview'
import { ref } from 'vue'

const list = ref([
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
])
const isShow = ref(false)
const current = ref(0)
function handleImgClick (index) {
  isShow.value = true
  current.value = index
}
</script>
<template>
  <div>
    <n-space>
      <img
        v-for="(e,index) in list"
        :key="index"
        class="image"
        :src="e"
        @click="handleImgClick(index)"
      >
    </n-space>
    <hb-admin-image-preview
      v-model:value="isShow"
      :list="list"
      is-thumb
      :initial-index="current"
    />
  </div>
</template>
<style scoped>
.image{
  width: 100px;
}
</style>
