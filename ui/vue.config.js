const areSourceMapsIncluded = process.env.VUE_APP_STAGE === 'dev' || process.env.VUE_APP_STAGE === 'qa'

module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  productionSourceMap: areSourceMapsIncluded,
  configureWebpack: {
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  }
}
