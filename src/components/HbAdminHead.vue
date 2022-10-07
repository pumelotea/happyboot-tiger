<script setup>
import {
  NIcon,
  NBadge,
  NAvatar,
  NSwitch,
  NCarousel,
  NDivider,
  NDropdown,
  NButton,
  useMessage,
  NText,
  NBreadcrumb,
  NBreadcrumbItem,
  NPopover
} from 'naive-ui'
import { Moon, SunnyOutline, Notifications, CubeOutline, LogoGithub,Book,MenuOutline } from '@vicons/ionicons5'
import { h, computed, ref } from 'vue'
import { isDarkTheme, isMenuCollapsed } from '@/global/config'
import framework from '@/global/framework'
import { useRouter } from 'vue-router'
import security from '@/global/security'
import HbAdminMessage from '@/components/HbAdminMessage'
import HbAdminWeather from './HbAdminWeather'
import HbAdminMenu from "@/components/HbAdminMenu";


const router = useRouter()

function renderCustomHeader () {
  return h('div', {
    style: 'display: flex; align-items: center; padding: 8px 12px;'
  }, [
    h(NAvatar, {
      round: true,
      style: 'margin-right: 12px;',
      src  : security.user.value?.avatar
    }),
    h('div', null, [
      h('div', null, [ h(NText, { depth: 2 }, { default: () => security.user.value?.nickname }) ]),
      h('div', { style: 'font-size: 12px;' }, [
        h(NText, { depth: 3 }, { default: () => '毫无疑问，你是办公室里最亮的星' })
      ])
    ])
  ])
}

const message = useMessage()

const options = [
  {
    key   : 'header',
    type  : 'render',
    render: renderCustomHeader
  },
  {
    key : 'header-divider',
    type: 'divider'
  },
  {
    label: '处理群消息 342 条',
    key  : 'stmt1'
  },
  {
    label: '被 @ 58 次',
    key  : 'stmt2'
  },
  {
    label: '加入群 17 个',
    key  : 'stmt3'
  },
  {
    type  : 'render',
    key   : 'bottom',
    render: () => {
      return h(NDivider, { style: 'margin:0' })
    }
  },
  {
    label: '退出登录',
    key  : 'logout'
  }
]

function handleSelect (key) {
  message.info(String(key))
  switch (key) {
  case 'logout':
    security.signOut()
    framework.closeNav('all')
    router.push('/login')
    break
  default:
    console.log('default')
  }
}

const currentMenuRoute = framework.getCurrentMenuRoute()

const breadcrumb = computed(() => {
  return currentMenuRoute.value?.menuItem.breadcrumb
})

function gotoGithub () {
  window.open('https://github.com/pumelotea/happyboot-tiger')
}

function gotoBook() {
  window.open('https://doc.happykit.org/')
}

const info = ref({
  date         : '今日',
  now          : 28,
  height       : 36,
  low          : 22,
  type         : 'sun',
  windDirection: '西南风',
  windPower    : '2级'
})

</script>

<template>
  <div class="hb-admin-head-com">
    <div class="head-left-area head-item-center">
      <n-button
        class="menu-toggle-button"
        text
        @click="isMenuCollapsed = !isMenuCollapsed"
      >
        <n-icon size="20">
          <i
            v-if="isMenuCollapsed"
            class="ri-menu-unfold-line"
          />
          <i
            v-else
            class="ri-menu-fold-line"
          />
        </n-icon>
      </n-button>
      <n-popover trigger="hover" :show-arrow="false" placement="bottom-start">
        <template #trigger>
          <n-button
              strong
              text
              class="menu-pop-button"
          >
            <template #icon>
              <n-icon size="20">
                <i class="ri-menu-5-line"></i>
              </n-icon>
            </template>
          </n-button>
        </template>
        <hb-admin-menu mode="horizontal"/>
      </n-popover>
      <n-breadcrumb>
        <n-breadcrumb-item
          v-for="e in breadcrumb"
          :key="e.menuId"
        >
          <n-icon>
            <i
              v-if="e.icon"
              :class="e.icon"
            />
            <cube-outline v-else />
          </n-icon>
          {{ e.name }}
        </n-breadcrumb-item>
      </n-breadcrumb>
    </div>
    <div class="head-center-area head-item-center">
      <div class="carousel-box">
        <n-carousel show-arrow :show-dots="false">
          <a href="https://tiger.happykit.org/" target="_blank">
            <img
                class="carousel-img"
                src="/images/1.png"
            >
          </a>
          <a href="https://doc.happykit.org/" target="_blank">
            <img
                class="carousel-img"
                src="/images/2.png"
            >
          </a>
        </n-carousel>
      </div>
    </div>
    <div class="head-right-area head-item-center">
      <hb-admin-weather
        is-simple
        :date="info.date"
        :type="info.type"
        :now="info.now"
        :height="info.height"
        :low="info.low"
        :wind-direction="info.windDirection"
        :wind-power="info.windPower"
      />
      <n-switch v-model:value="isDarkTheme">
        <template #checked-icon>
          <n-icon :component="Moon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="SunnyOutline" />
        </template>
      </n-switch>
      <n-divider vertical />
      <n-icon
        size="22"
        color="#CFCFCF"
        :component="LogoGithub"
        @click="gotoGithub"
      />
      <n-divider vertical />
      <n-icon
          size="22"
          color="#CFCFCF"
          :component="Book"
          @click="gotoBook"
      />
      <n-divider vertical />
      <hb-admin-message>
        <div class="head-notify">
          <n-icon
            size="22"
            color="#CFCFCF"
            :component="Notifications"
          />
          <n-badge value="99+" />
        </div>
      </hb-admin-message>
      <n-divider vertical />
      <n-dropdown
        trigger="hover"
        :options="options"
        @select="handleSelect"
      >
        <n-avatar
          round
          bordered
          :src="security.user.value?.avatar"
        />
      </n-dropdown>
    </div>
  </div>
</template>

<style scoped>
.hb-admin-head-com {
  height: 100%;
  display: flex;
}

.head-item-center {
  display: flex;
  align-items: center;
  height: 100%;
}

.head-left-area {
  padding: 0 20px;
}

.menu-toggle-button{
  margin-left: -10px;
  margin-right: 10px;
}

.menu-toggle-button:hover{

}

.menu-pop-button{
  margin-right: 10px;
}

.head-center-area {
  justify-content: right;
  flex: 1;
  align-items: center;
}

.head-right-area {
  padding: 0 20px;
}

.carousel-box {
  width: 300px;
}

.carousel-img {
  width: 100%;
  height: 50px;
  object-fit: cover;
}

.head-notify{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
