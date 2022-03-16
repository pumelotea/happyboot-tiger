<script setup>
import {theme} from "../../global/config";
import {
  NConfigProvider,
  NCard,NSpace,NInput,NForm,NFormItem, zhCN,
  dateZhCN,NLayout,NButton,NIcon,NAvatar
} from 'naive-ui'
import {
  LockOpenOutline,Person
} from "@vicons/ionicons5"
import {useRouter} from "vue-router";
const router = useRouter()
</script>
<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-layout class="hb-admin-login" content-style="width:100%;backdrop-filter: blur(5px);opacity:0.8;">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%;">
        <n-card hoverable class="hb-card animate__animated animate__fadeIn animate__slow">
          <n-space justify="center" style="margin-bottom: 20px;">
            <img class="hb-logo" src="/src/assets/logo.png"/>
          </n-space>
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
            <n-button size="large" type="success" block @click="()=>{router.push('/')}">
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
  background: url("/src/assets/bg.png");
  background-size: 100% 100%;
}

.hb-card{
  box-shadow: var(--n-box-shadow);
}

.hb-form{
  width: 340px;
}

.hb-logo{
  width: 100px;
  height: 100px;
}
</style>
