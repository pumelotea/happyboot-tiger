<script setup>
import remixiconSvg from 'remixicon/fonts/remixicon.symbol.svg'
import {ref} from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  action: {
    type: Function,
    required: true
  },
  isActive: {
    type: Function,
    default: null
  }
})

const iconUrl = ref(remixiconSvg)
</script>
<template>
  <button
      class="menu-item"
      :class="{ 'is-active': isActive ? isActive(): null }"
      @click="action"
      :title="title"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${icon}`"/>
    </svg>
  </button>
</template>

<style scoped>
.menu-item {
  width: 28px;
  height: 28px;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 3px;
  padding: 5px;
  margin-right: 5px;
  transition: all 0.2s;
}

.menu-item:hover, .is-active {
  color: #fff;
  background-color: #0d0d0d;
}

.menu-item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
</style>