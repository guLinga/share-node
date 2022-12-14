const app = require('./app');
const config = require('./app/config');
require('./app/database');
const socket = require('socket.io');

// 开启服务
const server = app.listen(config.APP_PORT,function(){
  console.log(`服务器启动成功,port:${config.APP_PORT}`);
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
  // 发送消息
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      data.msg.data.message = data.msg.data.message.replace('<','&lt;').replace('>','&gt;');
      sendUserSocket.emit("msg-recieve", data.msg);
    }
  });
  // 发送好友请求
  socket.on("send_friend_quest", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      sendUserSocket.emit("recivece_friend_quest", data);
    }
  })
  // 发送同意好友请求
  socket.on("agree_friend_quest", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if(sendUserSocket){
      sendUserSocket.emit("agree_friend_quest", data);
    }
  })
})