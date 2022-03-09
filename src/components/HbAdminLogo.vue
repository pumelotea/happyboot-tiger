<script setup>
import {
  NLayout,
  NLayoutHeader,
  NGradientText
} from "naive-ui"

import {isMenuCollapsed} from "../global/config";


</script>

<template>
  <n-layout>
    <n-layout-header class="hb-admin-logo-com" bordered>
      <div class="logo-box">
        <img
            class="logo-image"
            src="/src/assets/logo.png"
        />
        <div class="logo-text" v-if="!isMenuCollapsed">
          <n-gradient-text type="success">
            HappyBoot Tiger
          </n-gradient-text>
        </div>
      </div>
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
