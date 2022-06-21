import { ref, watch } from 'vue'
import { darkTheme, useOsTheme } from 'naive-ui'

const isMenuCollapsed = ref(false)
const osTheme = useOsTheme()
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

watch(osTheme, val => {
  isDarkTheme.value = val === 'dark'
})

isDarkTheme.value = osTheme.value === 'dark'

export {
  isDarkTheme,
  theme,
  isMenuCollapsed,
  isDark
}
