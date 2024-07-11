module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommendedTypeChecked',
    'plugin:@typescript-eslint/recommendedTypeChecked',
    'plugin:react-hooks/recommendedTypeChecked',
  ],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
