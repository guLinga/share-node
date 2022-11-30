const errorType = require('../constants/error-types');
const service = require('../service/userService');
const {judgeCodeSuccess} = require('../utils/code');

// 判断用户名密码是否存在，用户名是否注册过的中间件
const verifyUser = async (ctx,next) => {
  
  const {name,password,email,code} = ctx.request.body;

  
  //判断用户名密码是否存在
  if(!name||!password){
    const error = new Error(errorType.NAME_OP_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error',error,ctx);
  }
  
  
  //请填写邮箱
  if(!email){
    const error = new Error(errorType.EMAIL_NOT_EMPTY);
    return ctx.app.emit('error',error,ctx);
  }
  
  //验证码不能为空
  if(!code){
    const error = new Error(errorType.CODE_NOT_EMPTY);
    return ctx.app.emit('error',error,ctx);
  }
  
  //验证码是否正确
  const temp = judgeCodeSuccess(email,code);
  if(!temp.is){
    const error = new Error(temp.msg);
    return ctx.app.emit('error',error,ctx);
  }

  //判断注册的用户名是否被注册过
  const result = await service.getUserByName(name);
  if(result.length){
    const error = new Error(errorType.USER_ALREADY_EXISTS);
    return ctx.app.emit('error',error,ctx);
  }

  await next();
}

// 用户登录的中间件
const loginMiddleware = async (ctx,next) => {

  const {name,password} = ctx.request.query;

  // 判断用户名和密码是否为空
  if(!name||!password){
    const error = new Error(NAME_OP_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error',error,ctx);
  }

  await next();

}
module.exports = {
  verifyUser,
  loginMiddleware
}