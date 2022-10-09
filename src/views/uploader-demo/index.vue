<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片上传</h2>
          <n-alert type="info">
            在开发中
          </n-alert>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.no-key-btn{

}
</style>
