const app = require('./app');
const config = require('./app/config');
require('./app/database');
const socket = require('socket.io');

// 开启服务
const server = app.listen(config.App_PORT,function(){
  console.log(`服务器启动成功,port:${config.App_PORT}`);
})

// socket.io
const io = socket(server,{
  cors: "http://localhost:3000",
  credentials: true
})

global.onlineUsers = new Map();

io.on("connection",(socket)=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId,socket)
  })
  socket.on("send-msg", (data) => {
    console.log(data.msg);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      sendUserSocket.emit("msg-recieve", data.msg.replace('<','&lt;').replace('>','&gt;').replace('\n','<br>'));
    }
  });
})