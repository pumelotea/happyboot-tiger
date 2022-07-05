<hb-demo>
基本用法
</hb-demo>
<script setup>
import { NSkeleton,NButton, NAvatar} from 'naive-ui'
import {onMounted, ref} from "vue";
import HbAdminVirtualList from "@/components/HbAdminVirtualList";

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

onMounted(addData)

</script>
<template>
  <div style="margin-bottom: 10px"><n-button type="info" @click="addData">添加数据</n-button></div>
  <div style="margin-bottom: 10px">列表长度 {{list.length}}</div>
  <div class="list-demo">
    <hb-admin-virtual-list :data="list">
      <template v-slot:default="{item}">
        <div class="user-card">
          <div class="avatar">
            <n-avatar size="large" :src="item.avatar" round></n-avatar>
          </div>
          <div class="text">
            <div>{{ item.name }}</div>
            <div>{{ item.age }}</div>
            <div>{{ item.score }}</div>
          </div>
        </div>
      </template>
      <template #loading>
        <div class="user-card">
          <div class="avatar">
            <n-skeleton circle size="large"/>
          </div>
          <div class="text">
            <n-skeleton text :repeat="2"/>
            <n-skeleton text style="width: 60%"/>
          </div>
        </div>
      </template>
    </hb-admin-virtual-list>
  </div>
</template>
<style scoped>
.list-demo {
  height: 500px;
  width: 300px;
  border: 1px solid rgba(128, 128, 128, 0.22);
  border-radius: 3px;
}

.avatar {
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  flex: 1;
}

.user-card {
  padding: 10px;
  box-sizing: border-box;
  height: 80px;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(128, 128, 128, 0.22);
}
</style>
