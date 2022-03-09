<script setup>
import {NIcon, NButton, NAvatar, NTag, NDropdown, NLayout} from "naive-ui"
import {
  ArrowBack,
  ArrowForward,
  EllipsisVertical,
  ArrowBackSharp,
  ArrowForwardSharp,
  CloseSharp,
  CloseCircleSharp
} from "@vicons/ionicons5"
import framework from '.././global/framework'
import {h, nextTick, ref, watch} from "vue";
import {useRouter} from "vue-router";

const navList = framework.getNavList()
const currentRouteMenu = framework.getCurrentMenuRoute()
const router = useRouter()


const renderIcon = (icon, color) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon, {color})
    });
  };
};

const options = [
  {
    label: "关闭左侧",
    key: "left",
    icon: renderIcon(ArrowBackSharp)
  },
  {
    label: "关闭右侧",
    key: "right",
    icon: renderIcon(ArrowForwardSharp)
  },
  {
    label: "关闭其他",
    key: "other",
    icon: renderIcon(CloseSharp)
  },
  {
    label: "关闭全部",
    key: "all",
    icon: renderIcon(CloseCircleSharp, '#C03F53')
  }
]

function onDropdownSelect(key) {
  framework.closeNav(key, currentRouteMenu.value?.pageId, (removedNavs, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
    }
    if (navList.value.length === 0) {
      router.push('/')
    }
  })
}

function onNavClose(e) {
  framework.closeNav('self', e.pageId, (removedNavs, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
    }
    if (navList.value.length === 0) {
      router.push('/')
    }
  })
}

function onNavClick(pageId,event) {
  framework.clickNavItem(pageId, (a, needNavs) => {
    if (needNavs.length > 0) {
      router.push(needNavs[0].to)
      scroll(pageId)
    }
  })
}


function scroll(pageId){
  const scrollLeft = navDom.value.scrollLeft
  const target = document.getElementById(pageId)
  if (!target){
    return
  }

  const rightOffset = target.offsetLeft + target.clientWidth - scrollLeft - navDom.value.clientWidth
  const leftOffset = target.offsetLeft - scrollLeft
  // console.log(rightOffset,leftOffset)
  if (rightOffset > 0){
    navDom.value.scrollTo({
      top: 0,
      left: scrollLeft+rightOffset + 100,
      behavior: 'smooth'
    })
  }else if (leftOffset < 0){
    navDom.value.scrollTo({
      top: 0,
      left: scrollLeft+leftOffset - 100,
      behavior: 'smooth'
    })
  }
}


const navDom = ref(null)


function scrollHorizontal(direction){
  const left = navDom.value.scrollLeft
  if (direction === 'left'){
    navDom.value.scrollTo({
      top: 0,
      left: left - 200,
      behavior: 'smooth'
    })
  }

  if (direction === 'right'){
    navDom.value.scrollTo({
      top: 0,
      left: left + 200,
      behavior: 'smooth'
    })
  }
}

watch(currentRouteMenu,value=>{
  nextTick(()=>{
    scroll(value.pageId)
  })
})




</script>

<template>
  <div class="hb-admin-nav-com">
    <n-button strong secondary circle
              @click="scrollHorizontal('left')"
    >
      <template #icon>
        <n-icon :component="ArrowBack"></n-icon>
      </template>
    </n-button>
    <div class="inline-box" ref="navDom">
      <n-tag closable
             round
             v-for="e in navList" @close="()=>{onNavClose(e)}"
             :type="e.pageId === currentRouteMenu.pageId?'success':''"
             @click="(event)=>{onNavClick(e.pageId,event)}"
             :id="e.pageId"
      >
        {{ e.title }}
        <template #avatar>
          <n-avatar
              src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
          />
        </template>
      </n-tag>
    </div>

    <div class="nav-action-box">
      <n-button strong secondary circle
                @click="scrollHorizontal('right')"
      >
        <template #icon>
          <n-icon :component="ArrowForward"></n-icon>
        </template>
      </n-button>

      <n-dropdown
          :options="options"
          @select="onDropdownSelect"
      >
        <n-button text>
          <template #icon>
            <n-icon :component="EllipsisVertical"></n-icon>
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

.inline-box {
  display: inline-flex;
  flex: 1;
  overflow: auto;
  position: relative;
  margin: 0 10px;
}

.inline-box::-webkit-scrollbar {
  display: none;
}


.n-tag + .n-tag {
  margin-left: 5px;
}

</style>
