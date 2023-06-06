module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:4020',
      logLevel: 'debug',
    },
  },
}
