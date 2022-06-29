<script setup>
import {NLayout,NLayoutContent,NAlert,NButton,NSpace,NCard,NModal, NTimeline, NTimelineItem,NIcon,useMessage, NCode, NCollapse, NCollapseItem} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminImageFactory from "@/components/HbAdminImageFactory/index.vue"
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)
const code1 = '1.首先引入 \nimport { watermark } from \'@/utils/imageFactory\' \n2.然后调用 \n/**\n' +
    ' * 图片添加水印\n' +
    ' *  callback  //回调方法，返回base64的图片【{success: true, data: "base64数据"}】\n' +
    ' *  image: Image()  //底图对象\n' +
    ' *  sign: Image()  //水印对象\n' +
    ' *  left: Number  //水印左侧位置\n' +
    ' *  top: Number  //水印顶部位置\n' +
    ' *  imageWidth: Number  //底图宽度\n' +
    ' *  imageHeight: Number  //底图高度\n' +
    ' *  signWidth: Number  //水印宽度\n' +
    ' *  signHeight: Number  //水印高度\n' +
    ' * */\n' +
    'watermark(callback, image, sign, left, top, imageWidth, imageHeight, signWidth, signHeight)'

const code2 = '1.首先引入 \nimport { cropper } from \'@/utils/imageFactory\' \n2.然后调用 \n' +
    '/**\n' +
    ' * 图片裁剪\n' +
    ' * callback  //回调方法，返回base64的图片\n' +
    ' * image: Image()  //底图对象\n' +
    ' * left: Number  //裁剪左侧距离\n' +
    ' * right: Number  //裁剪右侧距离\n' +
    ' * top: Number  //裁剪顶部距离\n' +
    ' * bottom: Number  //裁剪底部距离\n' +
    ' * width: Number  //底图宽度\n' +
    ' * height: Number  //底图高度\n' +
    ' * */\n' +
    'cropper(callback, image, left, right, top, bottom, width, height)'
</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片工厂组件</h2>
          <n-alert type="info">
            此组件可以上传或者传入一个图片地址进行对图片的一些二次加工处理。例如：调整图片大小、设置图片质量、添加图片水印等。
          </n-alert>
          <n-card>
            <hb-admin-image-factory type="watermark" />
          </n-card>
          <n-card>
            <n-collapse>
              <n-collapse-item title="水印添加 - 使用说明">
                <n-code :code="code1" language="javascript" :hljs="hljs"></n-code>
              </n-collapse-item>
            </n-collapse>
          </n-card>
          <n-card>
            <hb-admin-image-factory type="cropper" />
          </n-card>
          <n-card>
            <n-collapse>
              <n-collapse-item title="图片裁剪 - 使用说明">
                <n-code :code="code2" language="javascript" :hljs="hljs"></n-code>
              </n-collapse-item>
            </n-collapse>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
</style>
