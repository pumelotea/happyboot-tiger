<hb-demo>
基本用法
</hb-demo>
<script setup>
import HbAdminRollList from "@/components/HbAdminRollList";
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
</script>
<template>
  <div style="height: 600px;width: 400px;box-shadow: inset 0 0 5px 10px rgba(0,0,0,0.1);border-radius: 5px">
    <hb-admin-roll-list :speed="3000" direction="up">
      <div v-for="e in list" class="card">
        <img :src="e" style="height: 100%;width: 100%;display: block;">
      </div>
      <div style="height: 30px;display: flex;justify-content: center;align-items: center;background: #d0d0d0">END</div>
    </hb-admin-roll-list>
  </div>
</template>
<style scoped>
.card{
  margin: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  overflow: hidden;
}
</style>
