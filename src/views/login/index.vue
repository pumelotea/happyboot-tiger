<script setup>
import {
  NCard, NSpace, NInput, NForm, NFormItem,
  NLayout, NButton, NIcon, useMessage
} from 'naive-ui'
import {
  LockOpenOutline, Person, LogoGithub, LogoWechat, LogoApple, QrCodeOutline, ArrowBackCircle, CheckmarkCircle
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import security from '@/global/security'
import { onMounted, reactive, ref } from 'vue'
import QRCode from 'qrcode'

const router = useRouter()
const message = useMessage()

const loginForm = reactive({
  username: 'admin',
  password: 'admin'
})

const loginFormRef = ref(null)

function login (e) {
  e.preventDefault()
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      security.signIn(loginForm.password, {
        refreshToken         : 'jwt refresh', // 写入刷新token
        refreshTokenExpiredAt: new Date().getTime() + 3600 * 24 * 7, // 刷新token过期时间
        username             : loginForm.username,
        nickname             : '千阳',
        avatar               : 'https://oss.injs.jsxww.cn/net-disk-smh/09505891f7a34e82b64a5922ecf5a7e0.gif?x-oss-process=image/resize,w_100/quality,q_95'
      })
      router.push('/')
    } else {
      console.log(errors)
      errors.forEach(e => {
        message.error(e[0].message)
      })
    }
  })
}

const rules = {
  username: [
    {
      required: true,
      message : '请输入用户'
    }
  ],
  password: [
    {
      required: true,
      message : '请输入密码'
    }
  ]
}

const qrCodeLogin = ref(false)

function toggleUseQrCode () {
  qrCodeLogin.value = !qrCodeLogin.value
  createQrCode()
}

const loadedVideoBg = ref(false)

function onVideoBgLoad () {
  console.log('load video bg success')
  loadedVideoBg.value = true
}

function onVideoBgError () {
  console.log('load video bg failed')
}

const qrcode = ref('')
const isQrcodeScan = ref(true)
async function createQrCode () {
  const generateQR = async text => {
    try {
      qrcode.value = await QRCode.toDataURL(text, {
        width : 360,
        margin: 1,
        color : {
          dark: '#7BB650FF'
        }
      })
    } catch (err) {
      console.error(err)
    }
  }
  await generateQR(new Date().toLocaleTimeString() + '9c67d262-f53e-4358-9f99-beef9538e579')
}

</script>
<template>
  <div>
    <img
      v-if="!loadedVideoBg"
      class="image-bg"
      src="/src/assets/bg.png"
    >
    <!--    <video @loadeddata="onVideoBgLoad" @error="onVideoBgError" class="bg-video" loop muted autoplay-->
    <!--           src="https://raw.githubusercontent.com/pumelotea/happyboot-tiger/aa1ea8ab3f30017ca97fe899d48861af8f5a680a/public/9c67d262-f53e-4358-9f99-beef9538e579.mp4"></video>-->
    <n-layout
      class="hb-admin-login"
      content-style="width:100%;"
    >
      <n-space
        vertical
        justify="center"
        align="center"
        style="height: 100%;width: 100%;"
      >
        <n-card
          hoverable
          class="hb-card animate__animated animate__fadeIn animate__slow"
          content-style="height: 180px"
        >
          <n-space
            justify="center"
            style="margin-bottom: 20px;"
          >
            <img
              class="hb-logo"
              src="/src/assets/logo.png"
            >
          </n-space>
          <n-space
            v-if="qrCodeLogin"
            vertical
            justify="center"
            align="center"
            class="hb-form animate__animated animate__fadeIn"
          >
            <div style="position: relative">
              <img
                class="qr-code"
                :class="{'qr-code-scan':isQrcodeScan}"
                :src="qrcode"
              >
              <div
                v-if="isQrcodeScan"
                class="scan-mark"
              >
                <n-icon
                  size="40"
                  color="rgb(76 175 80)"
                  :component="CheckmarkCircle"
                />
              </div>
            </div>
            <div>请使用App扫码确认登录</div>
          </n-space>
          <n-form
            v-else
            ref="loginFormRef"
            class="hb-form animate__animated animate__fadeIn"
            :model="loginForm"
            :rules="rules"
          >
            <n-form-item
              label="账号"
              path="username"
            >
              <n-input
                v-model:value="loginForm.username"
                size="large"
              >
                <template #prefix>
                  <n-icon :component="Person" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item
              label="密码"
              path="password"
            >
              <n-input
                v-model:value="loginForm.password"
                type="password"
                size="large"
              >
                <template #prefix>
                  <n-icon :component="LockOpenOutline" />
                </template>
              </n-input>
            </n-form-item>
          </n-form>
          <template #action>
            <div class="qr-login-button">
              <n-button
                text
                @click="toggleUseQrCode"
              >
                <n-icon
                  v-if="qrCodeLogin"
                  :size="30"
                  :component="ArrowBackCircle"
                />
                <n-icon
                  v-else
                  :size="30"
                  :component="QrCodeOutline"
                />
              </n-button>
            </div>
            <n-space
              justify="center"
              align="center"
              style="margin-bottom: 20px;"
            >
              <n-button text>
                <n-icon
                  :size="30"
                  :component="LogoGithub"
                />
              </n-button>
              <n-button text>
                <n-icon
                  :size="30"
                  :component="LogoWechat"
                />
              </n-button>
              <n-button text>
                <n-icon
                  :size="30"
                  :component="LogoApple"
                />
              </n-button>
            </n-space>
            <n-button
              v-if="!qrCodeLogin"
              size="large"
              type="success"
              block
              @click="login"
            >
              登录
            </n-button>
            <n-space
              justify="center"
              style="margin-top: 30px"
            >
              <n-button
                type="info"
                tag="a"
                text
                @click="()=>{router.push('/recover')}"
              >
                忘记密码？
              </n-button>
            </n-space>
            <n-space justify="center">
              尚未用有账户?
              <n-button
                type="info"
                tag="a"
                text
                @click="()=>{router.push('/signup')}"
              >
                注册
              </n-button>
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

.image-bg {
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

.qr-login-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.qr-code {
  width: 180px;
  height: 180px;
  border: 2px solid #a0ee68;
  border-radius: 5px;
}

.scan-mark{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%,-50%,0);
}

.qr-code-scan{
  opacity: 0.5;
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}
</style>
