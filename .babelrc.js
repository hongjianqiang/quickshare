module.exports = function (api) {
  api.cache.forever()

  return {
    presets: [
      '@babel/preset-env',
      '@vue/babel-preset-jsx'
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  }
}