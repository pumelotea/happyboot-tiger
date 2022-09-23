<script setup>
import { NButton } from 'naive-ui'
import framework from "@/global/framework"
import {useRouter} from "vue-router"

const router = useRouter()
const currentRouteMenu = framework.getCurrentMenuRoute()
function refreshPage(){
  framework.clickNavItem(currentRouteMenu.value?.pageId, (a, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
    }
  })
}
</script>

<template>
<div class="load-placeholder">
  <div class="load-tip">
    <div class="loading"></div>
  </div>
  <div class="load-tip-text">长时间未响应点击刷新</div>
  <div style="width: 200px">
    <n-button @click="refreshPage" secondary block type="primary">
      刷新页面
    </n-button>
  </div>
</div>
</template>

<style scoped>
.load-placeholder{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.load-tip{
  margin-top: 30px;
}

.load-tip-text{
  margin-top: 20px;
  margin-bottom: 10px;
}

.loading {
  position: relative;
  width: 50px;
  perspective: 200px;
}

.loading:before,
.loading:after {
  position: absolute;
  width: 20px;
  height: 20px;
  content: "";
  animation: jumping 0.5s infinite alternate;
  background: rgba(0, 0, 0, 0);
}

.loading:before {
  left: 0;
}

.loading:after {
  right: 0;
  animation-delay: 0.15s;
}

@keyframes jumping {
  0% {
    transform: scale(1) translateY(0px) rotateX(0deg);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }

  100% {
    transform: scale(1.2) translateY(-25px) rotateX(45deg);
    background: #00bd63;
    box-shadow: 0 25px 40px #000;
  }
}
</style>