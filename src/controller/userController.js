const service = require('../service/userService');
const jwt = require('jsonwebtoken');

class UserController{

  //注册
  async create(ctx,next){
    const user = ctx.request.body;
    const result = await service.create(user);
    //返回数据
    ctx.body = {
      code: 200,
      msg: "注册成功",
      data: result
    };
  }
  
  //发送验证码
  async sendMail(ctx,next){
    const {email} = ctx.request.query;
    const result = await service.sendMail(email);
    ctx.body = result;
  }

  // 登录
  async login(ctx,next){
    const {name,password} = ctx.request.query;
    const result = await service.login(name,password);
    if(result.length===0){
      return ctx.body = {
        code: 400,
        msg: '用户名或密码错误'
      }
    }
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: jwt.sign({ userMessage: result }, 'xsx1514')
    };
  }

}

module.exports = new UserController();