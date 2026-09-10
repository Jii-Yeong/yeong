/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [require.resolve('@yeong/config/eslint/next.js')],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
