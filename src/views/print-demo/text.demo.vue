<hb-demo>打印文本</hb-demo>
<script setup>
import {NButton, NSpace} from 'naive-ui'
import HbAdminPrint from "@/components/HbAdminPrint"
import {ref} from "vue"

const printTextInstance = ref(null)

function printText() {
  printTextInstance.value.print()
}
</script>
<template>
  <div>
    <hb-admin-print ref="printTextInstance" class="demo-text">
      <p style="margin-bottom: 10mm;text-indent: 30px">
        据此前多方爆料，不出意外的话苹果将继续在今年9月举行秋季新品发布会，届时全新的iPhone
        14系列将正式与大家见面。作为全球最受瞩目的移动设备，该机早早便受到了外界的广泛关注，尤其外观方面的升级更是大家关注的焦点。现在有最新消息，随着该机的渲染图频频曝光，近日关于该机的新配色也有不少爆料传出。继此前的紫色版本后，现在有最新消息，近日有海外爆料达人进一步晒出了该机另一款新配色的渲染图。
      </p>

      <p style="margin-bottom: 10mm;text-indent: 30px">
        据海外爆料达人最新晒出的渲染图显示，与此前曝光的消息基本一致，全新的iPhone 14
        Pro系列此次可能还将新增一款古铜色配色。从渲染图来看，该配色相较于此前的土豪金配色颜色更深一些，第一眼看上去有一种印度风的感觉。值得注意的是，除了古铜色配色外，iPhone 14和iPhone 14
        Max还将提供黑色、白色、蓝色、红色和紫色，而iPhone 14 Pro和iPhone 14 Pro Max则提供石墨色、银色和紫色。
      </p>

      <p style="margin-bottom: 10mm;text-indent: 30px">
        其他方面，根据此前曝光的消息，全新的iPhone 14系列可能依然会延续iPhone
        13的设计，继续采用直角边框方案。其中两个Pro版为此次重点升级的对象，正面有望首次采用“感叹号”打孔屏，有望搭载120Hz高刷屏以及6GB内存，支持新一代的LTPO技术。而iPhone 14和iPhone
        14 MAX则依旧为刘海屏。除此之外，新机必然还将在性能、影像等方面进行全方位升级，不过仅有Pro版才会使用A16，标准版的iPhone 14依然将使用A15芯片。同时iPhone 14
        Pro的主摄将有望升级到4800万像素，据称是为了8K视频铺垫。
      </p>

      <p style="margin-bottom: 10px;text-indent: 30px">
        据悉，全新的iPhone 14系列最早可能会在8月初开始量产备货，其中iPhone 14和iPhone 14 Pro将率先开始生产，并且售价将进行上调，其中iPhone
        14基础款售价或为799美元，iPhone 14 Max售价899美元，而iPhone 14 Pro和Pro Max售价预计分别为1099美元和1199美元。更多详细信息，我们拭目以待。
      </p>
    </hb-admin-print>
  </div>
  <n-space justify="flex-end" style="margin-top: 10px">
    <n-button type="info" @click="printText">打印文字</n-button>
  </n-space>
</template>
<style scoped>
.demo-text {
  width: 210mm;
  padding: 10px;
}
</style>
