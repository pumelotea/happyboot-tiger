<script setup>
import {
  NLayout, NLayoutSider, NLayoutContent, NCard,
  NAvatar, NSpace, NGradientText, NIcon, NEllipsis,
  NGrid, NGridItem, NAlert
} from "naive-ui";
import HbAdminPageLayout from "../../components/HbAdminPageLayout.vue";
</script>
<template>
  <hb-admin-page-layout>
    <n-space justify="center" style="height: 100%">
      <n-layout has-sider embedded style="height: 100%;">
        <n-layout-content embedded>
          <n-space justify="center" style="margin: 0">
            <n-space justify="center" vertical>
              <n-alert title="最新提醒" type="warning">
                您还有100条评论待审核
              </n-alert>
              <n-grid cols="3" y-gap="10" x-gap="15">
                <n-grid-item v-for="e in 12">
                  <n-card style="max-width: 280px;overflow: hidden" hoverable :bordered="false">
                    <template #cover>
                      <img src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg">
                    </template>
                  </n-card>
                </n-grid-item>
              </n-grid>
            </n-space>
          </n-space>
        </n-layout-content>
        <n-layout-sider width="320" content-style="padding-left:15px;box-sizing:border-box;" style="background-color:transparent">
          <n-card
              hoverable
              :segmented="{
      content: true,
      footer: 'soft'
    }"
          >

            <n-space justify="center" align="center">
              <n-space justify="center" align="center" vertical>
                <n-avatar
                    round
                    :size="48"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                />
                <n-gradient-text :font-size="20" type="info"> 早安，千阳！</n-gradient-text>
                <n-icon color="rgb(255 214 7)" :size="40">
                  <i class="ri-sun-line"></i>
                </n-icon>
                <n-ellipsis :line-clamp="2">
                  今天天气不错，可以洗车啦！记得饭后散散步哦~
                </n-ellipsis>
              </n-space>
            </n-space>
            <template #footer>
              <n-space justify="space-around">
                <n-space justify="center" align="center" vertical>
                  <n-icon size="24" color="rgb(208 48 80)">
                    <i class="ri-calendar-todo-line"></i>
                  </n-icon>
                  <div>12315</div>
                </n-space>
                <n-space justify="center" align="center" vertical>
                  <n-icon size="24" color="rgb(255 214 7)">
                    <i class="ri-vip-diamond-fill"></i>
                  </n-icon>
                  <div>12234</div>
                </n-space>
                <n-space justify="center" align="center" vertical>
                  <n-icon size="24" color="rgb(7 219 255)">
                    <i class="ri-message-3-line"></i>
                  </n-icon>
                  <div>34566</div>
                </n-space>
              </n-space>

            </template>
          </n-card>
        </n-layout-sider>
      </n-layout>
    </n-space>
  </hb-admin-page-layout>
</template>

