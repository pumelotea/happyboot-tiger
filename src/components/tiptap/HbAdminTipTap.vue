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

// load all highlight.js languages
import {lowlight} from 'lowlight'

//扩展组件
import HbTiptapCodeBlockComponent from './components/HbTiptapCodeBlockComponent.vue'
import HbTiptapVideoComponent from './components/HbTiptapVideoComponent.vue'
import HbTiptapImageComponent from './components/HbTiptapImageComponent.vue'
import {onBeforeUnmount, onMounted, watch} from "vue";

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
let editor
editor = useEditor({
  content: `<p><video src="https://media.w3.org/2010/05/sintel/trailer.mp4"></video><img src="1"></p>`,
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
  onUpdate: () => {
    // HTML
    emit('update:modelValue', editor.value.getHTML())

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())
  },
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

watch(()=>props.modelValue,(value)=>{
  // HTML
  const isSame =editor.value.getHTML() === value

  // JSON
  // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

  if (isSame) {
    return
  }

  editor.value.commands.setContent(value, false)
})

onMounted(()=>{
  emit('update:modelValue', editor.value.getHTML())
})

onBeforeUnmount(()=>{
  editor.destroy()
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
  outline: 0;
}

.editor-body {
  box-sizing: border-box;
  font-family: sans-serif;
  line-height: 1.7;
  overflow-x: auto;
  text-align: left;
}

.editor-body > * {
  box-sizing: border-box;
}

.editor-body p {
  margin-bottom: 0;
  margin-top: 0;
  outline: none;
}

.editor-body h1,
.editor-body h2,
.editor-body h3,
.editor-body h4,
.editor-body h5 {
  margin-top: 20px;
  margin-bottom: 20px;
}

.editor-body h1:first-child,
.editor-body h2:first-child,
.editor-body h3:first-child,
.editor-body h4:first-child,
.editor-body h5:first-child {
  margin-top: 0;
}

.editor-body h1:last-child,
.editor-body h2:last-child,
.editor-body h3:last-child,
.editor-body h4:last-child,
.editor-body h5:last-child {
  margin-bottom: 0;
}

.editor-body ul,
.editor-body ol {
  counter-reset: none;
  list-style-type: none;
  margin-bottom: 0;
  margin-left: 24px;
  margin-top: 0;
  padding-bottom: 5px;
  padding-left: 0;
  padding-top: 5px;
}

.editor-body li > p {
  margin: 0;
}

.editor-body li > p:first-child::before {
  content: counter(el-tiptap-counter) ".";
  display: inline-block;
  left: -5px;
  line-height: 1;
  margin-left: -24px;
  position: relative;
  text-align: right;
  top: 0;
  width: 24px;
}

.editor-body ul li > p:first-child::before {
  content: '\2022';
  text-align: center;
}

.editor-body ol {
  counter-reset: el-tiptap-counter;
}

.editor-body ol li > p:first-child::before {
  counter-increment: el-tiptap-counter;
}

.editor-body a {
  color: #409eff;
  cursor: pointer;
}

.editor-body blockquote {
  border-left: 5px solid #edf2fc;
  border-radius: 2px;
  color: #606266;
  margin: 10px 0;
  padding-left: 1em;
}

.editor-body code {
  background-color: #d9ecff;
  border-radius: 4px;
  color: #409eff;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  padding: 0 8px;
}

.editor-body pre {
  background-color: #f6f8fa;
  /*color: #d9ecff;*/
  /*font-size: 16px;*/
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  overflow-x: auto;
  padding: 14px 20px;
  margin: 10px 0;
  border-radius: 5px;
}

.editor-body pre code {
  background-color: transparent;
  border-radius: 0;
  color: inherit;
  display: block;
  font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
  font-size: inherit;
  font-weight: normal;
  padding: 0;
}

.editor-body img {
  display: inline-block;
  float: none;
  margin: 12px 0;
  max-width: 100%;
}

.editor-body img[data-display=inline] {
  margin-left: 12px;
  margin-right: 12px;
}

.editor-body img[data-display=block] {
  display: block;
}

.editor-body img[data-display=left] {
  float: left;
  margin-left: 0;
  margin-right: 12px;
}

.editor-body img[data-display=right] {
  float: right;
  margin-left: 12px;
  margin-right: 0;
}

.editor-body ul[data-type=todo_list] {
  margin-left: 5px;
}

.editor-body ul[data-type=todo_list] .todo-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0;
}

.editor-body ul[data-type=todo_list] .todo-item[data-text-align=right] {
  justify-content: flex-end !important;
}

.editor-body ul[data-type=todo_list] .todo-item[data-text-align=center] {
  justify-content: center !important;
}

.editor-body ul[data-type=todo_list] .todo-item[data-text-align=justify] {
  text-align: space-between !important;
}

.editor-body ul[data-type=todo_list] .todo-item .todo-content {
  padding-left: 10px;
}

.editor-body ul[data-type=todo_list] .todo-item .todo-content > p {
  font-size: 16px;
}

.editor-body ul[data-type=todo_list] .todo-item .todo-content > p:last-of-type {
  margin-bottom: 0;
}

.editor-body ul[data-type=todo_list] .todo-item--done > .todo-checkbox {
  color: #409eff;
}

.editor-body ul[data-type=todo_list] .todo-item--done > .todo-content > p {
  color: #409eff;
  text-decoration: line-through;
}

.editor-body hr {
  margin-top: 20px;
  margin-bottom: 20px;
}

.editor-body *[data-indent="1"] {
  margin-left: 30px !important;
}

.editor-body *[data-indent="2"] {
  margin-left: 60px !important;
}

.editor-body *[data-indent="3"] {
  margin-left: 90px !important;
}

.editor-body *[data-indent="4"] {
  margin-left: 120px !important;
}

.editor-body *[data-indent="5"] {
  margin-left: 150px !important;
}

.editor-body *[data-indent="6"] {
  margin-left: 180px !important;
}

.editor-body *[data-indent="7"] {
  margin-left: 210px !important;
}

.editor-body .tableWrapper {
  margin: 1em 0;
  overflow-x: auto;
}

.editor-body table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

.editor-body th,
.editor-body td {
  border: 2px solid #ebeef5;
  box-sizing: border-box;
  min-width: 1em;
  padding: 3px 5px;
  position: relative;
  vertical-align: top;
}

.editor-body th.selectedCell,
.editor-body td.selectedCell {
  background-color: #ecf5ff;
}

.editor-body th {
  font-weight: 500;
  text-align: left;
}

.editor-body .column-resize-handle {
  background-color: #b3d8ff;
  bottom: 0;
  pointer-events: none;
  position: absolute;
  right: -2px;
  top: 0;
  width: 4px;
  z-index: 20;
}

.editor-body .iframe {
  height: 0;
  padding-bottom: 56.25%;
  position: relative;
  width: 100%;
}

.editor-body .iframe__embed {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}

.editor-body .resize-cursor {
  cursor: ew-resize;
  cursor: col-resize;
}

</style>