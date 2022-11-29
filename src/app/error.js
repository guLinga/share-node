// 错误处理

const errorType = require('../constants/error-types');

const errorHandler = (error,ctx) => {
  
  let status,message;

  switch(error.message){
    case errorType.NAME_OP_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorType.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已经存在";
      break;
    case errorType.FIVE_MINUTE_NOT_REVERSE_SEND: 
      status = 400;
      message = '五分钟内不能重复发送';
      break;
    case errorType.EMAIL_NOT_EMPTY: 
      status = 400;
      message = '邮箱不能为空';
      break;
    case errorType.CODE_NOT_EMPTY: 
      status = 400;
      message = '验证码不能为空';
      break;
    case errorType.CODE_FAIL: 
      status = 400;
      message = '验证码不正确';
      break;
    case errorType.CODE_PAST: 
      status = 400;
      message = '验证码已过期';
      break;
    default:
      status = 404;
      message = "NOT FOUND";
  }

  ctx.status = status;
  ctx.body = message;
}

module.exports = errorHandler;