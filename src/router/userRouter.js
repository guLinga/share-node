const Router = require('koa-router');
const userRouter = new Router({prefix: '/users'});

const {verifyUser,loginMiddleware} = require('../middleware/userMiddleware');
const {create,sendMail,login,searchName} = require('../controller/userController');

//用户注册
userRouter.post('/',verifyUser,create);
//发送验证码
userRouter.get('/code',sendMail);
// 登录
userRouter.get('/login',loginMiddleware,login);
// 通过用户名模糊搜索用户
userRouter.get('/searchName',searchName);

module.exports = userRouter;