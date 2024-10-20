const js = require('@eslint/js')
const perfectionist = require('eslint-plugin-perfectionist')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const reactHooks = require('eslint-plugin-react-hooks')
const reactRefresh = require('eslint-plugin-react-refresh')
const globals = require('globals')
const tseslint = require('typescript-eslint')

module.exports = tseslint.config(
  perfectionist.configs['recommended-natural'],
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintPluginPrettierRecommended
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 0,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    }
  }
)
