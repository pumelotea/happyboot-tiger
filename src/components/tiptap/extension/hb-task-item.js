import TaskItem from '@tiptap/extension-task-item'
import { mergeAttributes } from '@tiptap/core'

const HbTaskItem = TaskItem.extend({
  addAttributes () {
    return {
      ...this.parent?.(),
      checked: {
        default    : false,
        keepOnSplit: false,
        parseHTML  : element => element.getAttribute('data-checked') === 'true',
        renderHTML : attributes => ({
          'data-checked': attributes.checked,
          class         : attributes.checked ? 'task-list-item enabled' : 'task-list-item'
        })
      }
    }
  },
  renderHTML ({ node, HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name
      }),
      [
        'label',
        [
          'input',
          {
            type   : 'checkbox',
            checked: node.attrs.checked ? 'checked' : null,
            class  : 'task-list-item-checkbox'
          }
        ],
        [ 'span' ]
      ],
      [ 'div', 0 ]
    ]
  },
  addNodeView () {
    return ({
      node, HTMLAttributes, getPos, editor
    }) => {
      const listItem = document.createElement('li')
      const checkboxWrapper = document.createElement('label')
      const checkboxStyler = document.createElement('span')
      const checkbox = document.createElement('input')
      const content = document.createElement('div')

      checkboxWrapper.contentEditable = 'false'
      checkbox.type = 'checkbox'
      checkbox.classList.add('task-list-item-checkbox')
      checkbox.addEventListener('change', event => {
        // if the editor isn’t editable and we don't have a handler for
        // readonly checks we have to undo the latest change
        if (!editor.isEditable && !this.options.onReadOnlyChecked) {
          checkbox.checked = !checkbox.checked
          return
        }

        const { checked } = event.target

        if (editor.isEditable && typeof getPos === 'function') {
          editor
            .chain()
            .focus(undefined, { scrollIntoView: false })
            .command(({ tr }) => {
              const position = getPos()
              const currentNode = tr.doc.nodeAt(position)

              tr.setNodeMarkup(position, undefined, {
                ...currentNode?.attrs,
                checked
              })

              return true
            })
            .run()
        }
        if (!editor.isEditable && this.options.onReadOnlyChecked) {
          // Reset state if onReadOnlyChecked returns false
          if (!this.options.onReadOnlyChecked(node, checked)) {
            checkbox.checked = !checkbox.checked
          }
        }
      })

      Object.entries(this.options.HTMLAttributes).forEach(([ key, value ]) => {
        listItem.setAttribute(key, value)
      })

      listItem.dataset.checked = node.attrs.checked
      if (node.attrs.checked) {
        checkbox.setAttribute('checked', 'checked')
      }

      checkboxWrapper.append(checkbox, checkboxStyler)
      listItem.append(checkboxWrapper, content)

      Object.entries(HTMLAttributes).forEach(([ key, value ]) => {
        listItem.setAttribute(key, value)
      })

      return {
        dom       : listItem,
        contentDOM: content,
        update    : updatedNode => {
          if (updatedNode.type !== this.type) {
            return false
          }

          listItem.dataset.checked = updatedNode.attrs.checked
          listItem.classList.add('task-list-item')
          if (updatedNode.attrs.checked) {
            listItem.classList.add('enabled')
          } else {
            listItem.classList.remove('enabled')
          }

          if (updatedNode.attrs.checked) {
            checkbox.setAttribute('checked', 'checked')
          } else {
            checkbox.removeAttribute('checked')
          }

          return true
        }
      }
    }
  }
})

export default HbTaskItem
