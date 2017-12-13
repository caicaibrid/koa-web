/**
 * app.js
 * @Author liuxin
 * @Date 2017/12/12 0012
 */

const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-bodyparser")
const fs = require("fs");
const path = require("path");
const nunjucks = require('nunjucks');
const static = require("koa-static");
const router = require("./middleware/router");// 封装的router
const templating = require("./middleware/templating");// 封装的templating
const xtpl = require("xtpl/lib/koa");
const isProduction = process.env.NODE_ENV === 'production';

/* 因为在发送一个post请求时(get请求可以通过params接收),
 * node原始的request对象和koa提供的request对象都不能够解析body的数据,
 * 所以需要引入第三方包
 * */
app.use(bodyParser());

/*静态文件*/
app.use(static("./"))


/*模板的中间件*/
app.use(templating(__dirname + '/views', {
    noCache: !isProduction,
    watch: !isProduction
}));

/*原始路由 这样的话定义许多路由就会使app.js臃肿,因此需要将此分离出来,
 *router.(get ||post)(地址,处理函数)
 * */
// router.get("/",async function (ctx,next) {
//    ctx.body = "hello world"
// });

/*分离路由,通过js去动态加载,添加路由router的中间件*/
app.use(router());

/*启动一个服务器*/
app.listen(3000,function () {
    console.log("start...");
    console.log("http://localhost:3000");
})