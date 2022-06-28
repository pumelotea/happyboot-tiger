<script setup>
import {NLayout,NLayoutContent,NAlert,NButton,NSpace,NCard,NModal, NTimeline, NTimelineItem,NIcon,useMessage} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminImageFactory from "@/components/HbAdminImageFactory/index.vue";

</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片工厂组件</h2>
          <n-alert type="info">
            此组件可以上传或者传入一个图片地址进行对图片的一些二次加工处理。例如：调整图片大小、设置图片质量、添加图片水印等。
          </n-alert>
          <n-card>
            <div class="demo-image-factory">
              <hb-admin-image-factory type="watermark" />
            </div>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.demo-image-factory{
  width: 100%;
}
</style>
