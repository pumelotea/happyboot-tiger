import { createApp } from 'vue'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'

import happyFramework from './global/framework'
import happySecurity from './global/security'
import router from './global/router'

createApp(App)
  .use(router)
  .use(happyFramework)
  .use(happySecurity)
  .mount('#app')
