module.exports = {
  root: true,
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    node: true
  },
  rules: {
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': ['error', 'always']
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
