module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    requireConfigFile: false,
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended', 'prettier'],
  rules: {
    'vue/no-v-html': 0,
    'no-lone-blocks': 0,
    'vue/no-v-model-argument': 'off',
  },
};
