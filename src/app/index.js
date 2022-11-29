const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

const userRouter = require('../router/userRouter');
const errorHandler = require('./error');

//使用bodyParser解析json格式
app.use(bodyParser());

//注册路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

//监听error
app.on('error',errorHandler)

module.exports = app;