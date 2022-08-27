<script setup>
import './editor.css'
import {useEditor, EditorContent} from '@tiptap/vue-3'
import HbTiptapMenuBar from "./components/HbTiptapMenuBar"
import StarterKit from './extension/start-kit'
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useDebounceFn} from "@vueuse/core";

import {useThemeVars} from 'naive-ui'
const vars = useThemeVars()

StarterKit.options.highlight = {multicolor: true}
StarterKit.options.table = {resizable: true}

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const words = ref(0)
const characters = ref(0)
const fullscreen = ref(false)
const selectedResizer = ref('')

const updateEditorWordCount = useDebounceFn(()=> {
  words.value = editor.value.storage.characterCount.words()
  characters.value = editor.value.storage.characterCount.characters()
},300)

const isFocused = ref(false)

let editor
editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit
  ],
  onUpdate: ({editor}) => {
    // HTML
    emit('update:modelValue', editor.getHTML())

    // JSON
    // this.$emit('update:modelValue', this.editor.getJSON())

    updateEditorWordCount()
  },
  onFocus: () => {
    isFocused.value = true
  },
  onBlur: () =>{
    isFocused.value = false
    selectedResizer.value = ''
  },
  onSelectionUpdate: ({editor})=>{
    //取消当前选中的resizer
    if (editor.storage.selectedResizer.value){
      if (!editor.isActive('hb-image') && !editor.isActive('hb-video')){
        editor.storage.selectedResizer.value = ''
      }
    }
  }
})

onMounted(()=>{
  editor.value.storage.fullscreen = fullscreen
  editor.value.storage.selectedResizer = selectedResizer
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
  <div class="editor-background" :class="{'fullscreen':fullscreen}">
    <div class="editor" v-if="editor" :class="{'fullscreen':fullscreen,'focus':isFocused && !fullscreen}">
        <hb-tiptap-menu-bar class="editor-header" :editor="editor"></hb-tiptap-menu-bar>
        <editor-content class="editor-body markdown-body" :editor="editor"/>
        <div class="editor-footer">
          <div class="footer-item">短语 {{words}}</div>
          <div class="footer-item">字符 {{characters}}</div>
        </div>
    </div>
  </div>
</template>

<style scoped>
.editor {
  border: 1px solid v-bind(vars.borderColor);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  transition-property: border-color,box-shadow;
  transition-duration:  0.2s;
  background: v-bind(vars.inputColor);
}

.editor-background {
  width: 100%;
  height: 100%;
}

.editor-background.fullscreen{
  position: fixed;
  inset: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  background: v-bind(vars.cardColor);
}

.editor:hover{
  border-color: v-bind(vars. primaryColorHover);
}

.editor.focus{
  border-color: v-bind(vars.primaryColor);
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
}

.editor.fullscreen{
  position: fixed;
  inset: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
}

.editor.fullscreen:hover{
  border-color: rgba(0,0,0,0) !important;
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
