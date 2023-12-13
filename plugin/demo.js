import * as defaultCompiler from 'vue/compiler-sfc'

export default function DemoPlugin() {
  const fileRegex = /\.(demo.vue)$/
  return {
    // 插件名称
    name: 'vite:demoLoader',

    // 该插件在 plugin-vue 插件之前执行，这样就可以直接解析到原模板文件
    enforce: 'pre',

    // 代码转译，这个函数的功能类似于 `webpack` 的 `loader`
    transform(code, id, opt) {
      if (fileRegex.test(id)) {
        const {errors, descriptor} = defaultCompiler.parse(code, {
          id,
          sourceMap: false
        })
        const title = descriptor.customBlocks[0]?.content.trim() || '-'
        let styleStr=''
        descriptor.styles.forEach(e=>{
          styleStr += `<style ${e.scoped?'scoped':''}>${e.content}</style>\n`
        })

        // 用于展示
        const oldCode = `<script setup>${descriptor.scriptSetup.content}<\/script>\n<template>${descriptor.template.content}</template>\n${styleStr}`
        // 用于运行
        const newCode = `<script setup>import HbAdminDemoCard from "@/components/HbAdminDemoCard"${descriptor.scriptSetup.content}\nconst __temp = '${escape(oldCode)}'\nconst code___ = unescape(__temp)\n<\/script>\n<template>\n<hb-admin-demo-card title="${title}" :code="code___">${descriptor.template.content}</hb-admin-demo-card>\n</template>\n${styleStr}`

        return {
          code: newCode,
          map: null // 如果可行将提供 source map
        }
      }
    }
  }
}
