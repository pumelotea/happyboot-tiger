<script setup>
import {useEditor, EditorContent, VueNodeViewRenderer} from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from "./MenuBar"
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
// load all highlight.js languages
import { lowlight } from 'lowlight'

import CodeBlockComponent from './CodeBlockComponent.vue'

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // 展开现有属性,?.是可选链操作符,可以自行百度(懂的大佬当我没说)
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
  content: `123123`,
  extensions: [
    StarterKit,
    Image,
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
          return VueNodeViewRenderer(CodeBlockComponent)
        },
      })
      .configure({ lowlight }),
  ],
})
</script>

<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor-header" :editor="editor"></menu-bar>
    <editor-content class="editor-body" :editor="editor"/>
  </div>
</template>

<style>
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

.ProseMirror {
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}

.ProseMirror mark {
  background-color: #faf594;
}

.ProseMirror img {
  max-width: 100%;
  height: auto;
}

.ProseMirror hr {
  margin: 1rem 0;
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, 0.1);
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}

.ProseMirror ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
}

.ProseMirror ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}

.ProseMirror ul[data-type="taskList"] li > label {
  flex: 0 0 auto;
  margin-right: .5rem;
  user-select: none;
}

.ProseMirror ul[data-type="taskList"] li > div {
  flex: 1 1 auto;
}

</style>
<style>
.ProseMirror {
  margin: 1rem 0
}

.ProseMirror > * + * {
  margin-top: .75em
}

.ProseMirror ul, .ProseMirror ol {
  padding: 0 1rem
}

.ProseMirror h1, .ProseMirror h2, .ProseMirror h3, .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
  line-height: 1.1
}


.ProseMirror img {
  max-width: 100%;
  height: auto
}

.ProseMirror blockquote {
  padding-left: 1rem;
  border-left: 2px solid rgba(13, 13, 13, .1)
}

.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, .1);
  margin: 2rem 0
}

.ProseMirror table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
  margin: 0;
  overflow: hidden
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
  background-color: #adf;
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
<style>
.ProseMirror pre {
  background: #0D0D0D;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}

.ProseMirror pre .hljs-comment,
.ProseMirror pre .hljs-quote {
  color: #616161;
}

.ProseMirror pre .hljs-variable,
.ProseMirror pre .hljs-template-variable,
.ProseMirror pre .hljs-attribute,
.ProseMirror pre .hljs-tag,
.ProseMirror pre .hljs-name,
.ProseMirror pre .hljs-regexp,
.ProseMirror pre .hljs-link,
.ProseMirror pre .hljs-name,
.ProseMirror pre .hljs-selector-id,
.ProseMirror pre .hljs-selector-class {
  color: #F98181;
}

.ProseMirror pre .hljs-number,
.ProseMirror pre .hljs-meta,
.ProseMirror pre .hljs-built_in,
.ProseMirror pre .hljs-builtin-name,
.ProseMirror pre .hljs-literal,
.ProseMirror pre .hljs-type,
.ProseMirror pre .hljs-params {
  color: #FBBC88;
}

.ProseMirror pre .hljs-string,
.ProseMirror pre .hljs-symbol,
.ProseMirror pre .hljs-bullet {
  color: #B9F18D;
}

.ProseMirror pre .hljs-title,
.ProseMirror pre .hljs-section {
  color: #FAF594;
}

.ProseMirror pre .hljs-keyword,
.ProseMirror pre .hljs-selector-tag {
  color: #70CFF8;
}

.ProseMirror pre .hljs-emphasis {
  font-style: italic;
}

.ProseMirror pre .hljs-strong {
  font-weight: 700;
}

</style>
