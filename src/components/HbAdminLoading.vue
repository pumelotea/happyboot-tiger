<script setup>
import {useThemeVars, NGradientText} from 'naive-ui'
import HbAdminCopyright from "@/components/HbAdminCopyright";
import framework from "@/global/framework";
import {needRouterLoading} from "@/global/router/config";

const menuTree = framework.getMenuTree()
const vars = useThemeVars()

</script>
<template>
  <div class="hb-admin-loading-mask"></div>
  <transition leave-active-class="animate__animated animate__bounceOut">
    <div class="hb-admin-loading-com" v-if="needRouterLoading">
      <div>
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
        <div class="hb-admin-logo animate__animated animate__fadeInUpBig animate__faster">
          <img
              class="logo-image"
              src="/src/assets/logo.png"
          >
          <div class="logo-text">
            <n-gradient-text type="success" size="36">
              HappyBoot Tiger
            </n-gradient-text>
          </div>
        </div>
      </div>
      <div class="hb-admin-copyright-box">
        <hb-admin-copyright/>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.hb-admin-loading-com {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind(vars.bodyColor);
}

.hb-admin-loading-mask{
  background-color: v-bind(vars.bodyColor);
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.hb-admin-logo {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 40px;
}

.logo-text {
  margin-left: 10px;
}

.hb-admin-copyright-box {
  position: fixed;
  bottom: 20px;
}

.sk-cube-grid {
  width: 50px;
  height: 50px;
  margin: 30px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2px;
}

.sk-cube-grid .sk-cube {
  width: 100%;
  height: 100%;
  background-color: v-bind(vars.primaryColor);
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  border-radius: 10%;
  box-sizing: border-box;
}

.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  background-color: #E15140;
}

.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  background-color: #D73D64;
}

.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
  background-color: #9036AA;
}

.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  background-color: #6040B0;
}

.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  background-color: #4253AF;
}

.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  background-color: #4696EC;
}

.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  background-color: #48A8ED;
}

.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
  background-color: #52BAD1;
}

.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
  background-color: #419488;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%, 70%, 100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
