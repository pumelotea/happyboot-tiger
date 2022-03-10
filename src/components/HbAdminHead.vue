<script setup>
import { NIcon,NBadge,NAvatar,NSwitch,NCarousel,NDivider,NDropdown,useMessage, NText, NBreadcrumb,NBreadcrumbItem } from "naive-ui"
import { Moon,SunnyOutline,Notifications } from "@vicons/ionicons5"
import {ref, h, onMounted, computed} from "vue"
import {isDarkTheme} from "../global/config";
import framework from "../global/framework";
import { CubeOutline } from "@vicons/ionicons5"

function renderCustomHeader() {
  return h("div", {
    style: "display: flex; align-items: center; padding: 8px 12px;"
  }, [
    h(NAvatar, {
      round: true,
      style: "margin-right: 12px;",
      src: "https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG"
    }),
    h("div", null, [
      h("div", null, [h(NText, { depth: 2 }, { default: () => "打工仔" })]),
      h("div", { style: "font-size: 12px;" }, [
        h(NText, { depth: 3 }, { default: () => "毫无疑问，你是办公室里最亮的星" })
      ])
    ])
  ]);
}

const message = useMessage()

const options = [
  {
    key: "header",
    type: "render",
    render: renderCustomHeader
  },
  {
    key: "header-divider",
    type: "divider"
  },
  {
    label: "处理群消息 342 条",
    key: "stmt1"
  },
  {
    label: "被 @ 58 次",
    key: "stmt2"
  },
  {
    label: "加入群 17 个",
    key: "stmt3"
  }
]
function handleSelect(key) {
  message.info(String(key))
}



const currentMenuRoute = framework.getCurrentMenuRoute()

const breadcrumb= computed(()=>{
  return currentMenuRoute.value?.menuItem.breadcrumb
})



</script>

<template>
  <div class="hb-admin-head-com">
    <div class="head-left-area head-item-center">
      <n-breadcrumb>
        <n-breadcrumb-item v-for="e in breadcrumb">

          <n-icon>
            <i :class="e.icon" v-if="e.icon"></i>
            <cube-outline v-else/>
          </n-icon>
          {{e.name}}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="head-center-area head-item-center">
      <div class="carousel-box">
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
      </div>
    </div>
    <div class="head-right-area head-item-center">
      <n-switch v-model:value="isDarkTheme">
        <template v-slot:checked-icon>
          <n-icon :component="Moon" />
        </template>
        <template v-slot:unchecked-icon>
          <n-icon :component="SunnyOutline" />
        </template>
      </n-switch>
      <n-divider vertical/>
      <n-icon size="25" color="#CFCFCF" :component="Notifications" />
      <n-badge value="99+"></n-badge>
      <n-divider vertical/>

      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-avatar round bordered src="https://07akioni.oss-cn-beijing.aliyuncs.com/demo1.JPG"></n-avatar>
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped>
.hb-admin-head-com{
  height: 100%;
  display: flex;
}

.head-item-center{
  display: flex;
  align-items: center;
  height: 100%;
}

.head-left-area{
  padding: 0 20px;
}

.head-center-area{
  justify-content: right;
  flex: 1;
  align-items: center;
}

.head-right-area{
  padding: 0 20px;
}

.carousel-box{
  width: 300px;
}

.carousel-img {
  width: 100%;
  height: 50px;
  object-fit: cover;
}
</style>
