<script setup>
import HbAdminDevTool from '@/components/dev/HbAdminDevTool.vue'
import { useMessage, useThemeVars,useNotification,NButton ,NModal,NCard,NTimeline,NTimelineItem,NTag} from 'naive-ui'
import HbAdminLoading from '@/components/HbAdminLoading.vue'
import 'github-markdown-css'
import {isDark} from "./global/config";
window.$message = useMessage()
const vars = useThemeVars()

// 生产环境可以删除以下JS代码
import moment from 'moment'
import MarkdownIt from 'markdown-it'
import {onMounted, h, ref, computed, watch, nextTick} from "vue"
import API from '@/global/api'
const notification = useNotification()
const showModal = ref(false)
const versions = ref([])
const md = new MarkdownIt()
onMounted(()=>{
  API.getVersion().then(res=>{
    res.json().then(data=>{
      notification.info({
        title: `最新版本 - ${data.name}`,
        meta: ()=>h(NButton,{size:'small',secondary:true,type:'info',onClick:()=>{showModal.value = true}},{default:()=>'查看更新内容'}),
        duration: 30000,
        keepAliveOnHover:true
      })
    })
  })

  API.getVersions().then(res=>{
    res.json().then(data=>{
      versions.value = data
    })
  })
})

function themeVars () {
  if (isDark.value) {
    return {
      textColor: '#c9d1d9',
      accentColor: '#58a6ff'
    }
  } else {
    return {
      textColor: '#24292f',
      accentColor: '#0969da'
    }
  }
}

function changeTheme() {
  if (showModal.value) {
    nextTick(() => {
      const versionDom = document.getElementById('versions-body')
      versionDom.style.color = themeVars().textColor
      const aDoms = versionDom.querySelectorAll('a')
      aDoms.forEach(e => {
        e.style.color = themeVars().accentColor
      })
    })
  }
}

watch(showModal, () => {
  changeTheme()
})

watch(isDark, () => {
  changeTheme()
})

function dateFormat(date){
  return moment(date).startOf('month').format("YYYY-MM-DD")
}

</script>
<template>
  <router-view />
  <!--
    生产环境下这个dev-tool可以注释掉
  -->
  <hb-admin-dev-tool />
  <hb-admin-loading />
  <!--
    用于放置一些需要全局fixed的弹出组件，并且让组件支持适配主题。
    注意：如果直接放到document.body下那么会脱离naive-ui的config-provider,就无法使用它提供的主题适配变量了。
  -->
  <div id="pop-body" />
  <!--  生产环境下可以删除以下代码 -->
  <n-modal v-model:show="showModal">
    <n-card
        style="width: 800px"
        title="版本记录"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
    >
      <n-timeline>
        <n-timeline-item
            v-for="(e,index) in versions"
            :type="index===0?'success':'info'"
            :time="dateFormat(e.published_at)"
        >
          <template #header>
            <div style="margin-top: -5px">
              <n-tag v-if="index===0" type="success">{{e.name}}</n-tag>
              <n-tag v-else type="info">{{e.name}}</n-tag>
            </div>
          </template>
          <div id="versions-body" class="markdown-body" style="background-color: transparent" v-html="md.render(e.body)"></div>
        </n-timeline-item>
      </n-timeline>
    </n-card>
  </n-modal>
</template>

<style>
::-webkit-scrollbar {
  width: v-bind(vars.scrollbarWidth);
  height: v-bind(vars.scrollbarHeight);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: v-bind(vars.scrollbarBorderRadius);
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: v-bind(vars.scrollbarBorderRadius);
  background-color: v-bind(vars.scrollbarColor);
}

::-webkit-scrollbar-thumb:hover {
  background-color: v-bind(vars.scrollbarColorHover);
}
</style>
