const context = [ //代理路径
    '/shopping',
    '/ugc',
    '/v1',
    '/v2',
    '/v3',
    '/v4',
    '/bos',
    '/member',
    '/promotion',
    '/eus',
    '/payapi',
    '/img',
  ]
  
  // proxy 基础配置
  // proxyTable: {
  //       '/api': {
  //         target: 'http://localhost:3000/', // 设置你调用的接口域名和端口号
  //         changeOrigin: true,     // 跨域
  //         pathRewrite: {
  //           '^/api': '/'          
  //         }
  //       }
  //     },
  
  //由于我们后台路由有很多个，所以我们直接使用循环，生产配置表
  const proxyList = {} //proxy 配置 表
  // 遍历 代理路径 ，生成代理表，并向外暴露
  module.exports = function () { //module.exports 模块导出
    context.map((item) => {
      proxyList[item] = {
        target: 'http://localhost:8888/', // 设置你调用的接口域名和端口号
        changeOrigin: true, // 跨域
        pathRewrite: {
          [`^${item}`]: item
        }
      }
    })
    return proxyList
  
  }