import { Extension, isList } from '@tiptap/core'
import { TextSelection, AllSelection, Transaction } from '@tiptap/pm/state'
export function clamp (val, min, max) {
  if (val < min) {
    return min
  }
  if (val > max) {
    return max
  }
  return val
}
function updateIndentLevel (
  tr,
  delta,
  types,
  editor
) {
  const { doc, selection } = tr

  if (!doc || !selection) return tr

  if (
    !(selection instanceof TextSelection || selection instanceof AllSelection)
  ) {
    return tr
  }

  const { from, to } = selection

  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type

    if (types.includes(nodeType.name)) {
      tr = setNodeIndentMarkup(tr, pos, delta)
      return false
    } else if (isList(node.type.name, editor.extensionManager.extensions)) {
      return false
    }
    return true
  })

  return tr
}

function setNodeIndentMarkup (tr,
  pos,
  delta) {
  if (!tr.doc) return tr

  const node = tr.doc.nodeAt(pos)
  if (!node) return tr

  const minIndent = 0
  const maxIndent = 7

  const indent = clamp((node.attrs.indent || 0) + delta, minIndent, maxIndent)

  if (indent === node.attrs.indent) return tr

  const nodeAttrs = {
    ...node.attrs,
    indent
  }

  return tr.setNodeMarkup(
    pos, node.type, nodeAttrs, node.marks
  )
}

export function createIndentCommand ({ delta, types }) {
  return ({ state, dispatch, editor }) => {
    const { selection } = state
    let { tr } = state
    tr = tr.setSelection(selection)
    tr = updateIndentLevel(
      tr, delta, types, editor
    )

    if (tr.docChanged) {
      dispatch && dispatch(tr)
      return true
    }

    return false
  }
}

const Indent = Extension.create({
  name: 'indent',
  addOptions () {
    return {
      types    : [ 'paragraph', 'heading', 'blockquote' ],
      minIndent: 0,
      maxIndent: 7
    }
  },

  addGlobalAttributes () {
    return [
      {
        types     : this.options.types,
        attributes: {
          indent: {
            default  : 0,
            parseHTML: (element) => {
              const identAttr = element.getAttribute('data-indent')
              return (identAttr ? parseInt(identAttr, 10) : 0) || 0
            },
            renderHTML: (attributes) => {
              if (!attributes.indent) {
                return {}
              }

              return { 'data-indent': attributes.indent }
            }
          }
        }
      }
    ]
  },

  addCommands () {
    return {
      indent: () => createIndentCommand({
        delta: 1,
        types: this.options.types
      }),
      outdent: () => createIndentCommand({
        delta: -1,
        types: this.options.types
      })
    }
  },

  addKeyboardShortcuts () {
    return {
      Tab        : () => this.editor.commands.indent(),
      'Shift-Tab': () => this.editor.commands.outdent()
    }
  }
})

export default Indent
