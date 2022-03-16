<script setup>
import {theme} from "../../global/config";
import {
  NConfigProvider,
  NCard,NSpace,NInput,NForm,NFormItem, zhCN,
  dateZhCN,NLayout,NButton,NIcon
} from 'naive-ui'
import {
  LockOpenOutline,Person
} from "@vicons/ionicons5"
import {useRouter} from "vue-router";
const router = useRouter()
</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout class="hb-admin-login" content-style="width:100%">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%">
        <n-card title="登录" hoverable class="hb-card">
          <n-form class="hb-form">
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
              登录
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              <n-button type="info" tag="a" text @click="()=>{router.push('/recover')}">忘记密码？</n-button>
            </n-space>
            <n-space justify="center">
              尚未用有账户?<n-button type="info" tag="a" text @click="()=>{router.push('/signup')}">注册</n-button>
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
