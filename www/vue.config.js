
module.exports = {
    baseUrl: process.env.VUE_APP_API_ENDPOINT,
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