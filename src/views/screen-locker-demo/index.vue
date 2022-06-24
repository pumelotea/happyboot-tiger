<script setup>
import {NLayout, NLayoutContent, NAlert, NButton, NSpace, NCard,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import {ref} from "vue"
import HbAdminScreenLocker from "@/components/HbAdminScreenLocker";

const show = ref(false)
const message = useMessage()
function unlock(){
  message.success("解锁成功")
}
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>锁屏组件</h2>
          <n-alert type="info">
            用户在操作时，如果token失效情况下，可以弹出锁屏，让用户重新登录后完成token刷新
          </n-alert>
          <n-card>
            <n-space>
              <n-button type="info" @click="show=true">打开锁屏</n-button>
            </n-space>
          </n-card>
        </n-space>
        <hb-admin-screen-locker v-model:open="show" @unlock="unlock"/>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.image {
  width: 100px;
}
</style>
