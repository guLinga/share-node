const Router = require('koa-router');
const userRouter = new Router({prefix: '/users'});

const {verifyUser} = require('../middleware/userMiddleware');
const {create,sendMail} = require('../controller/userController');

//用户注册
userRouter.post('/',verifyUser,create);
//发送验证码
userRouter.get('/code',sendMail);

module.exports = userRouter;