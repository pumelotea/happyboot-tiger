<template>
  <div class="menu-bar">
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="`divider${index}`"/>
      <menu-item v-else :key="index" v-bind="item"/>
    </template>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import {reactive} from "vue";

export default {
  components: {
    MenuItem
  },

  props: {
    editor: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const items = reactive([
      {
        icon: 'arrow-go-back-line',
        title: '撤销',
        action: () => props.editor.chain().focus().undo().run()
      },
      {
        icon: 'arrow-go-forward-line',
        title: '取消撤销',
        action: () => props.editor.chain().focus().redo().run()
      },
      {
        type: 'divider'
      },
      {
        icon: 'bold',
        title: '加粗',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold')
      },
      {
        icon: 'italic',
        title: '斜体',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic')
      },
      {
        icon: 'strikethrough',
        title: '文本线',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike')
      },
      {
        icon: 'code-view',
        title: '代码',
        action: () => props.editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => props.editor.isActive('codeBlock')
      },
      {
        icon: 'mark-pen-line',
        title: '高亮',
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive('highlight')
      },
      {
        type: 'divider'
      },
      {
        icon: 'h-1',
        title: '标题1',
        action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 1 })
      },
      {
        icon: 'h-2',
        title: '标题2',
        action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 2 })
      },
      {
        icon: 'h-3',
        title: '标题3',
        action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 3 })
      },
      {
        icon: 'h-4',
        title: '标题4',
        action: () => props.editor.chain().focus().toggleHeading({ level: 4 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 4 })
      },
      {
        icon: 'h-5',
        title: '标题5',
        action: () => props.editor.chain().focus().toggleHeading({ level: 5 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 5 })
      },
      {
        icon: 'h-6',
        title: '标题6',
        action: () => props.editor.chain().focus().toggleHeading({ level: 6 }).run(),
        isActive: () => props.editor.isActive('heading', { level: 6 })
      },
      {
        icon: 'paragraph',
        title: '段落',
        action: () => props.editor.chain().focus().setParagraph().run(),
        isActive: () => props.editor.isActive('paragraph')
      },
      {
        icon: 'list-unordered',
        title: '无须列表',
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList')
      },
      {
        icon: 'list-ordered',
        title: '有须列表',
        action: () => props.editor.chain().focus().toggleOrderedList().run(),
        isActive: () => props.editor.isActive('orderedList')
      },
      {
        type: 'divider'
      },
      {
        icon: 'double-quotes-l',
        title: '块',
        action: () => props.editor.chain().focus().toggleBlockquote().run(),
        isActive: () => props.editor.isActive('blockquote')
      },
      {
        icon: 'separator',
        title: '横线',
        action: () => props.editor.chain().focus().setHorizontalRule().run()
      },
      {
        type: 'divider'
      },
      {
        icon: 'format-clear',
        title: '清除样式',
        action: () => props.editor.chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .run()
      },
      {
        type: 'divider'
      },
      {
        icon: 'image-line',
        title: '插入图片',
        action: () => {
          const url = window.prompt('URL')
          if (url) {
            props.editor.chain().focus().setImage({ src: url }).run()
          }
        }
      },
      {
        icon: 'video-line',
        title: '插入视频',
        action: () => {
          const url = window.prompt('URL')
          if (url) {
            props.editor.chain().focus().setVideo({ src: url }).run()
          }
        }
      },
      {
        type: 'divider'
      },
      {
        icon: 'table-2',
        title: '插入表格',
        action: () => props.editor.chain().focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      },
      {
        icon: 'delete-bin-6-line',
        title: '删除表格',
        action: () => props.editor.chain().focus().deleteTable().run()
      },
      {
        icon: 'merge-cells-horizontal',
        title: '合并拆分单元格',
        action: () => props.editor.chain().focus().mergeOrSplit().run()
      },
      {
        icon: 'insert-row-top',
        title: '上面添加一行',
        action: () => props.editor.chain().focus().addRowBefore().run()
      },
      {
        icon: 'insert-row-bottom',
        title: '下面添加一行',
        action: () => props.editor.chain().focus().addRowAfter().run()
      },
      {
        icon: 'delete-row',
        title: '删除行',
        action: () => props.editor.chain().focus().deleteRow().run()
      },
      {
        icon: 'insert-column-left',
        title: '左边添加一列',
        action: () => props.editor.chain().focus().addColumnBefore().run()
      },
      {
        icon: 'insert-column-right',
        title: '右边添加一列',
        action: () => props.editor.chain().focus().addColumnAfter().run()
      },
      {
        icon: 'delete-column',
        title: '删除行',
        action: () => props.editor.chain().focus().deleteColumn().run()
      },
      {
        icon: 'sip-line',
        title: '单元格背景色',
        action: () => props.editor.chain().focus().toggleHeaderCell().run()
      },
      {
        type: 'divider'
      }
    ])
    return {
      items
    }
  },
}
</script>

<style>
.menu-bar{
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