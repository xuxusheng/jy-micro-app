const packageName = require('./package.json').name

module.exports = function override(config, env) {
  config.devServer = {
    static: {
      // 关键数据监测前端
      publicPath: '/shaoshan/whjygjsjjcqd/'
    }
  }

  config.output.library = `${packageName}-[name]`
  config.output.libraryTarget = 'umd'
  config.output.chunkLoadingGlobal = `webpackJsonp_${packageName}`
  // 关键数据监测前端
  config.output.publicPath = `/shaoshan/whjygjsjjcqd/`
  return config
}
