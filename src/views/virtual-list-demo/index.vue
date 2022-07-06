<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace,} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import Demo from "./base.demo";
import DemoAuto from "./auto.demo";

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
          <demo-auto/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>


