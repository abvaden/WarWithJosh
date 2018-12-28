
module.exports = {
  baseUrl: '/WarWithJosh',
  crossorigin: 'anonymous',
  productionSourceMap: false,

  devServer: {
      proxy: {
        '/WarWithJosh/api': {
          target: 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
          pathRewrite: {'WarWithJosh/api/(.*)' : '/api/$1'}
        },
      },
  },

  pwa: {
    name: 'War With Josh',
    themeColor: '#82B7C5'
  }
}