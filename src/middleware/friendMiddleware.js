const {
  FRIEND_NAME_NOT_EMPTY,
  FRIEND_NAME_NOT_EXIST,
  NOT_ADD_SELF_FRIEND,
  ALREADY_FRIEND
} = require('../constants/error-types');
const {searchName,alreadyFriend} = require('../service/friendService');

//判断笔友名是否存在和是否存在
const friendQuest = async (ctx,next) => {
  const {friendName} = ctx.request.body;
  
  // friendName为空
  if(!friendName){
    const error = new Error(FRIEND_NAME_NOT_EMPTY);
    return ctx.app.emit('error',error,ctx);
  }

  // 用户不存在
  const result = await searchName(friendName);
  if(result.length===0){
    const error = new Error(FRIEND_NAME_NOT_EXIST);
    return ctx.app.emit('error',error,ctx);
  }

  //不能请求自己为好友
  if(result[0].id === ctx.request.query.userId){
    const error = new Error(NOT_ADD_SELF_FRIEND);
    return ctx.app.emit('error',error,ctx);
  }

  // 已经添加过好友了
  let isFriend = await alreadyFriend(ctx.request.query.userId,result[0].id)
  if(isFriend){
    const error = new Error(ALREADY_FRIEND);
    return ctx.app.emit('error',error,ctx);
  }

  ctx.request.body.friendId = result[0].id;
  await next();

}

module.exports = {
  friendQuest
}