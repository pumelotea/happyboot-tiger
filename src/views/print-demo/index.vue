<script setup>
import {NLayout, NLayoutContent, NAlert, NButton, NSpace, NCard} from 'naive-ui';
import HbAdminPageLayout from "@/components/HbAdminPageLayout.vue"
import HbAdminPrint from "@/components/HbAdminPrint";
import {ref} from "vue";

const printTextInstance = ref(null)
const printTableInstance = ref(null)
const printPicInstance = ref(null)

function printText() {
  printTextInstance.value.print()
}

function printTable() {
  printTableInstance.value.print()
}

function printPic() {
  printPicInstance.value.print()
}

</script>
<template>
  <hb-admin-page-layout>
    <n-layout style="padding:20px">
      <n-layout-content>
        <n-space vertical>
          <h2>打印组件</h2>
          <n-alert type="info">
            包裹需要打印的内容即可，然后调用暴露的print方法；一定要设定打印内容的宽度，比如A4纸张的宽度为210mm
          </n-alert>
          <n-card title="打印文本块">
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
            <template #footer>
              <n-space justify="flex-end">
                <n-button type="info" @click="printText">打印文字</n-button>
              </n-space>
            </template>
          </n-card>
          <n-card title="打印表格">
            <hb-admin-print ref="printTableInstance">
              <table class="reference">
                <tbody>
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr class="alt">
                  <td>Berglunds snabbköp</td>
                  <td>Christina Berglund</td>
                  <td>Sweden</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
                <tr class="alt">
                  <td>Ernst Handel</td>
                  <td>Roland Mendel</td>
                  <td>Austria</td>
                </tr>
                <tr>
                  <td>Island Trading</td>
                  <td>Helen Bennett</td>
                  <td>UK</td>
                </tr>
                <tr class="alt">
                  <td>Königlich Essen</td>
                  <td>Philip Cramer</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Laughing Bacchus Winecellars</td>
                  <td>Yoshi Tannamuri</td>
                  <td>Canada</td>
                </tr>
                <tr class="alt">
                  <td>Magazzini Alimentari Riuniti</td>
                  <td>Giovanni Rovelli</td>
                  <td>Italy</td>
                </tr>
                <tr>
                  <td>North/South</td>
                  <td>Simon Crowther</td>
                  <td>UK</td>
                </tr>
                <tr class="alt">
                  <td>Paris spécialités</td>
                  <td>Marie Bertrand</td>
                  <td>France</td>
                </tr>
                <tr>
                  <td>The Big Cheese</td>
                  <td>Liz Nixon</td>
                  <td>USA</td>
                </tr>
                <tr class="alt">
                  <td>Vaffeljernet</td>
                  <td>Palle Ibsen</td>
                  <td>Denmark</td>
                </tr>
                </tbody>
              </table>
            </hb-admin-print>
            <template #footer>
              <n-space justify="flex-end">
                <n-button type="info" @click="printTable">打印表格</n-button>
              </n-space>
            </template>
          </n-card>
          <n-card title="打印图片">
            <hb-admin-print ref="printPicInstance">
              <n-space vertical justify="center">
                <img width="500" src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg">
                <img width="500" src="https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg">
                <img width="500" src="https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg">
              </n-space>
            </hb-admin-print>
            <template #footer>
              <n-space justify="flex-end">
                <n-button type="info" @click="printPic">打印图片</n-button>
              </n-space>
            </template>
          </n-card>
        </n-space>
      </n-layout-content>
    </n-layout>

  </hb-admin-page-layout>
</template>

<style scoped>
.image {
  width: 100px;
}

table.reference, table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 4px;
  margin-top: 4px;
}

table.reference td {
  line-height: 2em;
  min-width: 24px;
  border: 1px solid rgb(212 212 212);
  padding: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  vertical-align: top;
}

table.reference th {
  line-height: 2em;
  min-width: 24px;
  border: 1px solid rgb(212 212 212);
  padding: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  vertical-align: top;
}

.demo-text{
  width: 210mm;
  padding: 10px;
}
</style>
