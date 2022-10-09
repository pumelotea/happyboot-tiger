import {
  mergeAttributes,
  Node,
  nodeInputRule
} from '@tiptap/core'

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export const HbImage = Node.create({
  name: 'hb-image',

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
        tag: 'img[src]'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return [ 'img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes) ]
  },

  addCommands () {
    return {
      setHbImage: options => ({ commands }) => {
        return commands.insertContent({
          type : this.name,
          attrs: options
        })
      }
    }
  },

  addInputRules () {
    return [
      nodeInputRule({
        find         : inputRegex,
        type         : this.type,
        getAttributes: match => {
          const [ ,, alt, src, title ] = match
          return { src, alt, title }
        }
      })
    ]
  }
})

export default HbImage
