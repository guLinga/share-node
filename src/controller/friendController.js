const service = require('../service/friendService');

class FinendController{

  //请求对方为好友
  async quest(ctx,next){
    const {friendName,friendId} = ctx.request.body;
    const {userId} = ctx.request.query;
    const result = await service.quest(friendId,userId);
    // console.log(result);
    ctx.body = result;
  }

}

module.exports = new FinendController();