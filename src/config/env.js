
/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */
let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl = '';


if (process.env.NODE_ENV == 'development') { //如果是开发环境 图片路径就是 img 文件夹
    imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){//生产环境下图片资源路径与基本路径配置
    baseUrl = '//localhost:8888'
    imgBaseUrl = '//localhost:8888/img/';
}

export { //导出 url
    baseUrl,
    routerMode,
    imgBaseUrl,
}