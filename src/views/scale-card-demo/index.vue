<script setup>
import {NLayout, NLayoutContent, NAlert, NSpace, NCard} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminScaleCard from "@/components/HbAdminScaleCard";
</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>缩放卡片</h2>
          <n-alert type="info">
            该卡片可以方便的缩放一些数据可视化组件
          </n-alert>
          <n-card title="contain模式">
            <div style="height: 500px">
              <hb-admin-scale-card :width="1280" :height="768" mode="contain">
                <iframe frameborder="0" style="width: 100%;height: 100%;box-sizing: border-box;border:1px solid grey"  src="https://happykit.org/"></iframe>
              </hb-admin-scale-card>
            </div>
          </n-card>
          <n-card title="fill模式">
            <div style="height: 500px">
              <hb-admin-scale-card :width="1280" :height="768" mode="fill">
                <iframe frameborder="0" style="width: 100%;height: 100%;box-sizing: border-box;border:1px solid grey"  src="https://happykit.org/"></iframe>
              </hb-admin-scale-card>
            </div>
          </n-card>
          <n-card title="cover模式">
            <div style="height: 500px">
              <hb-admin-scale-card :width="1280" :height="768" mode="cover">
                <iframe frameborder="0" style="width: 100%;height: 100%;overflow:hidden;box-sizing: border-box;border:1px solid grey"  src="https://happykit.org/"></iframe>
              </hb-admin-scale-card>
            </div>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
