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
        <div class="com-head-box">
          <div class="logo-box">
            <img
              class="logo-image"
              src="/src/assets/logo.png"
            >
            <div class="logo-text">
              <n-gradient-text type="success">
                HappyBoot Tiger
              </n-gradient-text>
            </div>
          </div>
          <div>
            <img
              style="height: 120px"
              src="https://github-readme-stats.vercel.app/api/pin/?username=pumelotea&locale=cn&repo=happyboot-tiger&show_icons=true"
            >
          </div>
        </div>
        <n-grid
          cols="2 400:4 600:6"
          x-gap="10"
          y-gap="10"
        >
          <n-grid-item
            v-for="e in data"
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
  margin-left: 10px;
}
</style>
