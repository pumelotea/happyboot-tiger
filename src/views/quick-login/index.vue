<script setup>
import {
  NCard, NSpace, NAvatar,
  NLayout, NButton, useMessage
} from 'naive-ui'

import {useRouter} from "vue-router";
import security from "@/global/security";

const router = useRouter()
const message = useMessage()


function login() {
  const refreshTokenExpiredAt = security.user.value?.refreshTokenExpiredAt
  if (!refreshTokenExpiredAt){
    router.push('/login')
    return
  }

  const refreshToken = security.user.value?.refreshToken
  if (refreshTokenExpiredAt < new Date().getTime()){
    router.push('/login')
    return
  }

  //向服务器获取新的token
  security.refreshToken('new token - ' +  new Date().getTime())
  router.push('/')
}


</script>
<template>
  <div>
    <n-layout class="hb-admin-login" content-style="width:100%;backdrop-filter: blur(5px);opacity:0.8;">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%;">
        <n-card hoverable class="hb-card animate__animated animate__fadeIn animate__slow">
          <n-space justify="center" style="margin-bottom: 20px;">
            <img class="hb-logo" src="/src/assets/logo.png"/>
          </n-space>
          <n-space class="hb-form" align="center" justify="center">
            <n-card embedded>
              <div class="quick-login-user">
                <n-avatar round :size="60" :src="security.user.value?.avatar"></n-avatar>
                <span class="nickname">{{security.user.value?.nickname}}</span>
              </div>
            </n-card>
          </n-space>
          <template #action>
            <n-button size="large" type="success" block @click="login">
              快速登录
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              <n-button type="info" tag="a" text @click="()=>{router.push('/login')}">不是我的账号</n-button>
            </n-space>
            <n-space justify="center">
              尚未用有账户?
              <n-button type="info" tag="a" text @click="()=>{router.push('/signup')}">注册</n-button>
            </n-space>
          </template>
        </n-card>
      </n-space>
    </n-layout>
  </div>
</template>


<style scoped>
.hb-admin-login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("/src/assets/bg.png");
  background-size: 100% 100%;
}

.hb-card {
  box-shadow: var(--n-box-shadow);
}

.hb-form {
  width: 340px;
}

.hb-logo {
  width: 100px;
  height: 100px;
}

.quick-login-user{
  display: flex;
  align-items: center;
}

.nickname{
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
