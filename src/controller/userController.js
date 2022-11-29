const service = require('../service/userService');

class UserController{

  //注册
  async create(ctx,next){
    const user = ctx.request.body;
    const result = await service.create(user);
    //返回数据
    ctx.body = result;
  }
  
  //发送验证码
  async sendMail(ctx,next){
    const {email} = ctx.request.query;
    const result = await service.sendMail(email);
    ctx.body = result;
  }

}

module.exports = new UserController();