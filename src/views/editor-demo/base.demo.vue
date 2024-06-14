<hb-demo>编辑器现在已经抽离为独立项目</hb-demo>
<script setup>
import { NInput, NCard } from 'naive-ui'
import '@codecoderun/vivid/dist/style.css'
import { ref } from 'vue'
import {isDark} from "@/global/config";
import { VividEditor } from "@codecoderun/vivid";
import {
  BoldExt,
  BlockQuoteExt,
  CodeExt,
  BulletListExt,
  ColorExt,
  CharacterCountExt,
  CodeBlockExt,
  DocumentExt,
  DropcursorExt,
  GapcursorExt,
  HardBreakExt,
  HeadingExt,
  HighlightExt,
  HistoryExt,
  LinkExt,
  MathExt,
  ImageExt,
  ItalicExt,
  IndentExt,
  HorizontalRuleExt,
  ListItemExt,
  OrderedListExt,
  ParagraphExt,
  PlaceholderExt,
  StrikeExt,
  SubscriptExt,
  SuperscriptExt,
  TableExt,
  TextExt,
  TaskListExt,
  VideoExt,
  UnderlineExt,
  TextAlignExt,
  TextStyleExt,
  DividerExt,
  FormatClearExt,
  FullscreenExt,
  UndoExt,
  RedoExt,
  AiExt,
  FocusExt,
  LineHeightExt,
  HocuspocusExt,
  ImageBubbleMenu,
  VideoBubbleMenu,
  MathBubbleMenu,
  TableBubbleMenu,
  TrailingNodeExt,
  DragHandle,
  SlashCommand,
  SectionExt,
  CopyPasteExt,
  UploadManagerExt,
  OutlineExt
} from "@codecoderun/vivid";

const vars = useThemeVars();
function handleUpload(file, per) {

  let n = 0;
  return new Promise((resolve) => {
    const t = setInterval(() => {
      n+=20;
      per(n);
      if (n === 100) {
        const url = URL.createObjectURL(file);
        clearInterval(t);
        resolve(url);
      }
    }, 1000);
  });
}

const content = ref('<h1>⌨️富文本编辑器<span style="color: rgb(247, 6, 126)">🥳🥳🥳</span></h1><blockquote><p><span style="color: rgb(118, 130, 164)"><em>基于无头编辑器 tiptap2.0开发，</em></span></p><p><span style="color: rgb(247, 6, 126)"><strong><em>tiptap大法好！！！</em></strong></span></p></blockquote><h2>特性预览列表</h2><ul><li><p>粗体</p></li><li><p>斜体</p></li><li><p>下划线</p></li><li><p>删除线</p></li><li><p>高亮</p></li><li><p>字体颜色</p></li><li><p>文字对齐方式</p><ul><li><p>左对齐</p></li><li><p>右对齐</p></li><li><p>居中</p></li><li><p>两端对齐</p></li></ul></li><li><p>上角标</p></li><li><p>下角标</p></li><li><p>标题1~6</p></li><li><p>无序列表</p></li><li><p>有序列表</p></li><li><p>任务列表</p></li><li><p>引用块</p></li><li><p>分隔线</p></li><li><p>超链接</p></li><li><p>图片插入、编辑、浮动</p></li><li><p>视频插入、编辑、浮动</p></li><li><p>数学公式插入、编辑</p></li><li><p>代码块插入、高亮</p></li><li><p>表格插入、编辑</p></li><li><p>全屏切换</p></li><li><p>气泡菜单</p></li><li><p>适配夜间模式</p></li><li><p>tab快捷键缩进</p></li><li><p><span style="color: rgb(255, 66, 53)">类似135编辑器内容块复制粘贴插入</span></p></li><li><p><span style="color: rgb(255, 66, 53)">行高调节</span></p></li><li><p><span style="color: rgb(255, 66, 53)">文档大纲</span></p></li><li><p><span style="color: rgb(255, 66, 53)">行级Context菜单</span></p></li><li><p><span style="color: rgb(255, 66, 53)">SlashCommand</span></p></li><li><p><span style="color: rgb(255, 66, 53)">图片上传组件，支持复制粘贴上传插入图片</span></p></li></ul><h2>特性演示</h2><h3>文字样式</h3><p><span style="color: rgb(51, 51, 51)"><strong>床前明月光，疑是地上霜。举头望明月，低头思故乡。</strong></span></p><p><span style="color: rgb(51, 51, 51)"><em>床前明月光，疑是地上霜。举头望明月，低头思故乡。</em></span></p><p><span style="color: rgb(51, 51, 51)"><u>床前明月光，疑是地上霜。举头望明月，低头思故乡。</u></span></p><p><span style="color: rgb(51, 51, 51)"><s>床前明月光，疑是地上霜。举头望明月，低头思故乡。</s></span></p><p><span style="color: rgb(51, 51, 51)"><mark data-color="none" style="background-color: none">床前明月光，疑是地上霜。举头望明月，低头思故乡。</mark></span></p><p><span style="color: rgb(247, 6, 126)">床前明月光，疑是地上霜。举头望明月，低头思故乡。</span></p><p></p><h3>文字对齐方式</h3><p>床前明月光，</p><p style="text-align: center">疑是地上霜。</p><p style="text-align: right">举头望明月，</p><p style="text-align: justify">低头思故乡。</p><h3>图片</h3><p><img src="https://raw.githubusercontent.com/pumelotea/happyboot-tiger/master/assets/light.png" keepratio="true" width="400" height="300" data-display="inline"> <img src="https://raw.githubusercontent.com/pumelotea/happyboot-tiger/d78c4e4e19ed886a55a577ceb64d5bba83b170cc/assets/dark.png" keepratio="true" width="400" height="300" data-display="inline"></p><h3>视频</h3><p><video src="https://media.w3.org/2010/05/sintel/trailer.mp4" keepratio="true" controls="false" loop="false" muted="false" width="546" height="325" data-display="inline"></video></p><h3>无序列表</h3><ul><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ul><h3>有序列表</h3><ol><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ol><h3>任务列表</h3><ul><li><p>床前明月光，</p></li><li><p>疑是地上霜。</p></li><li><p>举头望明月，</p></li><li><p>低头思故乡。</p></li></ul><h3>超链接</h3><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://happykit.org">我是一个超链接跳到哪好呢？？？</a></p><h3>数学公式</h3><p><span tex="\\displaystyle \\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n' +
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
  '}</code></pre><h3>表格</h3><ul><li><p>支持文字的特性</p></li><li><p>支持单元格合并</p></li><li><p>支持插入图片</p></li><li><p>支持插入视频</p></li><li><p>支持插入数学公式</p></li><li><p>支持插入超链接</p></li><li><p>支持插入代码块</p></li><li><p>支持插入列表</p></li></ul><table style="minWidth: 299px"><colgroup><col style="width: 224px"><col><col><col></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="224"><p>姓名</p></th><th colspan="1" rowspan="1"><p>年龄</p></th><th colspan="1" rowspan="1"><p>身高</p></th><th colspan="1" rowspan="1"><p>体重</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="224" style="background-color: null"><p>小米</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>10</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>150</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>40</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="224" style="background-color: null"><p>小张</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>12</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>160</p></td><td colspan="1" rowspan="1" style="background-color: null"><p>48</p></td></tr><tr><td colspan="1" rowspan="2" colwidth="224" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr><tr><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr><tr><td colspan="1" rowspan="1" colwidth="224" style="background-color: null"><p></p></td><td colspan="2" rowspan="1" style="background-color: null"><p></p></td><td colspan="1" rowspan="1" style="background-color: null"><p></p></td></tr></tbody></table><h3>角标</h3><p>我是文字<sup>哈哈哈哈哈</sup></p><p>我是文字<sub>哈哈哈哈哈</sub></p><p></p><h3>AI助手支持</h3><p>详细见文档</p><h3>多人协同支持</h3><p>详细见文档</p><p></p>')
</script>
<template>
  <div style="height: 500px;margin-bottom: 10px">
    <vivid-editor
      v-model="content"
      :dark="isDark"
    >
      <drag-handle></drag-handle>
      <slash-command></slash-command>

      <template #menu>
        <div class="menu-bar">
          <document-ext />
          <paragraph-ext />
          <hard-break-ext />
          <indent-ext />
          <history-ext />
          <dropcursor-ext />
          <gapcursor-ext />
          <text-ext />
          <placeholder-ext />
          <character-count-ext />
          <text-style-ext />
          <focus-ext />
          <trailing-node-ext />
          <section-ext />
          <copy-paste-ext />
          <upload-manager-ext :handleUpload="handleUpload"/>

          <undo-ext />
          <redo-ext />
          <format-clear-ext />
          <divider-ext />
          <bold-ext />
          <italic-ext />
          <strike-ext />
          <underline-ext />
          <color-ext />
          <highlight-ext />
          <divider-ext />
          <heading-ext />
          <divider-ext />
          <text-align-ext />
          <line-height-ext />
          <divider-ext />
          <subscript-ext />
          <superscript-ext />
          <divider-ext />
          <image-ext :handleUpload="handleUpload" />
          <video-ext :handleUpload="handleUpload" />
          <link-ext />
          <divider-ext />
          <table-ext />
          <math-ext />
          <code-ext />
          <code-block-ext />
          <block-quote-ext />
          <horizontal-rule-ext />
          <bullet-list-ext />
          <list-item-ext />
          <ordered-list-ext />
          <task-list-ext />
          <divider-ext />
          <outline-ext/>
          <fullscreen-ext />
        </div>
      </template>
      <template v-slot:bubble-menu="{nodeType}">
        <div class="bubble-menu-bar">
          <template v-if="nodeType === 'text'">
            <bold-ext />
            <italic-ext />
            <strike-ext />
            <underline-ext />
            <divider-ext />
            <color-ext />
            <highlight-ext />
            <link-ext />
            <divider-ext />
            <text-align-ext />
          </template>
          <template v-if="nodeType === 'image'">
            <image-bubble-menu />
          </template>
          <template v-if="nodeType === 'video'">
            <video-bubble-menu />
          </template>
          <template v-if="nodeType === 'math'">
            <math-bubble-menu />
          </template>
          <template v-if="nodeType === 'table'">
            <table-bubble-menu />
          </template>
        </div>
      </template>
    </vivid-editor>
  </div>
  <n-card title="输出HTML">
    <n-input
      v-model:value="content"
      type="textarea"
      rows="15"
    />
  </n-card>
</template>
<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 5px 5px;
  gap: 2px;
  background-color: v-bind(vars.baseColor);
  box-sizing: border-box;
  border-bottom: 1px solid;
  border-color: v-bind(vars.borderColor);
}

.bubble-menu-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 4px 5px;
  background: v-bind(vars.popoverColor);
  border-radius: 3px;
  box-shadow: v-bind(vars.boxShadow2);
}
</style>
