const Router = require('koa-router');
const diaryRouter = new Router({prefix: '/diary'});
const {article,searchDiary,calendarList} = require('../controller/diaryController');

//添加或修改日记内容
diaryRouter.post('/article',article);
// 查询日记具体内容
diaryRouter.get('/search',searchDiary);
// 查询用户的所有日记的日期
diaryRouter.get('/calendar',calendarList);

module.exports = diaryRouter;