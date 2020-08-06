module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
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
  rules: {
  },
  extends: 'standard'                       // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
};