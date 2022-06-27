<script setup>
import {NButton, NSpace} from 'naive-ui';
import HbAdminPrint from "@/components/HbAdminPrint";
import {ref} from "vue";

const printPicInstance = ref(null)
function printPic() {
  printPicInstance.value.print()
}
</script>
<template>
  <div>
    <hb-admin-print ref="printPicInstance">
      <n-space vertical justify="center">
        <img width="500" src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg">
        <img width="500" src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg">
        <img width="500" src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg">
      </n-space>
    </hb-admin-print>
    <n-space justify="flex-end" style="margin-top: 10px">
      <n-button type="info" @click="printPic">打印图片</n-button>
    </n-space>
  </div>
</template>
<style scoped>

</style>
