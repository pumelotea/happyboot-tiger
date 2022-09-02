<script setup>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from '@tiptap/vue-3'
import 'katex/dist/katex.css'
import katex from 'katex'
import {NPopover} from 'naive-ui'
import HbTiptapMenuItem from "@/components/tiptap/components/HbTiptapMenuItem"

import {onMounted, ref, watch} from 'vue'
import HbTiptapMath from "@/components/tiptap/components/HbTiptapMath";

const props = defineProps(nodeViewProps)

const box = ref(null)

function init() {
  katex.render(props.node.attrs.tex, box.value, {
    throwOnError: false
  })
}

watch(() => props.node.attrs.tex, () => {
  init()
})

onMounted(() => {
  init()
})

const HTM = ref(null)

function handleOpenMath() {
  HTM.value.open(props.node.attrs.tex)
}

function onok(val) {
  if (!val) {
    props.editor.commands.deleteSelection()
    return
  }
  props.updateAttributes({tex: val})
}

</script>
<template>
  <node-view-wrapper class="math-block">
    <n-popover placement="bottom-end" :showArrow="false" trigger="click" style="padding: 0">
      <template #trigger>
        <p
            ref="box"
            :class="{'math-selected':props.selected}"
        />
      </template>
      <div class="image-actions">
        <div class="action-item">
          <hb-tiptap-menu-item
              icon="settings-line"
              title="修改公式"
              :action="handleOpenMath"
              :is-active="() => {}"
          ></hb-tiptap-menu-item>
        </div>
        <div class="action-item">
          <hb-tiptap-menu-item
              icon="delete-bin-2-line"
              title="删除"
              :action="props.deleteNode"
              :is-active="() => {}"
          ></hb-tiptap-menu-item>
        </div>
      </div>
    </n-popover>
  </node-view-wrapper>
  <hb-tiptap-math
      ref="HTM"
      @ok="onok"
  ></hb-tiptap-math>
</template>

<style scoped>
.math-block {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 0;
  float: none;
  vertical-align: baseline;
  padding: 0 5px;
}

.math-selected {
  background: rgb(0 150 255 / 32%);
}

.image-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}

.action-item {
  display: flex;
  align-items: center;
}

.action-item + .action-item {
  margin-top: 2px;
}
</style>
