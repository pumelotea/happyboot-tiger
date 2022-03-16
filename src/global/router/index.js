import { createRouter, createWebHashHistory,createWebHistory} from 'vue-router'
import routes from './config'
import { beforeEachHandler, afterEachHandler } from './config'
import happyFramework from '../framework'
import { upgradeRouter } from 'happykit'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes // short for `routes: routes`
})

// 升级路
const happyKitRouter = upgradeRouter(happyFramework,router)

router.beforeEach(beforeEachHandler)
router.afterEach(afterEachHandler)

export default happyKitRouter
