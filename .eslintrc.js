module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',                   // use ESM syntax
    ecmaFeatures: {
      impliedStrict: true,                  // enable global strict mode
      jsx: true                             // enable JSX
    }
  },
  globals: {
  },
  plugins: ['@typescript-eslint'],
  rules: {
  },
  extends: [
    'standard'                              // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
  ],
}
