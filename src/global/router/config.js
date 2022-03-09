import {createDefaultRouterInterceptor} from 'happykit'
const modules = import.meta.glob("/src/views/**/**.vue")

import happyFramework from '../framework'
import routerData from '../../mock/routerData'

// 创建默认的拦截器
const beforeInterceptor = createDefaultRouterInterceptor({
  interceptorType: 'before',
  framework: happyFramework,
  async dataLoader() {
    // 实际开发环境应该从服务端拉取数据
    // 同时应该根据实际的数据结构进行编写对应的适配器
    // 同时应该自行处理好请求失败等情况
    return {
      rawData: await new Promise(resolve => {
        resolve(routerData)
      })
    }
  },
  dataLoadFailureHandler() {
    console.log('数据加载失败')
  },
  routerInjectOption: {
    randomName: true,
    parentRoute: {
      name: 'home',
      path: '/',
      component: () => import('/src/views/home/index.vue')
    },
    routes: [],
    viewLoader(view) {
      return modules[`/src/views${view}`]
    }
  }
})

const routes = []

export const beforeEachHandler = (to, from, next) => {
  // 使用拦截器
  beforeInterceptor.filter(to,from,next)
  // next()
}

// eslint-disable-next-line no-unused-vars
export const afterEachHandler = (to, from) => {
  // 使用拦截器
  // afterInterceptor.filter(to,from)
}


export default routes
