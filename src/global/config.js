import {ref, watch} from "vue"
import {darkTheme} from "naive-ui"

const theme = ref(null)
const isDark = ref(false)

const isDarkTheme = ref(false)

watch(isDarkTheme, val => {
  if (val) {
    theme.value = darkTheme
    isDark.value = true
  } else {
    theme.value = null
    isDark.value = false
  }
})

const isMenuCollapsed = ref(false)

export {
  isDarkTheme,
  theme,
  isMenuCollapsed,
  isDark
}



