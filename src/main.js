const app = require('./app');
const config = require('./app/config');
require('./app/database');

// 开启服务
app.listen(config.App_PORT,function(){
  console.log(`服务器启动成功,port:${config.App_PORT}`);
})