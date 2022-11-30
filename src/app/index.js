const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/userRouter');
const errorHandler = require('./error');

//使用bodyParser解析json格式
app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log('中间件',ctx.request.headers.token);
  await next();
})

//注册路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

//监听error
app.on('error',errorHandler)

module.exports = app;