<hb-demo>预览版</hb-demo>
<script setup>
import { NInput, NCard } from 'naive-ui'
import HbAdminTipTap from '@/components/tiptap/HbAdminTipTap'
import { ref } from 'vue'
const content = ref('<h1>⌨️富文本编辑器<span style="color: rgb(247, 6, 126)">🥳🥳🥳</span></h1><blockquote><p><em><span style="color: rgb(118, 130, 164)">基于无头编辑器 tiptap2.0开发，</span></em></p><p><strong><em><span style="color: rgb(247, 6, 126)">tiptap大法好！！！</span></em></strong></p></blockquote><h2>特性预览列表</h2><ul><li><p>粗体</p></li><li><p>斜体</p></li><li><p>下划线</p></li><li><p>删除线</p></li><li><p>高亮</p></li><li><p>字体颜色</p></li><li><p>文字对齐方式</p><ul><li><p>左对齐</p></li><li><p>右对齐</p></li><li><p>居中</p></li><li><p>两端对齐</p></li></ul></li><li><p>上角标</p></li><li><p>下角标</p></li><li><p>标题1~6</p></li><li><p>无序列表</p></li><li><p>有序列表</p></li><li><p>任务列表</p></li><li><p>引用块</p></li><li><p>分隔线</p></li><li><p>超链接</p></li><li><p>图片插入、编辑</p></li><li><p>视频插入、编辑</p></li><li><p>数学公式插入、编辑</p></li><li><p>代码块插入、高亮</p></li><li><p>表格插入、编辑</p></li><li><p>全屏切换</p></li><li><p>气泡菜单</p></li><li><p>适配夜间模式</p></li></ul><h2>特性演示</h2><h3>文字样式</h3><p><strong><span style="color: rgb(51, 51, 51)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></strong></p><p><em><span style="color: rgb(51, 51, 51)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></em></p><p><u><span style="color: rgb(51, 51, 51)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></u></p><p><s><span style="color: rgb(51, 51, 51)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></s></p><p><mark><span style="color: rgb(51, 51, 51)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></mark></p><p><span style="color: rgb(247, 6, 126)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></p><p></p><h3>文字对齐方式</h3><p>床前明月光，</p><p style="text-align: center">疑是地上霜。</p><p style="text-align: right">举头望明月，</p><p style="text-align: justify">低头思故乡。</p><h3>图片</h3><p><img src="https://raw.githubusercontent.com/pumelotea/happyboot-tiger/master/assets/light.png" width="400" height="300"> <img src="https://raw.githubusercontent.com/pumelotea/happyboot-tiger/d78c4e4e19ed886a55a577ceb64d5bba83b170cc/assets/dark.png" width="400" height="300"></p><h3>视频</h3><p><video src="https://media.w3.org/2010/05/sintel/trailer.mp4" width="546" height="325"></video></p><h3>无序列表</h3><ul><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ul><h3>有序列表</h3><ol><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ol><h3>任务列表</h3><ul><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ul><h3>超链接</h3><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://happykit.org">我是一个超链接跳到哪好呢？？？</a></p><h3>数学公式</h3><p><span tex="\\displaystyle \\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n' +
    '\n' +
    '"></span></p><h3>分隔线</h3><hr><h3>代码块</h3><pre><code class="language-javascript">function refresh () {\n' +
    '  height = refRoll1.value.clientHeight\n' +
    '  shadowHeight = refRoll2.value.clientHeight\n' +
    '  if (shadowHeight !== height) {\n' +
    '    refRoll2.value.innerHTML = refRoll1.value.innerHTML\n' +
    '  }\n' +
    '  if (top &lt; 0) {\n' +
    '    if (Math.abs(top) &gt;= height) {\n' +
    '      const tmp = refRoll1.value\n' +
    '      refRoll1.value = refRoll2.value\n' +
    '      refRoll2.value = tmp\n' +
    '      top = 0\n' +
    '    }\n' +
    '    refRoll1.value.style.transform = translate3d(0,${top}px,0)\n' +
    '    refRoll2.value.style.transform = translate3d(0,${height + top}px,0)\n' +
    '  } else {\n' +
    '    if (Math.abs(top) &gt;= height) {\n' +
    '      const tmp = refRoll1.value\n' +
    '      refRoll1.value = refRoll2.value\n' +
    '      refRoll2.value = tmp\n' +
    '      top = -height\n' +
    '    }\n' +
    '    refRoll1.value.style.transform = translate3d(0,${top}px,0)\n' +
    '    refRoll2.value.style.transform = translate3d(0,${top - height}px,0)\n' +
    '  }\n' +
    '}</code></pre><h3>表格</h3><ul><li><p>支持文字的特性</p></li><li><p>支持单元格合并</p></li><li><p>支持插入图片</p></li><li><p>支持插入视频</p></li><li><p>支持插入数学公式</p></li><li><p>支持插入超链接</p></li><li><p>支持插入代码块</p></li><li><p>支持插入列表</p></li></ul><table><tbody><tr><th colspan="1" rowspan="1"><p>姓名</p></th><th colspan="1" rowspan="1"><p>年龄</p></th><th colspan="1" rowspan="1"><p>身高</p></th><th colspan="1" rowspan="1"><p>体重</p></th></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p>小米</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>10</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>150</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>40</p></td></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p>小张</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>12</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>160</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>48</p></td></tr><tr><td colspan="1" rowspan="2" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="2" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr></tbody></table><h3>角标</h3><p>我是文字<sup>哈哈哈哈哈</sup></p><p>我是文字<sub>哈哈哈哈哈</sub></p><p></p><h2>现有问题</h2><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>tab缩进段落</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>视频空间z-index的问题</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>代码高亮模块lowlight替换了highlight的解析器，导致其他调用了highlight的模块出错</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>超链接不支持二次修改，需要重新删除再加超链接</p></div></li></ul><p></p>')
</script>
<template>
  <div style="height: 500px;margin-bottom: 10px">
    <hb-admin-tip-tap
      v-model="content"
      to="pop-body"
    />
  </div>
  <n-card title="输出HTML">
    <n-input
      v-model:value="content"
      type="textarea"
      rows="15"
    />
  </n-card>
</template>
