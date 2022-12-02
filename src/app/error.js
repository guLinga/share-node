// 错误处理

const errorType = require('../constants/error-types');

const errorHandler = (error,ctx) => {
  
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
    case errorType.FRIEND_NAME_NOT_EMPTY:
      message = {code:400,msg:"笔友名不能为空"};
      break;
    case errorType.FRIEND_NAME_NOT_EXIST:
      message = {code:400,msg:'笔友不存在'};
      break;
    case errorType.NOT_ADD_SELF_FRIEND:
      message = {code:400,msg:'不能添加自己成笔友'};
      break;
    case errorType.ALREADY_FRIEND:
      message = {code:400,msg:'已经是好友了，不能重复添加'};
      break;
    default:
      message = {code:404,msg:"NOT FOUND"};
  }

  ctx.status = 200;
  ctx.body = message;
}

module.exports = errorHandler;