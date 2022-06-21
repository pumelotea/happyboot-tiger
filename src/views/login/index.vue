<script setup>
import {
  NCard, NSpace, NInput, NForm, NFormItem,
  NLayout, NButton, NIcon, useMessage
} from 'naive-ui'
import {
  LockOpenOutline, Person,LogoGithub,LogoWechat,LogoApple,QrCodeOutline
} from "@vicons/ionicons5"
import {useRouter} from "vue-router";
import security from "../../global/security";
import {reactive, ref} from "vue";

const router = useRouter()
const message = useMessage()

const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRef = ref(null)

function login(e) {
  e.preventDefault()
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      security.signIn(loginForm.password,{
        refreshToken:'jwt refresh', // 写入刷新token
        refreshTokenExpiredAt: new Date().getTime() + 3600*24*7, // 刷新token过期时间
        username: loginForm.username,
        nickname:'千阳',
        avatar:'https://oss.injs.jsxww.cn/net-disk-smh/09505891f7a34e82b64a5922ecf5a7e0.gif?x-oss-process=image/resize,w_100/quality,q_95',
      })
      router.push('/')
    } else {
      console.log(errors);
      errors.forEach(e=>{
        message.error(e[0].message)
      })
    }
  })

}

const rules = {
  username: [
    {
      required: true,
      message: "请输入用户"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码"
    }
  ]
}

const qrCodeLogin = ref(false)

function toggleUseQrCode(){
  qrCodeLogin.value = !qrCodeLogin.value
}

const loadedVideoBg = ref(false)

function onVideoBgLoad(){
  console.log('load video bg success')
  loadedVideoBg.value = true
}

function onVideoBgError(){
  console.log('load video bg failed')
}


</script>
<template>
  <div>
    <img class="image-bg" v-if="!loadedVideoBg" src="/src/assets/bg-2.png"/>
    <video @loadeddata="onVideoBgLoad" @error="onVideoBgError" class="bg-video" loop  muted autoplay src="/9c67d262-f53e-4358-9f99-beef9538e579.mp4"></video>
    <n-layout class="hb-admin-login" content-style="width:100%;opacity:0.8;">
      <n-space vertical justify="center" align="center" style="height: 100%;width: 100%;">
        <n-card hoverable class="hb-card animate__animated animate__fadeIn animate__slow" content-style="height: 180px">
          <n-space justify="center" style="margin-bottom: 20px;">
            <img class="hb-logo" src="/src/assets/logo.png"/>
          </n-space>
          <n-space justify="center" v-if="qrCodeLogin" class="hb-form animate__animated animate__fadeIn">
            <img class="qr-code" src="/src/assets/qr-demo.png">
          </n-space>
          <n-form v-else class="hb-form animate__animated animate__fadeIn" ref="loginFormRef" :model="loginForm" :rules="rules">
            <n-form-item label="账号" path="username">
              <n-input size="large" v-model:value="loginForm.username">
                <template #prefix>
                  <n-icon :component="Person"/>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item label="密码" path="password">
              <n-input type="password" size="large" v-model:value="loginForm.password">
                <template #prefix>
                  <n-icon :component="LockOpenOutline"/>
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <template #action>
            <div class="qr-login-button">
              <n-button text @click="toggleUseQrCode">
                <n-icon :size="30" :component="QrCodeOutline"></n-icon>
              </n-button>
            </div>
            <n-space justify="center" align="center" style="margin-bottom: 20px;">
              <n-button text><n-icon :size="30" :component="LogoGithub"></n-icon></n-button>
              <n-button text><n-icon :size="30" :component="LogoWechat"></n-icon></n-button>
              <n-button text><n-icon :size="30" :component="LogoApple"></n-icon></n-button>
            </n-space>
            <n-button size="large" type="success" block @click="login">
              登录
            </n-button>
            <n-space justify="center" style="margin-top: 30px">
              <n-button type="info" tag="a" text @click="()=>{router.push('/recover')}">忘记密码？</n-button>
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
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.image-bg{
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
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

.qr-login-button{
  position: absolute;
  top: 10px;
  right: 10px;
}

.qr-code{
  width: 180px;
  height: 180px;
}

.bg-video{
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}
</style>
