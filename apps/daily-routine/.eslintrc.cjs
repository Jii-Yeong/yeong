module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto', printWidth: 80, semi: true },
    ],
    'react-refresh/only-export-components': 'warn',
    quotes: ['error', 'double'],
    semi: ['error', 'never'],
  },
};
