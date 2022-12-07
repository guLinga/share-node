const service = require('../service/friendService');

class FinendController{

  //请求对方为好友
  async quest(ctx,next){
    const {friendName,friendId} = ctx.request.body;
    const {userId} = ctx.request.query;
    const result = await service.quest(friendId,userId);
    ctx.body = result;
  }

  // 遍历好友列表
  async friendList(ctx,next){
    const {userId} = ctx.request.query;
    const result = await service.friendList(userId);
    ctx.body = result;
  }

}

module.exports = new FinendController();