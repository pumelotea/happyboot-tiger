<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from "./base.demo"

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>视频播放器</h2>
          <n-alert type="info">
            基于xiguaplayer
          </n-alert>
          <demo/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

