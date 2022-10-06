<script setup>
import { NIcon, NButton, NEmpty, NTag, NDropdown, useThemeVars } from 'naive-ui'
import {
  ArrowBack,
  ArrowForward,
  EllipsisVertical,
  ArrowBackSharp,
  ArrowForwardSharp,
  CloseSharp,
  CloseCircleSharp,
  CubeOutline,
  RefreshSharp
} from '@vicons/ionicons5'
import framework from '@/global/framework'
import { h, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { removeComponentCache } from '@/global/router'

const vars = useThemeVars()

const navList = framework.getNavList()
const currentRouteMenu = framework.getCurrentMenuRoute()
const router = useRouter()

const renderIcon = (icon, color) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon, { color })
    })
  }
}

const options = [
  {
    label: '刷新当前',
    key  : 'refreshCurrent',
    icon : renderIcon(RefreshSharp)
  },
  {
    label: '刷新全部',
    key  : 'refreshAll',
    icon : renderIcon(RefreshSharp)
  },
  {
    label: '关闭左侧',
    key  : 'left',
    icon : renderIcon(ArrowBackSharp)
  },
  {
    label: '关闭右侧',
    key  : 'right',
    icon : renderIcon(ArrowForwardSharp)
  },
  {
    label: '关闭其他',
    key  : 'other',
    icon : renderIcon(CloseSharp)
  },
  {
    label: '关闭全部',
    key  : 'all',
    icon : renderIcon(CloseCircleSharp, '#C03F53')
  }
]

function refreshPage (key) {
  switch (key) {
  case 'refreshCurrent':{
    const pageId = currentRouteMenu.value?.pageId
    if (pageId) {
      removeComponentCache(pageId)
      setTimeout(() => {
        onNavClick(pageId)
      }, 100)
    }
    break
  }
  case 'refreshAll':{
    const pageId = currentRouteMenu.value?.pageId
    framework.getNavList().value.forEach(e => {
      removeComponentCache(e.pageId)
    })
    if (pageId) {
      setTimeout(() => {
        onNavClick(pageId)
      }, 100)
    }
    break
  }
  }
}

function onDropdownSelect (key) {
  if (key === 'refreshCurrent' || key === 'refreshAll') {
    refreshPage(key)
    return
  }
  framework.closeNav(key, currentRouteMenu.value?.pageId, (removedNavs, needNavs) => {
    if (removedNavs.length > 0) {
      removedNavs.forEach(e => {
        removeComponentCache(e.pageId)
      })
    }
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
    }
    if (navList.value.length === 0) {
      router.push('/')
    }
  })
}

function onNavClose (e) {
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

function onNavClick (pageId, event) {
  framework.clickNavItem(pageId, (a, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
      scroll(pageId)
    }
  })
}

function scroll (pageId) {
  const scrollLeft = navDom.value.scrollLeft
  const target = document.getElementById(pageId)
  if (!target) {
    return
  }

  const rightOffset = target.offsetLeft + target.clientWidth - scrollLeft - navDom.value.clientWidth
  const leftOffset = target.offsetLeft - scrollLeft
  // console.log(rightOffset,leftOffset)
  if (rightOffset > 0) {
    navDom.value.scrollTo({
      top     : 0,
      left    : scrollLeft + rightOffset + 100,
      behavior: 'smooth'
    })
  } else if (leftOffset < 0) {
    navDom.value.scrollTo({
      top     : 0,
      left    : scrollLeft + leftOffset - 100,
      behavior: 'smooth'
    })
  }
}

const navDom = ref(null)

function scrollHorizontal (direction) {
  const left = navDom.value.scrollLeft
  if (direction === 'left') {
    navDom.value.scrollTo({
      top     : 0,
      left    : left - 200,
      behavior: 'smooth'
    })
  }

  if (direction === 'right') {
    navDom.value.scrollTo({
      top     : 0,
      left    : left + 200,
      behavior: 'smooth'
    })
  }
}

watch(currentRouteMenu, value => {
  nextTick(() => {
    if (value) {
      scroll(value.pageId)
    }
  })
})

</script>

<template>
  <div class="hb-admin-nav-com">
    <n-button
      strong
      secondary
      circle
      @click="scrollHorizontal('left')"
    >
      <template #icon>
        <n-icon :component="ArrowBack" />
      </template>
    </n-button>
    <div
      ref="navDom"
      class="inline-box"
    >
      <n-empty
        v-if="navList.length <= 0"
        :show-icon="false"
        description="从左侧菜单打开页面"
      />
      <n-tag
        v-for="e in navList"
        :id="e.pageId"
        :key="e.pageId"
        closable
        :type="e.pageId === currentRouteMenu.pageId?'success':''"
        class="nav-tag"
        @close="()=>{onNavClose(e)}"
        @click="(event)=>{onNavClick(e.pageId,event)}"
      >
        {{ e.title }}
        <template #avatar>
          <div class="nav-cached-tag" v-if="e.menuItem.isKeepalive"></div>
          <div class="nav-item-icon">
            <i
              v-if="e.menuItem.icon"
              class="n-base-icon"
              :class="e.menuItem.icon"
            />
            <n-icon
              v-else
              :component="CubeOutline"
            />
          </div>
        </template>
      </n-tag>
    </div>

    <div class="nav-action-box">
      <n-button
        strong
        secondary
        circle
        @click="scrollHorizontal('right')"
      >
        <template #icon>
          <n-icon :component="ArrowForward" />
        </template>
      </n-button>

      <n-dropdown
        :options="options"
        @select="onDropdownSelect"
      >
        <n-button text>
          <template #icon>
            <n-icon :component="EllipsisVertical" />
          </template>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped>
.hb-admin-nav-com {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 10px;
}

.nav-action-box {
  display: flex;
  justify-items: center;
  justify-content: space-around;
  width: 80px;
}

.nav-cached-tag{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border-top: 10px solid v-bind(vars.primaryColor);
  border-right: 10px solid transparent;
}

.inline-box {
  flex: 1;
  overflow: auto;
  position: relative;
  margin: 0 10px;
  white-space: nowrap;
  padding:  10px 5px;
  box-sizing: border-box;
}

.inline-box::-webkit-scrollbar {
  display: none;
}

.n-tag + .n-tag {
  margin-left: 5px;
}

.nav-tag{
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.nav-tag:hover{
}

.nav-item-icon{
  display: flex;
  align-items: center;
  padding-left: 5px;
}
</style>
