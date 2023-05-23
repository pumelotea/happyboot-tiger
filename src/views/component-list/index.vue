<script setup>
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import { NGrid, NGridItem, NLayout, NLayoutContent, NIcon, NSpace, NCard, NBadge, NGradientText } from 'naive-ui'
import framework from '@/global/framework'
import { useRouter } from 'vue-router'
const router = useRouter()

const list = framework.getMenuTree()
const data = list.value.filter(e => { return e.path === '/demo' })[0].children

function goto (path) {
  router.push(path)
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <div class="mini-ad">
          <img class="ad-image" src="/public/gh_735272938124_258.jpg">
          <n-gradient-text type="error">
            AI画图板，AI图片生成，stable diffusion图像创作工具。
          </n-gradient-text>
        </div>
        <div class="com-head-box">
          <div class="logo-box">
            <div class="logo-text">
              <n-gradient-text type="success">
                HappyBoot Library
              </n-gradient-text>
            </div>
          </div>
          <div style="flex: 1"></div>
          <div
            style="font-size: 20px;margin-right: 10px"
            class="animate__animated animate__bounce animate__repeat-3"
          >
            <a href="https://doc.happykit.org/">
              <n-gradient-text type="info">
                查看文档
              </n-gradient-text>
            </a>
          </div>
          <div
              style="font-size: 20px"
              class="animate__animated animate__bounce animate__repeat-3"
          >
            <a href="https://github.com/pumelotea/happyboot-tiger">
              <n-gradient-text type="info">
                前往Github获取源码
              </n-gradient-text>
            </a>
          </div>
        </div>
        <n-grid
          cols="2 400:4 600:6"
          x-gap="10"
          y-gap="10"
        >
          <n-grid-item
            v-for="(e,i) in data"
            :key="i"
            style="padding: 10px"
          >
            <n-card
              hoverable
              @click="goto(e.routerPath)"
            >
              <div class="com-card">
                <div class="com-tag">
                  <n-badge
                    v-if="e.budge"
                    :value="e.budge?.value"
                    :type="e.budge?.type"
                  />
                </div>
                <n-icon :size="36">
                  <i :class="e.icon" />
                </n-icon>
                <div class="com-title">
                  {{ e.name }}
                </div>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>
<style scoped>
.com-card {
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.com-title{
  margin-top: 10px;
}

.com-tag{
  position: absolute;
  top: 10px;
  right: 15px;
}

.com-head-box{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
}

.logo-box{
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image{
  height: 60px;
}

.logo-text{
  font-size: 40px;
}

.mini-ad{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ad-image{
  width: 150px;
  margin-bottom: 20px;
}
</style>
