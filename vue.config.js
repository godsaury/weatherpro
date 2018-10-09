// const api = require("./src/lib/api");  
// console.log(api);

module.exports = {
    lintOnSave:false,
    baseUrl: './',
    productionSourceMap: false,//true时打包会生成map文件   
    devServer: {
        proxy: {
            '/api': {
                target:'http://v.juhe.cn/', // 你请求的第三方接口
                changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite:{  // 路径重写，
                    '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可。
                }
            }
        }
        // proxy: {
        //     [api.ROOT]: {    //将www.exaple.com印射为/apis
        //         target: api.PROXYROOT, // 接口域名
        //         // secure: false,  // 如果是https接口，需要配置这个参数
        //         changeOrigin: true,  //是否跨域
        //         pathRewrite: {
        //             [`^${api.ROOT}`]: ''   //需要rewrite的
        //         }              
        //     }
        // }
    },
}