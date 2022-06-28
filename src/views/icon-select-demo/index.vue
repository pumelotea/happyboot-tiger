<script setup>
import {NLayout,NLayoutContent,NAlert,NSpace} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import DemoBase from "./base.demo"
import DemoModal from "./modal.demo"

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图标选择组件</h2>
          <n-alert type="info">
            基于RemixIcon图标库
          </n-alert>
          <demo-modal/>
          <demo-base/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
