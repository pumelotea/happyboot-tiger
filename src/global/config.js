import {ref, watch} from "vue";
import {darkTheme} from "naive-ui";

const theme = ref(null)

const isDarkTheme = ref(false)

watch(isDarkTheme,(val)=>{
  if (val){
    theme.value = darkTheme
  }else{
    theme.value = null
  }
})


const isMenuCollapsed = ref(false)

export {
  isDarkTheme,
  theme,
  isMenuCollapsed
}



