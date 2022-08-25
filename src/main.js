import { createApp } from 'vue'
import App from './App.vue'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'

import happyFramework from './global/framework'
import happySecurity from './global/security'
import router from './global/router'

const app = createApp(App)
  .use(router)
  .use(happyFramework)
  .use(happySecurity)


// FIXED Warning
// injected property "decorationClasses" is a ref and will be auto-unwrapped and no longer needs `.value` in the next minor release.
// To opt-in to the new behavior now,
// set `app.config.unwrapInjectedRef = true` (this config is temporary and will not be needed in the future.)
app.config.unwrapInjectedRef = true


app.mount('#app')