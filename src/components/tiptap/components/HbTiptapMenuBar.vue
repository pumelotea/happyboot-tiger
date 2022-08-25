<script setup>
import HbTiptapMenuItem from './HbTiptapMenuItem.vue'
import {NPopover} from 'naive-ui'
import HbTiptapTableCreator from "@/components/tiptap/components/HbTiptapTableCreator";

const props = defineProps({
  editor: {
    type: Object,
    required: true
  }
})

function insertImage() {
  const url = window.prompt('URL')
  if (url) {
    props.editor.chain().focus().setHbImage({src: url}).run()
  }
}

function insertVideo() {
  const url = window.prompt('URL')
  if (url) {
    props.editor.chain().focus().setHbVideo({src: url}).run()
  }
}

function insertTable(r,c) {
  props.editor.chain().focus().insertTable({rows: r, cols: c, withHeaderRow: true}).run()
}

</script>
<template>
  <div class="menu-bar">
    <hb-tiptap-menu-item icon="arrow-go-back-line" title="撤销"
                         :action="() => props.editor.chain().focus().undo().run()"/>
    <hb-tiptap-menu-item icon="arrow-go-forward-line" title="取消撤销"
                         :action="() => props.editor.chain().focus().redo().run()"/>
    <div class="divider"/>
    <hb-tiptap-menu-item icon="paragraph" title="段落"
                         :action="() => props.editor.chain().focus().setParagraph().run()"
                         :is-active="() => props.editor.isActive('paragraph')"
    />
    <hb-tiptap-menu-item icon="format-clear" title="清除样式"
                         :action="() => props.editor.chain().focus().clearNodes().unsetAllMarks().run()"
    />
    <div class="divider"/>
    <hb-tiptap-menu-item icon="bold" title="加粗"
                         :action="() => props.editor.chain().focus().toggleBold().run()"
                         :is-active="() => props.editor.isActive('bold')"

    />
    <hb-tiptap-menu-item icon="italic" title="斜体"
                         :action="() => props.editor.chain().focus().toggleItalic().run()"
                         :is-active="() => props.editor.isActive('italic')"
    />
    <hb-tiptap-menu-item icon="strikethrough" title="文本线"
                         :action="() => props.editor.chain().focus().toggleStrike().run()"
                         :is-active="() => props.editor.isActive('strike')"
    />
    <hb-tiptap-menu-item icon="code-view" title="代码"
                         :action="() => props.editor.chain().focus().toggleCodeBlock().run()"
                         :is-active="() => props.editor.isActive('codeBlock')"
    />
    <hb-tiptap-menu-item icon="mark-pen-line" title="高亮"
                         :action="() => props.editor.chain().focus().toggleHighlight().run()"
                         :is-active="() => props.editor.isActive('highlight')"
    />
    <div class="divider"/>
    <hb-tiptap-menu-item icon="h-1" title="标题1"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 1}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 1})"
    />
    <hb-tiptap-menu-item icon="h-2" title="标题2"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 2}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 2})"
    />
    <hb-tiptap-menu-item icon="h-3" title="标题3"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 3}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 3})"
    />
    <hb-tiptap-menu-item icon="h-4" title="标题4"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 4}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 4})"
    />
    <hb-tiptap-menu-item icon="h-5" title="标题5"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 5}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 5})"
    />
    <hb-tiptap-menu-item icon="h-6" title="标题6"
                         :action="() => props.editor.chain().focus().toggleHeading({level: 6}).run()"
                         :is-active="() => props.editor.isActive('heading', {level: 6})"
    />
    <div class="divider"/>
    <hb-tiptap-menu-item icon="list-unordered" title="无序列表"
                         :action="() => props.editor.chain().focus().toggleBulletList().run()"
                         :is-active="() => props.editor.isActive('bulletList')"
    />
    <hb-tiptap-menu-item icon="list-ordered" title="有序列表"
                         :action="() => props.editor.chain().focus().toggleOrderedList().run()"
                         :is-active="() => props.editor.isActive('orderedList')"
    />
    <hb-tiptap-menu-item icon="double-quotes-l" title="引用"
                         :action="() => props.editor.chain().focus().toggleBlockquote().run()"
                         :is-active="() => props.editor.isActive('blockquote')"
    />
    <hb-tiptap-menu-item icon="separator" title="横线"
                         :action="() => props.editor.chain().focus().setHorizontalRule().run()"
    />
    <div class="divider"/>
    <hb-tiptap-menu-item icon="image-line" title="插入图片"
                         :action="insertImage"
    />
    <hb-tiptap-menu-item icon="video-line" title="插入视频"
                         :action="insertVideo"
    />
    <div class="divider"/>
    <n-popover trigger="hover" placement="bottom">
      <template #trigger>
        <hb-tiptap-menu-item icon="table-2" title="插入表格"/>
      </template>
      <hb-tiptap-table-creator @insert="insertTable"/>
    </n-popover>
    <hb-tiptap-menu-item icon="delete-bin-6-line" title="删除表格"
                         :action="() => props.editor.chain().focus().deleteTable().run()"
    />
    <hb-tiptap-menu-item icon="merge-cells-horizontal" title="合并拆分单元格"
                         :action="() => props.editor.chain().focus().mergeOrSplit().run()"
    />
    <hb-tiptap-menu-item icon="insert-row-top" title="上面添加一行"
                         :action="() => props.editor.chain().focus().addRowBefore().run()"
    />
    <hb-tiptap-menu-item icon="insert-row-bottom" title="下面添加一行"
                         :action="() => props.editor.chain().focus().addRowAfter().run()"
    />
    <hb-tiptap-menu-item icon="delete-row" title="删除行"
                         :action="() => props.editor.chain().focus().deleteRow().run()"
    />
    <hb-tiptap-menu-item icon="insert-column-left" title="左边添加一列"
                         :action="() => props.editor.chain().focus().addColumnBefore().run()"
    />
    <hb-tiptap-menu-item icon="insert-column-right" title="右边添加一列"
                         :action="() => props.editor.chain().focus().addColumnAfter().run()"
    />
    <hb-tiptap-menu-item icon="delete-column" title="删除行"
                         :action="() => props.editor.chain().focus().deleteColumn().run()"
    />
    <hb-tiptap-menu-item icon="sip-line" title="单元格背景色"
                         :action="() => props.editor.chain().focus().toggleHeaderCell().run()"
    />
  </div>
</template>

<style scoped>
.menu-bar {
  display: flex;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  padding: 5px 5px;
}

.divider {
  width: 2px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: .5rem;
  margin-right: .75rem;
}
</style>