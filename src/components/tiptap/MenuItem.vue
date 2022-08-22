<template>
  <button
      class="menu-item"
      :class="{ 'is-active': isActive ? isActive(): null }"
      @click="action"
      :title="title"
  >
    <svg class="remix">
      <use :xlink:href="`${iconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<script>
import remixiconUrl from 'remixicon/fonts/remixicon.symbol.svg'
import {ref} from "vue";

export default {
  props: {
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
  },
  setup(){
    const iconUrl = ref(remixiconUrl)
    return {
      iconUrl
    }
  }
}
</script>

<style>
.menu-item {
  width: 30px;
  height: 30px;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
}

.menu-item:hover,.is-active{
  color: #fff;
  background-color: #0d0d0d;
}

.menu-item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

</style>