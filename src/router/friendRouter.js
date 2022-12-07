const Router = require('koa-router');
const friendRouter = new Router({prefix: '/friend'});
const {quest,friendList} = require('../controller/friendController');
const {friendQuest} = require('../middleware/friendMiddleware');

//请求对方为好友
friendRouter.post('/quest',friendQuest,quest);
// 遍历好友列表
friendRouter.get('/friendList',friendList)

module.exports = friendRouter;