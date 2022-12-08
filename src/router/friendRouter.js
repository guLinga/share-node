const Router = require('koa-router');
const friendRouter = new Router({prefix: '/friend'});
const {quest,friendList,myFriendQuest,send} = require('../controller/friendController');
const {friendQuest} = require('../middleware/friendMiddleware');

// 请求对方为好友
friendRouter.post('/quest',friendQuest,quest);
// 遍历好友列表
friendRouter.get('/friendList',friendList)
// 遍历我发送的好友请求列表
friendRouter.get('/myFriendQuest',myFriendQuest)
// 发送消息
friendRouter.post('/send',send);

module.exports = friendRouter;