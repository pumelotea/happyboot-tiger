<script setup>
import QRCode from 'qrcode'
import { watch, ref, onMounted } from 'vue'
const props = defineProps({
  text: {
    required: true,
    type    : String,
    default : () => {
      return ''
    }
  },
  options: {
    required: false,
    type    : Object,
    default : () => {
      return {
        errorCorrectionLevel: 'M',
        margin              : 1,
        quality             : 1,
        width               : 360,
        color               : {
          dark : '#8DD268FF',
          light: '#FFFFFFFF'
        },
        type: 'image/png',

        // 自定义参数
        logoSize      : 80,
        logoBorderSize: 2,
        logoUrl       : '/src/assets/logo.png',
        logoBgColor   : '#FFFFFFFF',

        bottomText            : 'HappyBoot Tiger',
        bottomFontSize        : 30,
        bottomTextColor       : '#8DD268FF',
        bottomTextTopMargin   : 10,
        bottomTextBottomMargin: 10
      }
    }
  }
})

const qrcodeData = ref('')
async function createQrCode (text, cfg, success) {
  const config = JSON.parse(JSON.stringify(cfg))
  config.width = config.width * window.devicePixelRatio
  const rawBase64 = await QRCode.toDataURL(text, config)

  const rawQrCode = new Image()
  rawQrCode.onload = beautify
  rawQrCode.src = rawBase64

  function beautify () {
    const canvasWidth = config.width
    const canvasHeight = canvasWidth + config.bottomFontSize + config.bottomTextTopMargin
    const borderSize = config.margin
    const canvas = document.createElement('canvas')
    if (!canvas.getContext) return
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = config.color.light
    // 绘制背景
    ctx.fillRect(
      0, 0, canvasWidth, canvasHeight
    )

    // 填充二维码
    const qrcodeSize = canvasWidth - borderSize * 2
    ctx.drawImage(
      rawQrCode,
      borderSize,
      borderSize,
      qrcodeSize,
      qrcodeSize
    )

    // 绘制文本
    ctx.fillStyle = config.bottomTextColor // 调色(纯黑)
    ctx.font = config.bottomFontSize + 'px Arial' // 文本大小, 字体
    ctx.textAlign = 'center'
    ctx.fillText(
      config.bottomText,
      canvasWidth / 2,
      qrcodeSize + config.bottomFontSize + config.bottomTextTopMargin - config.bottomTextBottomMargin,
      qrcodeSize
    )

    // 绘制logo圆形底图
    const logoCenterX = borderSize + qrcodeSize / 2
    const logoCenterY = logoCenterX
    ctx.arc(
      logoCenterX,
      logoCenterY,
      config.logoSize / 2 + config.logoBorderSize,
      0,
      Math.PI * 2,
      false
    )
    ctx.fillStyle = config.logoBgColor
    ctx.fill() // 填充背景

    const logoX = (qrcodeSize - config.logoSize) / 2 + borderSize
    const logoY = logoX
    const logo = new Image()
    logo.setAttribute('crossOrigin', 'anonymous') // logo跨域许可
    logo.onload = () => {
      ctx.beginPath()
      ctx.arc(
        logoCenterX,
        logoCenterY,
        config.logoSize / 2,
        0,
        Math.PI * 2,
        false
      )
      ctx.fill()
      ctx.clip() // 裁剪logo成圆形
      ctx.drawImage(
        logo, logoX, logoY, config.logoSize, config.logoSize
      ) // 填充logo

      // 生成最后的图像
      success(canvas.toDataURL(config.type))
    }
    logo.src = config.logoUrl // 设置logo源地址
  }
}

watch(props.options, () => {
  createQrCode(props.text, props.options, data => {
    qrcodeData.value = data
  })
})

watch(() => props.text, () => {
  createQrCode(props.text, props.options, data => {
    qrcodeData.value = data
  })
})

onMounted(() => {
  createQrCode(props.text, props.options, data => {
    qrcodeData.value = data
  })
})

</script>
<template>
  <div class="hb-admin-qrcode-com">
    <img
      style="zoom:0.5"
      :src="qrcodeData"
    >
  </div>
</template>
<style scoped>
.hb-admin-qrcode-com{

}
</style>
