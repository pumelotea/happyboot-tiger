<hb-demo>基本用法</hb-demo>
<script setup>
import {NInput} from "naive-ui"
import HbAdminMarkdown from "@/components/HbAdminMarkdown"
import {ref} from "vue"

const data = ref("---\n" +
    "# frontmatter: https://jekyllrb.com/docs/front-matter/\n" +
    "layout: post\n" +
    "title: Blogging Like a Hacker\n" +
    "---\n" +
    "\n" +
    "## Markdown Basic Syntax\n" +
    "\n" +
    "I just love **bold text**. Italicized text is the _cat's meow_. At the command prompt, type `nano`.\n" +
    "\n" +
    "My favorite markdown editor is [ByteMD](https://github.com/bytedance/bytemd).\n" +
    "\n" +
    "1. First item\n" +
    "2. Second item\n" +
    "3. Third item\n" +
    "\n" +
    "> Dorothy followed her through many of the beautiful rooms in her castle.\n" +
    "\n" +
    "```js\n" +
    "import { Editor, Viewer } from 'bytemd'\n" +
    "import gfm from '@bytemd/plugin-gfm'\n" +
    "\n" +
    "const plugins = [\n" +
    "  gfm(),\n" +
    "  // Add more plugins here\n" +
    "]\n" +
    "\n" +
    "const editor = new Editor({\n" +
    "  target: document.body, // DOM to render\n" +
    "  props: {\n" +
    "    value: '',\n" +
    "    plugins,\n" +
    "  },\n" +
    "})\n" +
    "\n" +
    "editor.on('change', (e) => {\n" +
    "  editor.$set({ value: e.detail.value })\n" +
    "})\n" +
    "```\n" +
    "\n" +
    "## GFM Extended Syntax\n" +
    "\n" +
    "Automatic URL Linking: https://github.com/bytedance/bytemd\n" +
    "\n" +
    "~~The world is flat.~~ We now know that the world is round.\n" +
    "\n" +
    "- [x] Write the press release\n" +
    "- [ ] Update the website\n" +
    "- [ ] Contact the media\n" +
    "\n" +
    "| Syntax    | Description |\n" +
    "| --------- | ----------- |\n" +
    "| Header    | Title       |\n" +
    "| Paragraph | Text        |\n" +
    "\n" +
    "## Footnotes\n" +
    "\n" +
    "Here's a simple footnote,[^1] and here's a longer one.[^bignote]\n" +
    "\n" +
    "[^1]: This is the first footnote.\n" +
    "[^bignote]: Here's one with multiple paragraphs and code.\n" +
    "\n" +
    "    Indent paragraphs to include them in the footnote.\n" +
    "\n" +
    "    `{ my code }`\n" +
    "\n" +
    "    Add as many paragraphs as you like.\n" +
    "\n" +
    "## Gemoji\n" +
    "\n" +
    "Thumbs up: :+1:, thumbs down: :-1:.\n" +
    "\n" +
    "Families: :family_man_man_boy_boy:\n" +
    "\n" +
    "Long flags: :wales:, :scotland:, :england:.\n" +
    "\n" +
    "## Math Equation\n" +
    "\n" +
    "Inline math equation: $a+b$\n" +
    "\n" +
    "$$\n" +
    "\\displaystyle \\left( \\sum_{k=1}^n a_k b_k \\right)^2 \\leq \\left( \\sum_{k=1}^n a_k^2 \\right) \\left( \\sum_{k=1}^n b_k^2 \\right)\n" +
    "$$\n" +
    "\n" +
    "## Mermaid Diagrams\n" +
    "\n" +
    "```mermaid\n" +
    "graph TD;\n" +
    "  A-->B;\n" +
    "  A-->C;\n" +
    "  B-->D;\n" +
    "  C-->D;\n" +
    "```\n")

</script>
<template>
  <div style="margin-bottom: 10px">
    <n-input v-model:value="data" type="textarea" placeholder="输入输出"></n-input>
  </div>
  <div style="height: 600px">
    <hb-admin-markdown v-model:value="data"></hb-admin-markdown>
  </div>
</template>