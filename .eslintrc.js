module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:vue/essential",
    "standard",
    "plugin:vue/vue3-recommended",
    "./.eslintrc-auto-import.json"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "vue/no-v-model-argument":"off",
    "vue/no-mutating-props":"off",
    "linebreak-style": "off",
    "vue/script-setup-uses-vars": "error",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "object-shorthand": ["error", "always"],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "objectsInArrays": false,
        "arraysInArrays": false
      }
    ],
    "array-callback-return": "error",
    "arrow-spacing": "error",
    "block-scoped-var": "error",
    "block-spacing": "error",
    "brace-style": ["error", "1tbs", {"allowSingleLine": true}],
    "camelcase": "error",
    "comma-spacing": ["error", {"before": false, "after": true}],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "consistent-this": ["error", "that"],
    "constructor-super": "error",
    "curly": "error",
    "default-case": "error",
    "dot-location": ["error", "property"],
    "dot-notation": "error",
    "eol-last": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "for-direction": "warn",
    "func-call-spacing": ["error", "never"],
    "func-names": ["warn", "as-needed"],
    "function-paren-newline": ["error", {"minItems": 4}],
    "getter-return": ["error", {"allowImplicit": true}],
    "guard-for-in": "warn",
    "implicit-arrow-linebreak": ["warn", "beside"],
    "jsx-quotes": ["error", "prefer-single"],
    "key-spacing": ["error", {
      "beforeColon": false,
      "align": "colon"
    }],
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "lines-around-comment": ["warn", {"beforeBlockComment": true}],
    "new-cap": "warn",
    "no-await-in-loop": "error",
    "no-buffer-constructor": "error",
    "no-cond-assign": "error",
    "no-empty": "warn",
    "no-constant-condition": "warn",
    "vue/no-multiple-template-root": "off",
    "n/no-callback-literal":"off",
    "vue/multi-word-component-names":"off",
    "no-new":"off",
  },
  "parser": "vue-eslint-parser",
  // others ...
  "globals": {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "withDefaults": "readonly"
  }
}
