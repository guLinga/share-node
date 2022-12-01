const Router = require('koa-router');
const diaryRouter = new Router({prefix: '/diary'});
const {article,searchDiary} = require('../controller/diaryController');

//添加或修改日记内容
diaryRouter.post('/article',article);
// 查询日记具体内容
diaryRouter.get('/search',searchDiary);

module.exports = diaryRouter;