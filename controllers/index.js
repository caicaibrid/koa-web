/**
 * index.js
 * @Author liuxin
 * @Date 2017/12/12 0012
 */
const index = async function (ctx,next) {
    await ctx.render("index.html",{
        index:"llllll"
    });
    await next();
};

module.exports = {
    "GET /":index
};