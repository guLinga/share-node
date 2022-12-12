const Router = require('koa-router');
const friendRouter = new Router({prefix: '/friend'});
const {quest,friendList,myFriendQuest,send,messageList,getFriendQuest,clearUnread} = require('../controller/friendController');
const {friendQuest} = require('../middleware/friendMiddleware');

// 请求对方为好友
friendRouter.post('/quest',friendQuest,quest);
// 遍历好友列表
friendRouter.get('/friendList',friendList)
// 遍历我发送的好友请求列表
friendRouter.get('/myFriendQuest',myFriendQuest)
// 遍历我收到的好友请求列表
friendRouter.get('/getFriendQuest',getFriendQuest)
// 发送消息
friendRouter.post('/send',send);
// 清除未读消息
friendRouter.put('/clearUnread',clearUnread)
// 获取好友聊天消息列表
friendRouter.get('/messageList',messageList);

module.exports = friendRouter;