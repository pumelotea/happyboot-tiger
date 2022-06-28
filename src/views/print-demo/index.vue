<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace} from 'naive-ui'
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import DemoText from "@/views/print-demo/text.demo"
import DemoTable from "@/views/print-demo/table.demo"
import DemoImage from "@/views/print-demo/image.demo"

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>打印组件</h2>
          <n-alert type="info">
            包裹需要打印的内容即可，然后调用暴露的print方法；一定要设定打印内容的宽度，比如A4纸张的宽度为210mm
          </n-alert>
          <demo-text/>
          <demo-table/>
          <demo-image/>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
