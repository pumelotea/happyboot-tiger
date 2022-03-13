<script setup>
import HbAdminPageLayout from '../../components/HbAdminPageLayout.vue'
import {
  NLayout, NLayoutHeader, NLayoutContent,NLayoutFooter, NCard,
  NGrid, NGridItem, NDatePicker, NInput, NButton, NSpace, NIcon, useMessage,
  NPopconfirm, NAlert,NCarousel,NEllipsis,NPagination
} from "naive-ui";
import {h, onMounted, reactive, ref} from "vue";
import {
  AddSharp, TrashSharp, RefreshSharp, SearchSharp,DocumentOutline,CreateOutline
} from "@vicons/ionicons5"


const page= ref(2)
const pageSize= ref(20)

</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="height: 100%;" content-style="display:flex;flex-direction: column">
      <n-layout-header>
        <n-grid x-gap="12" :cols="4" style="padding: 5px;box-sizing: border-box">
          <n-grid-item>
            <n-input>
              <template #prefix>
                姓名
              </template>
            </n-input>
          </n-grid-item>
          <n-grid-item>
            <n-input>
              <template #prefix>
                手机号
              </template>
            </n-input>
          </n-grid-item>
          <n-grid-item>
            <n-date-picker clearable placeholder="创建日期"></n-date-picker>
          </n-grid-item>
        </n-grid>
        <n-grid x-gap="12" :cols="2" style="padding: 5px;box-sizing: border-box">
          <n-grid-item>
            <n-space>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="AddSharp"></n-icon>
                </template>
                新增
              </n-button>
              <n-button type="error">
                <template #icon>
                  <n-icon :component="TrashSharp"></n-icon>
                </template>
                删除
              </n-button>
            </n-space>
          </n-grid-item>
          <n-grid-item>
            <n-space justify="end">
              <n-button type="info">
                <template #icon>
                  <n-icon :component="RefreshSharp"></n-icon>
                </template>
                刷新数据
              </n-button>
              <n-button type="info">
                <template #icon>
                  <n-icon :component="SearchSharp"></n-icon>
                </template>
                查询
              </n-button>
              <n-button>重置</n-button>
            </n-space>
          </n-grid-item>
        </n-grid>
      </n-layout-header>
      <n-layout-content style="padding: 5px;box-sizing: border-box">
        <n-grid cols="5 s:2 m:4 l:5 xl:5 2xl:6" responsive="screen" x-gap="20" y-gap="20">
          <n-grid-item v-for="i in 20">
            <n-card size="small" hoverable content-style="padding: 0;overflow:hidden" style="overflow:hidden;">
              <n-carousel show-arrow>
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
                >
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
                >
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
                >
                <img
                    class="carousel-img"
                    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
                >
              </n-carousel>
              <template #footer>
                <h3>我是标题</h3>
                <n-ellipsis :line-clamp="2">
                  电灯熄灭 物换星移 泥牛入海 黑暗好像 一颗巨石 按在胸口 独脚大盗
                  百万富翁 摸爬滚打 黑暗好像 一颗巨石 按在胸口
                </n-ellipsis>
              </template>
              <template #action>
                <n-space justify="end">
                  <n-button circle tertiary>
                    <template #icon>
                      <n-icon :component="DocumentOutline"></n-icon>
                    </template>
                  </n-button>
                  <n-button circle tertiary>
                    <template #icon>
                      <n-icon :component="CreateOutline"></n-icon>
                    </template>
                  </n-button>
                  <n-button circle tertiary type="error">
                    <template #icon>
                      <n-icon :component="TrashSharp"></n-icon>
                    </template>
                  </n-button>
                </n-space>
              </template>
            </n-card>
          </n-grid-item>
        </n-grid>

      </n-layout-content>
      <n-space justify="end" align="center" style="box-sizing: border-box;padding: 5px;margin: 0">
        <n-pagination
            v-model:page="page"
            v-model:page-size="pageSize"
            :page-count="100"
            show-size-picker
            :page-sizes="[10, 20, 30, 40]"
        />
      </n-space>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>
