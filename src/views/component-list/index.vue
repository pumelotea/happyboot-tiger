<script setup>
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import {NGrid,NGridItem,NLayout,NLayoutContent,NIcon,NSpace,NCard,NBadge} from 'naive-ui'
import framework from "@/global/framework";
import {useRouter} from "vue-router";
const router = useRouter()

const list = framework.getMenuTree()
const data = list.value.filter(e=>{return e.path === '/demo'})[0].children

function goto(path){
  router.push(path)
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-grid cols="2 400:4 600:6" x-gap="10" y-gap="10">
          <n-grid-item v-for="e in data" style="padding: 10px">
            <n-card hoverable @click="goto(e.routerPath)">
              <div class="com-card">
                <div class="com-tag">
                  <n-badge v-if="e.budge" :value="e.budge?.value" :type="e.budge?.type"></n-badge>
                </div>
                <n-icon :size="36" >
                  <i :class="e.icon"></i>
                </n-icon>
                <div class="com-title">{{e.name}}</div>
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
</style>
