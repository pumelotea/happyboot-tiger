<script setup>
import { NIcon, NButton, NEmpty, NTag, NDropdown, NTooltip, useThemeVars } from 'naive-ui'
import {
  ArrowBack,
  ArrowForward,
  EllipsisVertical,
  ArrowBackSharp,
  ArrowForwardSharp,
  CloseSharp,
  CloseCircleSharp,
  CubeOutline,
  RefreshSharp,
  AppsSharp
} from '@vicons/ionicons5'
import framework from '@/global/framework'
import { h, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { removeComponentCache } from '@/global/router'
import Sortable from 'sortablejs'
import HbAdminNavManager from '@/components/HbAdminNavManager'
import { arrayMoveImmutable } from 'array-move'

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
  case 'refreshCurrent': {
    const pageId = currentRouteMenu.value?.pageId
    if (pageId) {
      removeComponentCache(pageId)
      setTimeout(() => {
        onNavClick(pageId)
      }, 100)
    }
    break
  }
  case 'refreshAll': {
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
  clickoutside()
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

const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)

function handleContextMenu (e) {
  e.preventDefault()
  nextTick().then(() => {
    showDropdownRef.value = true
    xRef.value = e.clientX
    yRef.value = e.clientY
  })
}

function clickoutside () {
  showDropdownRef.value = false
}

function initSortable () {
  Sortable.create(navDom.value, {
    animation  : 150,
    ghostClass : 'drop-background',
    dragClass  : 'drop-background',
    chosenClass: 'drop-background',
    onEnd ({ oldIndex, newIndex }) {
      if (oldIndex === newIndex) {
        return
      }
      navList.value = arrayMoveImmutable(navList.value, oldIndex, newIndex)
    }
  })
}

watch(navDom, () => {
  initSortable()
})

const showPageManager = ref(false)

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
        style="pointer-events: none"
        description="从左侧菜单打开页面"
      />
      <n-tag
        v-for="e in navList"
        :id="e.pageId"
        :key="e.pageId"
        closable
        :type="e.pageId === currentRouteMenu.pageId?'primary':''"
        class="nav-tag"
        @close="()=>{onNavClose(e)}"
        @click="(event)=>{onNavClick(e.pageId,event)}"
        @contextmenu="handleContextMenu"
      >
        {{ e.title }}
        <template #avatar>
          <n-tooltip
            v-if="e.menuItem.isKeepalive"
            placement="bottom"
            trigger="hover"
          >
            <template #trigger>
              <div class="nav-cached-tag" />
            </template>
            <span>
              「{{ e.menuItem.name }}」已开启页面缓存
            </span>
          </n-tooltip>
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
      <n-button
        text
        @click="showPageManager = true"
      >
        <template #icon>
          <n-icon :component="AppsSharp" />
        </template>
      </n-button>
      <n-dropdown
        trigger="manual"
        :x="xRef"
        :y="yRef"
        :show="showDropdownRef"
        :options="options"
        @clickoutside="clickoutside"
        @select="onDropdownSelect"
      >
        <n-button text>
          <template #icon>
            <n-icon :component="EllipsisVertical" />
          </template>
        </n-button>
      </n-dropdown>

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
    <hb-admin-nav-manager
      :open="showPageManager"
      @scroll="scroll"
      @close="showPageManager = false"
    />
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
  width: 120px;
}

.nav-cached-tag {
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
  padding: 10px 5px;
  box-sizing: border-box;
}

.inline-box::-webkit-scrollbar {
  display: none;
}

.n-tag + .n-tag {
  margin-left: 5px;
}

.nav-tag {
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

.nav-tag:hover {
}

.nav-item-icon {
  display: flex;
  align-items: center;
  padding-left: 5px;
}
</style>
<style>
.drop-background {
  background-color: v-bind(vars.primaryColor);
  color: white;
}
</style>
