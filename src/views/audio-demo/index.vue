<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from "./base.demo.vue"
import SimpleDemo from "./simple.demo.vue"
import VoiceDemo from "./voice.demo.vue"

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>音频播放器</h2>
          <n-alert type="info">
            对原版音频播放器的美化
          </n-alert>
          <demo/>
          <simple-demo/>
          <voice-demo/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

