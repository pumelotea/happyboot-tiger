<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import {NPopselect,NButton} from 'naive-ui'
import {ref, watch} from "vue";

const props = defineProps(nodeViewProps)

const languages = props.extension.options.lowlight.listLanguages().map(e=>{
  return {
    label: e,
    value: e,
  }
})

languages.unshift({
  label: 'auto',
  value: null
})

const selectedLanguage = ref(null)

watch(selectedLanguage,()=>{
  props.updateAttributes({ language:selectedLanguage.value })
})

</script>
<template>
  <node-view-wrapper class="code-block">
    <div class="lang-select" contenteditable="false">
      <n-popselect v-model:value="selectedLanguage" :options="languages" trigger="click" style="max-height: 300px;overflow: auto">
        <n-button text type="info" size="small">{{ selectedLanguage || 'auto' }}</n-button>
      </n-popselect>
    </div>
    <pre><node-view-content/></pre>
  </node-view-wrapper>
</template>

<style scoped>
.code-block {
  position: relative;
}

.code-block .lang-select {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  padding: 0 10px;
}
</style>