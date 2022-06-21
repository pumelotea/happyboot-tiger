<script setup>
import {
  NLayout,
  NLayoutHeader,
  NGradientText
} from "naive-ui"

import {isMenuCollapsed} from "@/global/config";
import {computed} from "vue";
const enterActiveClass = computed(()=>{
  return !isMenuCollapsed.value ? 'animate__animated animate__slideInRight animate__faster' : 'animate__animated animate__slideInLeft animate__faster'
})

</script>

<template>
  <n-layout>
    <n-layout-header class="hb-admin-logo-com" bordered>
      <transition
          :enter-active-class="enterActiveClass"
      >
        <div class="logo-box" v-if="!isMenuCollapsed">
          <img
              class="logo-image"
              src="/src/assets/logo.png"
          />
          <div class="logo-text" >
            <n-gradient-text type="success">
              HappyBoot Tiger
            </n-gradient-text>
          </div>
        </div>
        <div class="logo-box" v-else>
          <img
              class="logo-image"
              src="/src/assets/logo.png"
          />
        </div>
      </transition>
    </n-layout-header>
  </n-layout>
</template>


<style scoped>
.hb-admin-logo-com{
  height: 60px;
}

.logo-box{
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image{
  height: 30px;
}

.logo-text{
  font-size: 20px;
  margin-left: 10px;
}
</style>
