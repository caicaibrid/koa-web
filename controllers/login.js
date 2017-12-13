/**
 * login.js
 * @Author liuxin
 * @Date 2017/12/12 0012
 */
const login = async function (ctx,next) {
    ctx.body = "这是登录页面";
};

const loginIn = async function (ctx,next) {
    ctx.body = "这是登录请求的url"
}

module.exports = {
    "GET /login":login,
    "POST /loginIn":loginIn
};