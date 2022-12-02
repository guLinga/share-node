const Router = require('koa-router');
const friendRouter = new Router({prefix: '/friend'});
const {quest} = require('../controller/friendController');
const {friendQuest} = require('../middleware/friendMiddleware');

//请求对方为好友
friendRouter.post('/quest',friendQuest,quest);

module.exports = friendRouter;