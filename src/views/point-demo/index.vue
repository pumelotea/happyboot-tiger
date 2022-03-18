<script setup>
import {NLayout,NLayoutContent,NAlert,NCode,NButton,NSpace,NCard} from 'naive-ui';
import HbAdminPageLayout from "../../components/HbAdminPageLayout.vue";
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

const data = `{
  name: '权限点',
  path: '/point',
  view: '/point-demo/index.vue',
  isRouter: true,
  isKeepalive: false,
  icon:'ri-command-line',
  type: 'menu',
  children: [
    {
      name: '新增',
      permissionKey: 'add',
      path: '',
      view: '',
      isRouter: false,
      isKeepalive: false,
      type: 'point',
      children: []
    },
    {
      name: '编辑弹出框取消',
      permissionKey: 'cancel',
      path: '',
      view: '',
      isRouter: false,
      isKeepalive: false,
      type: 'point',
      children: []
    }
  ]
}`

const htmlCode = `
<n-button type="info" v-point="'add'">被控制的按钮</n-button>
<n-button type="warning" v-point="'cancel'">未被控制的按钮</n-button>
<n-button type="warning" v-point="'no-key'">控制点未被对应的按钮</n-button>`

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>权限点的演示</h2>
          <n-space align="center">
            <n-button type="info" v-point="'add'">被控制的按钮</n-button>
            <n-button type="warning" v-point="'cancel'">未被控制的按钮</n-button>
            <div>
              <div class="no-key-btn">控制点未被对应的按钮</div>
              <n-button type="warning" v-point="'no-key'">这里的按钮被隐藏了</n-button>
            </div>
          </n-space>
          <n-alert type="info">
            Vue模板中使用`v-point`，路由节点中的`permissionKey`属性和指令中配置的值相同，则显示，否则不显示<br/>如以下代码
          </n-alert>
          <n-card>
            <n-code :code="htmlCode" language="xml" :hljs="hljs"></n-code>
          </n-card>
          <n-alert type="info">
            权限点配置在路由节点的子节点中，<br/>如以下代码
          </n-alert>
         <n-card>
           <n-code :code="data" language="JavaScript" :hljs="hljs"></n-code>
         </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
.no-key-btn{

}
</style>
