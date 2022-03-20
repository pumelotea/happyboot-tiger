<script setup>
import {NCard, NSpace, NButton, NTag, NCode, NTable, useMessage,NAlert} from "naive-ui";
import framework from "../../global/framework";
import security from "../../global/security";
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import {onMounted, ref, watch} from "vue";

hljs.registerLanguage('javascript', javascript)
const clientId = ref(framework.getTracker().clientId)
const message = useMessage()

function consoleMenu() {
  console.log(framework.getMenuTree())
  message.info('请打开控制台查看菜单数据结构')
}

const navList = framework.getNavList()

function consoleNav() {
  console.log(navList)
  message.info('请打开控制台查看导航数据结构')
}

const token = ref(security.getToken())

const user = ref(JSON.stringify(security.getUser().value, null, 2))

const cacheTitleList = ref([])

function getNavTitleCache() {
  cacheTitleList.value = []
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); //获取本地存储的Key
    if (key.indexOf('HAPPYKIT_STORAGE/NAV_TITLE') > -1) {
      const title = localStorage.getItem(key)
      const pageId = key.replace('HAPPYKIT_STORAGE/NAV_TITLE/', '')
      let isExist = false
      navList.value.forEach(e => {
        if (e.pageId === pageId) {
          isExist = true
        }
      })
      cacheTitleList.value.push({
        title,
        isExist,
        pageId,
      })
    }
  }
}

const showPanel = ref(false)

function handleClose() {
  showPanel.value = false
}

function handleOpen() {
  showPanel.value = true
}

function cleanCache() {
  let keys = []
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i); //获取本地存储的Key
    if (key.indexOf('HAPPYKIT_STORAGE/NAV_TITLE') > -1) {
      keys.push(key)
    }
  }
  keys.forEach(k => localStorage.removeItem(k))
  getNavTitleCache()
  message.info('清空标题缓存完成')
}

function refreshList() {
  getNavTitleCache()
  message.info('重新获取标题缓存列表完成')
}

const current = framework.getCurrentMenuRoute()

watch(current, () => {
  getNavTitleCache()
})

function refresh(){
  clientId.value = framework.getTracker().clientId
  token.value = security.getToken()
  user.value = JSON.stringify(security.getUser().value, null, 2)
  getNavTitleCache()
}

onMounted(refresh)

watch(showPanel,()=>{
  if (showPanel.value){
    refresh()
  }
})

</script>
<template>
  <div class="hb-admin-dev-tool">
    <div style="position: fixed;right: 10px;bottom: 10px;opacity: 0.6">
      <n-button @click="handleOpen" type="info" size="small">DEV TOOL</n-button>
    </div>
    <div class="hb-dev-panel animate__animated animate__slideInUp" v-if="showPanel">
      <n-card closable @close="handleClose" hoverable style="height: 100%" content-style="overflow:auto"
              title="HAPPYBOOT DEV TOOL">
        <n-space vertical>
          <n-button @click="refresh">刷新全部数据</n-button>
          <n-space vertical>
            <n-alert type="info">ClientId</n-alert>
            <n-code :code="clientId" :hljs="hljs"></n-code>
            <n-alert type="info">Token</n-alert>
            <n-code :code="token" :hljs="hljs"></n-code>
            <n-alert type="info">User Data</n-alert>
            <div style="width: 100%;overflow: auto">
              <n-code :code="user" :hljs="hljs" language="JavaScript"></n-code>
            </div>
          </n-space>
          <n-alert type="info">导航标题缓存&菜单</n-alert>
          <n-space align="center">
            <n-button type="info" @click="consoleMenu">输出菜单数据</n-button>
            <n-button type="info" @click="consoleNav">输出导航数据</n-button>
            <n-button type="info" @click="refreshList">重新获取标题缓存列表</n-button>
            <n-button type="warning" @click="cleanCache">清空标题缓存</n-button>
          </n-space>
          <n-table :bordered="false" :single-line="false">
            <thead>
            <tr>
              <th>页面ID</th>
              <th>标题</th>
              <th>游离态</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="e in cacheTitleList">
              <td>{{ e.pageId }}</td>
              <td>{{ e.title }}</td>
              <td>
                <n-tag type="success" v-if="e.isExist">
                  {{ e.isExist ? '否' : '是' }}
                </n-tag>
                <n-tag type="warning" v-else>
                  {{ e.isExist ? '否' : '是' }}
                </n-tag>
              </td>
            </tr>
            </tbody>
          </n-table>
        </n-space>
      </n-card>
    </div>
  </div>
</template>


<style scoped>
.hb-admin-dev-tool {
  z-index: 9999;
}

.hb-dev-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 600px;
  padding: 10px;
  box-sizing: border-box;
}
</style>
