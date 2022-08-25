<script setup>
import {useEditor, EditorContent, VueNodeViewRenderer} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import HbTiptapMenuBar from "./components/HbTiptapMenuBar"
import Highlight from '@tiptap/extension-highlight'
import HbVideo from './extension/hb-video'
import HbImage from './extension/hb-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

CodeBlockLowlight.name = 'code-block'
import 'highlight.js/styles/vs.css'
import 'github-markdown-css'

// load all highlight.js languages
import {lowlight} from 'lowlight'

//扩展组件
import HbTiptapCodeBlockComponent from './components/HbTiptapCodeBlockComponent.vue'
import HbTiptapVideoComponent from './components/HbTiptapVideoComponent.vue'
import HbTiptapImageComponent from './components/HbTiptapImageComponent.vue'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      // 添加新的属性
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-background-color'),
        renderHTML: (attributes) => ({
          'data-background-color': attributes.backgroundColor,
          style: `background-color: ${attributes.backgroundColor}`
        })
      }
    }
  }
})
const editor = useEditor({
  content: `hello world`,
  extensions: [
    StarterKit,
    Highlight.configure({multicolor: true}),
    Table.configure({
      resizable: true
    }),
    TableRow,
    TableHeader,
    CustomTableCell,
    CodeBlockLowlight
        .extend({
          addNodeView() {
            return VueNodeViewRenderer(HbTiptapCodeBlockComponent)
          },
        }).configure({lowlight}),
    HbImage.extend({
      addNodeView() {
        return VueNodeViewRenderer(HbTiptapImageComponent)
      }
    }),
    HbVideo.extend({
      addNodeView() {
        return VueNodeViewRenderer(HbTiptapVideoComponent)
      }
    })
  ],
})
</script>

<template>
  <div class="editor" v-if="editor">
    <hb-tiptap-menu-bar class="editor-header" :editor="editor"></hb-tiptap-menu-bar>
    <editor-content class="editor-body markdown-body" :editor="editor"/>
  </div>
</template>

<style scoped>
.editor {
  border: 1px solid #cccccc;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
}

.editor-header {
  border-bottom: 1px solid #cccccc;
  box-sizing: border-box;
}

.editor-body {
  box-sizing: border-box;
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 10px;
}
</style>
<style>
.ProseMirror {
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.ProseMirror table td, .ProseMirror table th {
  min-width: 1em;
  border: 2px solid #ced4da;
  padding: 3px 5px;
  vertical-align: top;
  box-sizing: border-box;
  position: relative
}

.ProseMirror table td > *, .ProseMirror table th > * {
  margin-bottom: 0
}

.ProseMirror table th {
  font-weight: 700;
  text-align: left;
  background-color: #f1f3f5
}

.ProseMirror table .selectedCell:after {
  z-index: 2;
  position: absolute;
  content: "";
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 255, .4);
  pointer-events: none
}

.ProseMirror table .column-resize-handle {
  position: absolute;
  right: -2px;
  top: 0;
  bottom: -2px;
  width: 4px;
  background-color: #00b2ff;
  pointer-events: none
}

.ProseMirror table p {
  margin: 0
}

.tableWrapper {
  overflow-x: auto
}

.resize-cursor {
  cursor: ew-resize;
  cursor: col-resize
}
</style>