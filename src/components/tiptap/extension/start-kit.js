import { Extension, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Italic from '@tiptap/extension-italic'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Color from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import CharacterCount from '@tiptap/extension-character-count'

// load all highlight.js languages
import { lowlight } from 'lowlight/lib/core'
import arduino from 'highlight.js/lib/languages/arduino'
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import css from 'highlight.js/lib/languages/css'
import diff from 'highlight.js/lib/languages/diff'
import go from 'highlight.js/lib/languages/go'
import graphql from 'highlight.js/lib/languages/graphql'
import ini from 'highlight.js/lib/languages/ini'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import kotlin from 'highlight.js/lib/languages/kotlin'
import less from 'highlight.js/lib/languages/less'
import lua from 'highlight.js/lib/languages/lua'
import makefile from 'highlight.js/lib/languages/makefile'
import markdown from 'highlight.js/lib/languages/markdown'
import objectivec from 'highlight.js/lib/languages/objectivec'
import perl from 'highlight.js/lib/languages/perl'
import php from 'highlight.js/lib/languages/php'
import phpTemplate from 'highlight.js/lib/languages/php-template'
import plaintext from 'highlight.js/lib/languages/plaintext'
import python from 'highlight.js/lib/languages/python'
import pythonRepl from 'highlight.js/lib/languages/python-repl'
import r from 'highlight.js/lib/languages/r'
import ruby from 'highlight.js/lib/languages/ruby'
import rust from 'highlight.js/lib/languages/rust'
import scss from 'highlight.js/lib/languages/scss'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import swift from 'highlight.js/lib/languages/swift'
import typescript from 'highlight.js/lib/languages/typescript'
import vbnet from 'highlight.js/lib/languages/vbnet'
import wasm from 'highlight.js/lib/languages/wasm'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'

import HbTiptapCodeBlockComponent from '../components/HbTiptapCodeBlockComponent.vue'
import HbTiptapVideoComponent from '../components/HbTiptapVideoComponent.vue'
import HbTiptapImageComponent from '../components/HbTiptapImageComponent.vue'
import HbTiptapMathComponent from '../components/HbTiptapMathComponent.vue'
import HbVideo from '../extension/hb-video'
import HbImage from '../extension/hb-image'
import HbMath from '../extension/hb-math'
import Indent from '@/components/tiptap/extension/indent.js'
import HbTaskItem from '@/components/tiptap/extension/hb-task-item.js'
lowlight.registerLanguage('arduino', arduino)
lowlight.registerLanguage('bash', bash)
lowlight.registerLanguage('c', c)
lowlight.registerLanguage('cpp', cpp)
lowlight.registerLanguage('csharp', csharp)
lowlight.registerLanguage('css', css)
lowlight.registerLanguage('diff', diff)
lowlight.registerLanguage('go', go)
lowlight.registerLanguage('graphql', graphql)
lowlight.registerLanguage('ini', ini)
lowlight.registerLanguage('java', java)
lowlight.registerLanguage('javascript', javascript)
lowlight.registerLanguage('json', json)
lowlight.registerLanguage('kotlin', kotlin)
lowlight.registerLanguage('less', less)
lowlight.registerLanguage('lua', lua)
lowlight.registerLanguage('makefile', makefile)
lowlight.registerLanguage('markdown', markdown)
lowlight.registerLanguage('objectivec', objectivec)
lowlight.registerLanguage('perl', perl)
lowlight.registerLanguage('php', php)
lowlight.registerLanguage('php-template', phpTemplate)
lowlight.registerLanguage('plaintext', plaintext)
lowlight.registerLanguage('python', python)
lowlight.registerLanguage('python-repl', pythonRepl)
lowlight.registerLanguage('r', r)
lowlight.registerLanguage('ruby', ruby)
lowlight.registerLanguage('rust', rust)
lowlight.registerLanguage('scss', scss)
lowlight.registerLanguage('shell', shell)
lowlight.registerLanguage('sql', sql)
lowlight.registerLanguage('swift', swift)
lowlight.registerLanguage('typescript', typescript)
lowlight.registerLanguage('vbnet', vbnet)
lowlight.registerLanguage('wasm', wasm)
lowlight.registerLanguage('xml', xml)
lowlight.registerLanguage('yaml', yaml)

const StarterKit = Extension.create({
  name: 'start-kit',
  addExtensions () {
    const extensions = []

    extensions.push(Placeholder.configure({
      // Use a placeholder:
      placeholder: '写点有意思的内容...'
      // Use different placeholders depending on the node type:
      // placeholder: ({ node }) => {
      //   if (node.type.name === 'heading') {
      //     return 'What’s the title?'
      //   }

      //   return 'Can you add some further context?'
      // },
    }))

    extensions.push(CharacterCount)

    extensions.push(Indent)

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote))
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold))
    }

    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options?.bulletList))
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code))
    }

    if (this.options.codeBlock !== false) {
      const HbCodeBlock = CodeBlockLowlight
        .extend({
          addNodeView () {
            return VueNodeViewRenderer(HbTiptapCodeBlockComponent)
          }
        }).configure({ lowlight })
      extensions.push(HbCodeBlock)
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document))
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor))
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor))
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak))
    }

    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options?.heading))
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history))
    }

    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options?.horizontalRule))
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic))
    }

    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options?.listItem))
    }

    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options?.orderedList))
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph))
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike))
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text))
    }

    if (this.options.highlight !== false) {
      extensions.push(Highlight.configure(this.options?.highlight))
    }

    if (this.options.table !== false) {
      extensions.push(Table.configure(this.options?.table))
      extensions.push(TableRow)
      extensions.push(TableHeader)
      const HbTableCell = TableCell.extend({
        renderHTML ({ HTMLAttributes }) {
          const attrs = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
          if (attrs.colwidth) {
            attrs.style = `width: ${attrs.colwidth}px`
          }
          return [ 'td', attrs, 0 ]
        },
        addAttributes () {
          return {
            ...this.parent?.(),
            // 添加新的属性
            backgroundColor: {
              default   : null,
              parseHTML : (element) => element.getAttribute('data-background-color'),
              renderHTML: (attributes) => ({
                'data-background-color': attributes.backgroundColor,
                style                  : `background-color: ${attributes.backgroundColor}`
              })
            }
          }
        }
      })
      extensions.push(HbTableCell)
    }

    if (this.options.image !== false) {
      extensions.push(HbImage.extend({
        addNodeView () {
          return VueNodeViewRenderer(HbTiptapImageComponent)
        }
      }))
    }

    if (this.options.video !== false) {
      extensions.push(HbVideo.extend({
        addNodeView () {
          return VueNodeViewRenderer(HbTiptapVideoComponent)
        }
      }))
    }

    if (this.options.underline !== false) {
      extensions.push(Underline)
    }

    if (this.options.task !== false) {
      extensions.push(TaskList.configure({
        HTMLAttributes: {
          class: 'contains-task-list'
        }
      }))
      extensions.push(HbTaskItem.configure({
        nested: true
      }))
    }

    if (this.options.link !== false) {
      extensions.push(Link.configure({
        protocols: [ 'ftp', 'mailto', 'http', 'https' ],
        autolink : false
      }))
    }

    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure({
        types: [ 'heading', 'paragraph' ]
      }))
    }

    if (this.options.subscript !== false) {
      extensions.push(Subscript)
    }

    if (this.options.superscript !== false) {
      extensions.push(Superscript)
    }

    if (this.options.color !== false) {
      extensions.push(TextStyle)
      extensions.push(Color)
    }

    if (this.options.math !== false) {
      extensions.push(HbMath.extend({
        addNodeView () {
          return VueNodeViewRenderer(HbTiptapMathComponent)
        }
      }))
    }
    return extensions
  }
})

export default StarterKit
