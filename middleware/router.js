/**
 * router.js
 * @Author liuxin
 * @Date 2017/12/12 0012
 */
const fs = require("fs");
const router = require("koa-router")();
const config = require("../config");
const routes = {};
function addControllers(dir) {
    fs.readdirSync(dir).forEach((fileName)=> {
        let filedir = dir + "/" + fileName;
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir,(error,stats)=>{
            if(error){
                console.warn('获取文件信息失败');
            }else {
                let isFile = stats.isFile();//是文件
                let isDir = stats.isDirectory();//是文件夹
                if(isFile){
                    let mapping = require(filedir);
                    addMapping(mapping);
                }
                if(isDir){
                    addControllers(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                }
                console.log("项目的路由:",routes)
            }
        })

    });

}

function addMapping(mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url]);
        } else if (url.startsWith('PUT ')) {
            let path = url.substring(4);
            router.put(path, mapping[url]);
        } else if (url.startsWith('DELETE ')) {
            let path = url.substring(7);
            router.del(path, mapping[url]);
        } else {
            console.log(`invalid URL: ${url}`);
        }
        routes[url] = mapping[url];
    }
}

module.exports = function (dirName) {
    let dir = dirName || "controllers";
    addControllers(config.dirname + "/" + dir);
    return router.routes();
};