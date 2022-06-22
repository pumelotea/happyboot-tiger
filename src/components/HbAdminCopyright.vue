<script setup>
import {useThemeVars} from 'naive-ui'

const vars = useThemeVars()
</script>
<template>
  <div class="hb-admin-copyright-com">
    HappyBoot Tiger Powered By&nbsp;<a
      class="power-by"
      href="https://happykit.org"
    >HappyKit</a>
  </div>
</template>

<style scoped>
.hb-admin-copyright-com{
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: v-bind(vars.textColor1);
}

.power-by{
  color: v-bind(vars.primaryColor);
}
</style>
