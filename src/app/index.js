const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/userRouter');
const errorHandler = require('./error');

const jwt = require('jsonwebtoken');

//使用bodyParser解析json格式
app.use(bodyParser());

// token鉴权
app.use(async (ctx, next) => {
  if(ctx.request.headers.token){
    ctx.request.query.userId = jwt.decode(ctx.request.headers.token);
  }
  await next();
})

//注册路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

//监听error
app.on('error',errorHandler)

module.exports = app;