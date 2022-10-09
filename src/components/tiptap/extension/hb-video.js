import {
  mergeAttributes,
  Node
} from '@tiptap/core'

export const HbVideo = Node.create({
  name: 'hb-video',

  addOptions () {
    return {
      inline        : true,
      HTMLAttributes: {}
    }
  },

  inline () {
    return this.options.inline
  },

  group () {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: false,

  addAttributes () {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: 400
      },
      height: {
        default: 300
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'video[src]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [ 'video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
  },

  addCommands () {
    return {
      setHbVideo: options => ({ commands }) => {
        return commands.insertContent({
          type : this.name,
          attrs: options
        })
      }
    }
  }
})

export default HbVideo
