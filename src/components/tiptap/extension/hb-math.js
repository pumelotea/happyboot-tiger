import {
  mergeAttributes,
  Node,
} from '@tiptap/core'


export const HbVideo = Node.create({
  name: 'hb-math',

  addOptions() {
    return {
      inline: true,
      HTMLAttributes: {},
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: false,

  addAttributes() {
    return {
      tex:""
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[tex]'
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
  },

  addCommands() {
    return {
      setHbMath: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
    }
  },
})

export default HbVideo
