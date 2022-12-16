const connection = require('../app/database');
const {SendMail} = require('../utils/mail');
const {createCode} = require('../utils/code');
const {md5Encryption} = require('../utils/md5');

class FriendService{
  //添加或修改日记内容
  async quest(friendId,userId){
    // 判断对方是否向我发起好友请求
    const temp = await this.friendQuest(friendId,userId);
    if(temp.length!==0){
      //如果是，那么直接修改值和添加一条数据
      // 将未读好友清空
      await this.setNoFriendUnread(friendId,userId,0);
      await this.modifyStatue(userId,friendId,'2');
      await this.addStatue(userId,friendId,'2');
      // 将好友设置一条未读消息，加好友成功
      await this.setNoFriendUnread(userId,friendId,1);
      return {code:200,msg:'添加成功'};
    }else{
      //如果否
      // 判断是否已经发送过好友请求
      const temp2 = await this.friendQuest(userId,friendId);
      if(temp2.length===0){
        // 如果不是，则添加数据
        await this.addStatue(userId,friendId,0);
        await this.setNoFriendUnread(userId,friendId,1);
        return {code:200,msg:'笔友请求发送成功'}
      }else{
        return {code:400,msg:'好友请求已发送不能重复发送'}
      }
    }
  }

  //根据用户名查询用户是否存在
  async searchName(friendName){
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement,[friendName]);
    return result[0];
  }

  // 查询好友列表
  async friendList(userId){
    const statement = `SELECT f.friendId, u.name, f.updateAt, f.unread FROM friends f LEFT JOIN users u ON f.friendId = u.id
    WHERE f.statue = 2 AND f.userId = ? ORDER BY f.updateAt DESC;`;
    const result = await connection.execute(statement,[userId]);
    return {
      code: 200,
      msg: '查询成功',
      data: result[0]
    };
  }

  // 发送消息
  async send(userId,friendId,message){
    if(!userId||!friendId||!message)return {code: 400,msg: '参数传递不完整'};
    const statement = `INSERT INTO message (userId,friendId,message) VALUES (?,?,?);`;
    const result = await connection.execute(statement,[userId,friendId,message]);
    // 添加未读消息
    await this.addUnread(friendId,userId);
    return {
      code: 200,
      msg: '发送成功',
      data: result
    }
  }

  // 添加未读消息
  async addUnread(userId,friendId){
    const num = await this.searchUnread(userId,friendId);
    const statement = `UPDATE friends SET unread = ? WHERE userId = ? AND friendId = ?;`
    await connection.execute(statement,[num+1,userId,friendId]);
  }

  // 清空未读消息
  async clearUnread(userId,friendId){
    const statement = `UPDATE friends SET unread = 0 WHERE userId = ? AND friendId = ?;`
    const result = await connection.execute(statement,[userId,friendId]);
    return {
      code: 200,
      msg: '未读消息清空'
    }
  }

  // 查询未读消息数量
  async searchUnread(userId,friendId){
    const statement = `SELECT unread FROM friends WHERE userId = ? AND friendId = ?;`
    const result = await connection.execute(statement,[userId,friendId]);
    return result[0][0].unread;
  }

  // 遍历我发送的好友请求列表
  async myFriendQuest(userId){
    const statement = `SELECT f.friendId, u.name, f.updateAt FROM friends f LEFT JOIN users u ON f.friendId = u.id
    WHERE f.userId = ? AND f.statue = 0 ORDER BY f.updateAt DESC;`;
    const result = await connection.execute(statement,[userId]);
    return {
      code: 200,
      msg: '查询成功',
      data: result[0]
    }
  }

  // 遍历我收到的好友请求列表
  async getFriendQuest(userId){
    if(!userId)return {code:400,msg:'参数传递不完整'};
    const statement = `SELECT f.userId friendId, u.name, f.updateAt, f.unread FROM friends f LEFT JOIN users u ON f.userId = u.id
    WHERE f.friendId = ? AND f.statue = 0 ORDER BY f.updateAt DESC;`
    const result = await connection.execute(statement,[userId]);
    return {
      code: 200,
      msg: '遍历成功',
      data: result[0]
    }
  }

  // 获取好友聊天消息列表
  async messageList(userId,friendId){
    if(!userId||!friendId)return {code: 400,msg: '参数传递不完整'};
    const statement = `SELECT * FROM message WHERE
    (message.userId = ? AND message.friendId = ?) | (message.userId = ? AND message.friendId = ?)
    ORDER BY message.updateAt ASC;`;
    const result = await connection.execute(statement,[userId,friendId,friendId,userId]);
    return {
      code: 200,
      msg: '遍历成功',
      data: result[0]
    }
  }

  // 判断双方是否已经是好友
  async alreadyFriend(userId,friendId){
    const statement = `SELECT * FROM friends WHERE userId = ? AND friendId = ?;`;
    const result1 = await connection.execute(statement,[userId,friendId]);
    const result2 = await connection.execute(statement,[friendId,userId]);
    return result1[0].length!==0&&result2[0].length!==0;
  }

  // 判断对方是否发起请求
  async friendQuest(userId,friendId){
    const statement = `SELECT * FROM friends WHERE userId = ? AND friendId = ?;`;
    const result = await connection.execute(statement,[userId,friendId]);
    return result[0];
  }

  //修改statue的状态，2表示添加好友，0表示发起好友请求
  async modifyStatue(userId,friendId,statue){
    const statement = `UPDATE friends SET statue = ? WHERE userId = ? AND friendId = ?;`;
    await connection.execute(statement,[statue,friendId,userId]);
  }

  // 添加的数据
  async addStatue(userId,friendId,statue){
    const statement = `INSERT INTO friends (userId,friendId,statue,unread) VALUES (?,?,?,0);`;
    await connection.execute(statement,[userId,friendId,statue]);
  }

  // 设置未加好友的信息未读
  async setNoFriendUnread(userId,friendId,unread){
    const statement = `UPDATE friends SET unread = ? WHERE userId = ? AND friendId = ?;`;
    await connection.execute(statement,[unread,userId,friendId]);
  }


}

module.exports = new FriendService();