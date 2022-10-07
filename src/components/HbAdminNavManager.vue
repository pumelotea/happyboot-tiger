<script setup>
import {NButton, NIcon, NSwitch, useThemeVars, NEmpty, useMessage} from 'naive-ui'
import framework from "@/global/framework";
import HbAdminScaleCard from "@/components/HbAdminScaleCard";
import {CloseSharp,AlbumsOutline} from '@vicons/ionicons5'
import {removeComponentCache} from "@/global/router";
import {useRouter} from "vue-router";

const navList = framework.getNavList()
const currentMenuRoute = framework.getCurrentMenuRoute()
const router = useRouter()
const emit = defineEmits(['close','scroll'])

function handleClose() {
  emit('close')
}

const props = defineProps({
  open: {
    type    : Boolean,
    required: false,
    default : false
  }
})

const vars = useThemeVars()
const message = useMessage()
function refreshPage(e,evt){
  evt.stopPropagation()
  removeComponentCache(e.pageId)
  const pageId = currentMenuRoute.value?.pageId
  if (pageId === e.pageId){
    setTimeout(() => {
      framework.clickNavItem(e.pageId, (a, needNavs) => {
        if (needNavs.length > 0) {
          router.push(needNavs[0].to)
          emit('scroll',e.pageId)
        }
      })
    }, 300)
  }
  message.info("页面刷新完成")
}

function removePage(e,evt){
  evt.stopPropagation()
  framework.closeNav('self', e.pageId, (removedNavs, needNavs) => {
    removeComponentCache(e.pageId)
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
    }
    if (navList.value.length === 0) {
      router.push('/')
    }
  })
}

function openPage(e){
  framework.clickNavItem(e.pageId, (a, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
      emit('scroll',e.pageId)
    }
  })
  emit('close')
}

</script>

<template>
  <transition
      enter-active-class="hb-admin-nav-manager-in"
      leave-active-class="hb-admin-nav-manager-out"
  >
    <div class="hb-admin-nav-manager" v-if="open">
      <div class="hb-admin-nav--mgt-title">页面管理器</div>
      <div class="hb-admin-nav--mgt-close">
        <n-button
            strong
            secondary
            circle
            @click="handleClose"
        >
          <template #icon>
            <n-icon :component="CloseSharp"/>
          </template>
        </n-button>
      </div>
      <hb-admin-scale-card :width="1920" :height="1080">
        <div
            v-if="!currentMenuRoute"
            class="empty-route-body"
        >
          <n-empty
              size="huge"
              description="还没打开页面呐 ~"
          >
            <template #icon>
              <n-icon :component="AlbumsOutline" />
            </template>
          </n-empty>
        </div>
        <div v-else class="page-list">
          <div class="page-item" v-for="e in navList" @click="openPage(e)">
            <div class="nav-title">{{e.title}}</div>
            <div class="nav-icon">
              <n-icon :size="100">
                <i :class="e.menuItem.icon"></i>
              </n-icon>
            </div>
            <div class="nav-cache">
              <n-switch size="large" :round="false" :value="e.menuItem.isKeepalive">
                <template #checked>
                  已开启缓存
                </template>
                <template #unchecked>
                  未开启缓存
                </template>
              </n-switch>
            </div>
            <div class="nav-action">
              <n-button type="info" ghost @click.stop="evt=>{refreshPage(e,evt)}">
                刷新页面
              </n-button>
            </div>
            <div class="nav-link">
              {{e.menuItem.routerPath}}
            </div>
            <div class="nav-poster">
              <img class="poster-image" :src="`/images/page-poster/${e.menuItem.poster}`">
            </div>
            <n-button
                type="error"
                class="nav-close"
                strong
                circle
                size="small"
                @click.stop="evt=>{removePage(e,evt)}"
            >
              <template #icon>
                <n-icon :component="CloseSharp"/>
              </template>
            </n-button>
            <div class="nav-current" v-if="currentMenuRoute?.pageId === e.pageId"></div>
          </div>
        </div>
      </hb-admin-scale-card>
    </div>
  </transition>
</template>

<style scoped>
.hb-admin-nav-manager {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  z-index: 99999;
  backdrop-filter: blur(20px);
  width: 100%;
  height: 100%;
  padding: 5%;
  box-sizing: border-box;
  background: v-bind(vars.baseColor);
}

.hb-admin-nav--mgt-title {
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: 20px;
  opacity: 0.8;
}

.hb-admin-nav--mgt-close {
  position: absolute;
  right: 20px;
  top: 20px;
  opacity: 0.8;
}

.page-list {
  display: grid;
  grid-gap: 50px;
  grid-template-columns: repeat(5, 1fr);
  overflow: auto;
  height: 100%;
  padding: 50px;
  box-sizing: border-box;
  box-shadow: inset 0 0 20px 5px #00000008;
  border-radius: 10px;
}

.page-list::-webkit-scrollbar {
  display: none;
}

.page-item {
  border-radius: 10px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  height: 450px;
  position: relative;
  background: v-bind(vars.cardColor);
  transition: all 0.2s;
}

.page-item:hover{
  transform: scale(1.01);
}

.page-item:active{
  transform: scale(1.02);
}

.hb-admin-nav-manager-in {
  animation: page-in 0.5s ease-in-out;
}

.hb-admin-nav-manager-out {
  animation: page-out 0.5s ease-in-out;
}

@keyframes page-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes page-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.nav-title{
  font-size: 20px;
  padding: 5px 10px;
}

.nav-icon{
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 0.1;
}

.nav-cache{
  padding: 10px;
}

.nav-link{
  padding: 10px;
  position: absolute;
  bottom: 10px;
  opacity: 0.6;
}

.nav-poster{
  margin-top: 50px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 200px;
}

.poster-image{
  width: 100%;
  border: 1px solid rgba(187, 182, 182, 0.4);
  border-radius: 5px;
}

.nav-close{
  position: absolute;
  top: 0;
  right: 0;
  transform: translate3d(50%,-50%,0);
}

.nav-action{
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

.nav-current{
  height: 8px;
  position: absolute;
  bottom: 10px;
  z-index: 1;
  width: 50%;
  left: 50%;
  transform: translate3d(-50%,0,0);
  background: v-bind(vars.primaryColor);
  border-radius: 10px;
}

.empty-route-body {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  box-shadow: inset 0 0 20px 5px #00000008;
  border-radius: 10px;
}

</style>