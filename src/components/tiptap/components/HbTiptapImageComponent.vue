<script setup>
import { NodeViewContent, nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'
import HbTiptapResizer from '@/components/tiptap/components/HbTiptapResizer'
import { NPopover } from 'naive-ui'
import HbTiptapMenuItem from "@/components/tiptap/components/HbTiptapMenuItem"
const props = defineProps(nodeViewProps)

function onchange (width, height) {
  props.updateAttributes({ width, height })
}

</script>
<template>
  <node-view-wrapper
    class="image-block"
    as="span"
  >
    <n-popover placement="right-start" :showArrow="false" trigger="click" style="padding: 0">
      <template #trigger>
        <hb-tiptap-resizer
            :selected="props.selected"
            :w="props.node.attrs.width"
            :h="props.node.attrs.height"
            @on-change="onchange"
        >
          <template #default="{width,height}">
            <img
                :width="width"
                :height="height"
                class="main-image"
                :src="props.node.attrs.src"
                draggable="false"
            >
          </template>
        </hb-tiptap-resizer>
      </template>
      <div class="image-actions">
        <div class="action-item">
          <hb-tiptap-menu-item
              icon="settings-line"
              title="修改图片"
              :action="()=>{}"
              :is-active="() => {}"
          ></hb-tiptap-menu-item>
        </div>
        <div class="action-item">
          <hb-tiptap-menu-item
              icon="delete-bin-2-line"
              title="删除"
              :action="()=>{}"
              :is-active="() => {}"
          ></hb-tiptap-menu-item>
        </div>
      </div>
    </n-popover>
  </node-view-wrapper>
</template>

<style scoped>
.image-block {
  position: relative;
  max-width: 100%;
  box-sizing: border-box;
  display: inline-block;
  line-height: 0;
  float: none;
  vertical-align: baseline;
  padding: 0 5px;
}

.main-image{
  display: block !important;
  margin: 0!important;
  padding: 0!important;
}

.image-actions{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
}
.action-item{
  display: flex;
  align-items: center;
}

.action-item + .action-item{
  margin-top: 2px;
}
</style>
