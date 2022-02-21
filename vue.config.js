module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config.plugin('html') 
      .tap(args => {
        args[0].title = "台新銀行──目視管理"
        return args;
      })
  },
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    // host: 'localhost',
    // port: 8080,
    // https: false,
    // open: true,
    // proxy: {
    //    '/api':{
    //        'target':'http://localhost:2211',
    //        changeOrigin:true,
    //        pathRewrite:{
    //            '^/Api':'',
    //        }
    //    }
    // }   
  },
};
