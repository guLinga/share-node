// 错误处理

const errorType = require('../constants/error-types');

const errorHandler = (error,ctx) => {

  console.log(error);
  
  let status,message;

  switch(error.message){
    case errorType.NAME_OP_PASSWORD_IS_REQUIRED:
      message = {code:400,msg:"用户名或者密码不能为空"};
      break;
    case errorType.USER_ALREADY_EXISTS:
      message = {code:409,msg:"用户名已经存在"};
      break;
    case errorType.FIVE_MINUTE_NOT_REVERSE_SEND: 
      message = {code:400,msg:"五分钟内不能重复发送"};
      break;
    case errorType.EMAIL_NOT_EMPTY: 
      message = {code:400,msg:"邮箱不能为空"};
      break;
    case errorType.CODE_NOT_EMPTY: 
      message = {code:400,msg:"验证码不能为空"};
      break;
    case errorType.CODE_FAIL: 
      message = {code:400,msg:"验证码不正确"};
      break;
    case errorType.CODE_PAST: 
      message = {code:400,msg:"验证码已过期"};
      break;
    default:
      message = {code:404,msg:"NOT FOUND"};
  }

  ctx.status = 200;
  ctx.body = message;
}

module.exports = errorHandler;