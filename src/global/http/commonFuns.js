import Qs from 'qs'

// generateReqKey ：用于根据当前请求的信息，生成请求 Key；
export function generateReqKey (config) {
  // 响应的时候，response.config 中的data 是一个JSON字符串，所以需要转换一下
  if (config && config.data && isJsonStr(config.data)) {
    config.data = JSON.parse(config.data)
  }
  const { method, url, params, data } = config // 请求方式，参数，请求地址，
  return [ method, url, Qs.stringify(params), Qs.stringify(data) ].join('&') // 拼接
}

// 判断一个字符串是否为JSON字符串
export const isJsonStr = str => {
  if (typeof str === 'string') {
    try {
      const obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
}
