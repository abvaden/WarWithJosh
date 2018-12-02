
module.exports = {
    baseUrl: '/WarWithJosh',
    crossorigin: 'anonymous',
    productionSourceMap: false,
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            ws: true,
            changeOrigin: true
          },
        },
    },
}