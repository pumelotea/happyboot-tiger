<script setup>
import {theme} from "../../global/config";
import {
  NConfigProvider,
  NCard,NSpace,NInput,NForm,NFormItem, zhCN,
  dateZhCN,NLayout,NButton,NIcon
} from 'naive-ui'
import {
  LockOpenOutline,Person,MailOutline
} from "@vicons/ionicons5"
</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout class="hb-admin-login" content-style="width:100%">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%">
        <n-card title="使用邮箱地址注册" hoverable class="hb-card">
          <n-form class="hb-form">
            <n-form-item label="电子邮箱">
              <n-input size="large">
                <template #prefix>
                  <n-icon :component="MailOutline" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="账号">
              <n-input size="large">
                <template #prefix>
                  <n-icon :component="Person" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码">
              <n-input type="password" size="large">
                <template #prefix>
                  <n-icon :component="LockOpenOutline" />
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <template #action>
            <n-button size="large" type="success" block>
              注册
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              注册即表示您同意我们的<n-button type="info" tag="a" text>服务条款与隐私政策</n-button>
            </n-space>
            <n-space justify="center">
              已经拥有账户？?<n-button type="info" tag="a" text>登录</n-button>
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </n-config-provider>
</template>


<style scoped>
.hb-admin-login{
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hb-card{
  box-shadow: var(--n-box-shadow);
}

.hb-form{
  width: 340px;
}
</style>
