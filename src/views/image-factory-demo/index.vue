<script setup>
import { NLayout, NLayoutContent, NAlert, NSpace, NCard, NCollapse, NCollapseItem } from 'naive-ui'
import HbAdminPageLayout from '@/components/HbAdminPageLayout.vue'
import HbAdminCode from '@/components/HbAdminCode.vue'
import DemoCropper from './cropper.demo.vue'
import DemoWatermark from './watermark.demo.vue'
const code1 = '1.首先引入 \nimport { watermark } from \'@/utils/imageFactory\' \n2.然后调用 \n/**\n' +
    ' * 图片添加水印\n' +
    ' *  callback  //回调方法，返回base64的图片【{success: true, data: "base64数据"}】\n' +
    ' *  image: Video()  //底图对象\n' +
    ' *  sign: Video()  //水印对象\n' +
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
    ' * image: Video()  //底图对象\n' +
    ' * left: Number  //裁剪左侧距离\n' +
    ' * right: Number  //裁剪右侧距离\n' +
    ' * top: Number  //裁剪顶部距离\n' +
    ' * bottom: Number  //裁剪底部距离\n' +
    ' * width: Number  //底图宽度\n' +
    ' * height: Number  //底图高度\n' +
    ' * */\n' +
    'cropper(callback, image, left, right, top, bottom, width, height)'

const code3 = '1.首先引入 \nimport { resize } from \'@/utils/imageFactory\' \n2.然后调用 \n' +
    '/**\n' +
    ' * 调整图片尺寸\n' +
    ' * callback  //回调方法，返回base64的图片\n' +
    ' * image: Video()  //底图对象\n' +
    ' * width: Number  //调整的宽度\n' +
    ' * height: Number  //调整的高度\n' +
    ' * */\n' +
    'resize(callback, image, width, height)'

const code4 = '1.首先引入 \nimport { quality } from \'@/utils/imageFactory\' \n2.然后调用 \n' +
    '/**\n' +
    ' * 调整图片质量\n' +
    ' * callback  //回调方法，返回base64的图片\n' +
    ' * image: Video()  //底图对象\n' +
    ' * quality: Number  //图片质量 0 - 1\n' +
    ' * */\n' +
    'quality(callback, image, quality)'
</script>

<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>图片工厂</h2>
          <n-alert type="info">
            图片工厂是一个类库，可以上传或者传入一个图片地址进行对图片的一些二次加工处理。例如：添加图片水印、图片裁剪、调整图片尺寸、设置图片质量等。
          </n-alert>
          <n-card>
            <n-collapse>
              <n-collapse-item title="水印添加">
                <hb-admin-code :code="code1" />
              </n-collapse-item>
            </n-collapse>
          </n-card>
          <n-card>
            <n-collapse>
              <n-collapse-item title="图片裁剪">
                <hb-admin-code :code="code2" />
              </n-collapse-item>
            </n-collapse>
          </n-card>
          <n-card>
            <n-collapse>
              <n-collapse-item title="调整图片尺寸">
                <hb-admin-code :code="code3" />
              </n-collapse-item>
            </n-collapse>
          </n-card>
          <n-card>
            <n-collapse>
              <n-collapse-item title="调整图片质量">
                <hb-admin-code :code="code4" />
              </n-collapse-item>
            </n-collapse>
          </n-card>
          <demo-cropper />
          <demo-watermark />
        </n-space>
      </n-layout-content>
    </n-layout>
  </hb-admin-page-layout>
</template>

<style scoped>
</style>
