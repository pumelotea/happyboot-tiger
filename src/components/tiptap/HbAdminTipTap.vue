<script setup>
import './editor.css'
import {useEditor, EditorContent} from '@tiptap/vue-3'
import HbTiptapMenuBar from "./components/HbTiptapMenuBar"
import StarterKit from './extension/start-kit'

StarterKit.options.highlight = {multicolor: true}
StarterKit.options.table = {resizable: true}

import {onBeforeUnmount, onMounted, watch} from "vue";

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
  editor.value.destroy()
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