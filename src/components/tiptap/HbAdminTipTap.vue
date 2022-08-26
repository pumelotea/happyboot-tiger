<script setup>
import './editor.css'
import {useEditor, EditorContent} from '@tiptap/vue-3'
import HbTiptapMenuBar from "./components/HbTiptapMenuBar"
import StarterKit from './extension/start-kit'


StarterKit.options.highlight = {multicolor: true}
StarterKit.options.table = {resizable: true}

import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useDebounceFn} from "@vueuse/core";

const words = ref(0)
const characters = ref(0)
const fullscreen = ref(false)

const updateEditorWordCount = useDebounceFn(()=> {
  words.value = editor.value.storage.characterCount.words()
  characters.value = editor.value.storage.characterCount.characters()
},300)

let editor
editor = useEditor({
  content: ``,
  extensions: [
    StarterKit
  ],
  onUpdate: () => {
    // HTML
    emit('update:modelValue', editor.value.getHTML())

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())

    updateEditorWordCount()
  },
})

onMounted(()=>{
  editor.value.storage.fullscreen = fullscreen
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
  updateEditorWordCount()
})

onBeforeUnmount(()=>{
  editor.value.destroy()
})

</script>

<template>
  <div class="editor" v-if="editor" :class="{'fullscreen':fullscreen}">
    <hb-tiptap-menu-bar class="editor-header" :editor="editor"></hb-tiptap-menu-bar>
    <editor-content class="editor-body markdown-body" :editor="editor"/>
    <div class="editor-footer">
      <div class="footer-item">短语 {{words}}</div>
      <div class="footer-item">字符 {{characters}}</div>
    </div>
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

.editor.fullscreen{
  position: fixed;
  inset: 0;
  background: white;
  z-index: 1;
  margin: 0;
  padding: 0;
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

.editor-footer{
  height: 20px;
  border-top: 1px solid rgba(204, 204, 204, 0.3);
  display: flex;
  justify-content: flex-end;
  padding: 5px 10px;
}

.footer-item{
  font-size: 12px;
}

.footer-item+.footer-item{
  margin-left: 10px;
}
</style>
