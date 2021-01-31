module.exports = function (api) {
  api.cache.forever()

  return {
    presets: [
      [
        '@babel/preset-env', {
          'useBuiltIns': 'usage',
          'corejs': '3.8'
        }
      ],
      '@vue/babel-preset-jsx'
    ],
    plugins: [
      '@babel/plugin-transform-runtime'
    ]
  }
}