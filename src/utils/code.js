const nanoid = import('nanoid');
const {CODE_PAST,CODE_FAIL} = require('../constants/error-types');
const {CODE_SUCCESS} = require('../constants/success-type');


//保存验证码
let saveCode = {};

//判断五分钟之内不能重复发送，返回是否重复发送，重复返回true，不重复返回false
function notReverseSend(email,code){

  const temp = saveCode[email];

  //邮箱不存在
  if(!temp){
    saveCode[email] = {
      time: Date.now(),
      code
    };
    return false;
  }

  //验证码过期
  const time = Date.now();
  if(time - temp.time > 300000){
    saveCode[email] = {
      time,
      code
    };
    return false;
  }

  //验证码不过期
  return true;
}

//判断邮箱验证码是否正确
function judgeCodeSuccess(email,code){

  
  const temp = saveCode[email];
  
  //没有邮箱
  if(!temp)return {is:false,msg:CODE_FAIL};

  //验证码是否正确
  if(temp.code!==code)return {is:false,msg:CODE_FAIL};

  //验证码过期
  const time = Date.now();
  if(time - temp.time > 300000)return {is:false,msg:CODE_PAST};

  //验证码正确
  saveCode[email] = null;
  return {is:true,msg:CODE_SUCCESS}
}

// 生成验证码
function createCode(length=6){
  return nanoid.then(data=>{
    return data.nanoid(length)
  })
}

module.exports = {
  saveCode,
  createCode,
  notReverseSend,
  judgeCodeSuccess
}