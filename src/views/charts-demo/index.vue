<script setup>
import {NLayout,NLayoutContent,NAlert,NSpace} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import DemoBar from "./bar.demo"
import DemoPie from "./pie.demo"
import DemoPieScale from "./scale.pie.demo"
import DemoLine from "./line.demo"
import {useRouter} from "vue-router";
const router = useRouter()
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>ECharts图表组件</h2>
          <n-alert type="info">
            简单图表组件
          </n-alert>
          <demo-bar/>
          <demo-pie/>
          <demo-line/>
          <demo-pie-scale/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
