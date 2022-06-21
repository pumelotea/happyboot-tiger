<script setup>
import {NAvatar,NLayout,NLayoutHeader,NIcon,NButton,NBadge,NSpace} from "naive-ui";
import {
  EarthOutline
} from "@vicons/ionicons5"
import {isMenuCollapsed} from "@/global/config";

import security from "../global/security";
import {computed, ref} from "vue";

const enterActiveClass = computed(()=>{
  return !isMenuCollapsed.value ? 'animate__animated animate__slideInRight animate__faster' : 'animate__animated animate__slideInLeft animate__faster'
})

</script>

<template>
  <n-layout>
    <n-layout-header  style="border-top: solid 1px var(--n-border-color)">
      <transition
          :enter-active-class="enterActiveClass"
          leave-from-class="leave"
      >
        <div class="hb-admin-user-card-com" v-if="isMenuCollapsed">
          <n-avatar size="large" round :src="security.user.value?.avatar"/>
        </div>
        <div class="hb-admin-user-card-com" v-else>
          <n-avatar size="large" round :src="security.user.value?.avatar"/>
          <span class="nickname ">{{security.user.value?.nickname}}</span>
          <span style="flex: 1;"></span>
          <n-space align="center" justify="end">
            <n-badge type="success" :value="20" processing ></n-badge>
            <n-button round text style="align-items: center;display: flex">
              <n-icon size="24" :component="EarthOutline"></n-icon>
            </n-button>
          </n-space>
        </div>
      </transition>
    </n-layout-header>
  </n-layout>
</template>

<style scoped>
.hb-admin-user-card-com {
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
}

.nickname{
  font-weight: bold;
  margin-left: 10px;
  color: var(--n-text-color);
  transition: color .3s var(--n-bezier);
}

.leave{
  opacity: 0;
  position: absolute;
}
</style>
