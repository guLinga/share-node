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
      await this.modifyStatue(friendId,'2');
      await this.addStatue(userId,friendId,'2');
      return {code:200,msg:'添加成功'};
    }else{
      //如果否
      // 判断是否已经发送过好友请求
      const temp2 = await this.friendQuest(userId,friendId);
      console.log(temp2);
      if(temp2.length===0){
        // 如果不是，则添加数据
        await this.addStatue(userId,friendId,'0');
      }
      return {code:200,msg:'笔友请求发送成功'}
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
    console.log(userId);
    const statement = `SELECT f.friendId, u.name, f.updateAt FROM friends f LEFT JOIN users u ON f.friendId = u.id
    WHERE f.statue = 2 AND f.userId = 1 ORDER BY f.updateAt DESC;`;
    const result = await connection.execute(statement,[userId]);
    return {
      code: 200,
      msg: '查询成功',
      data: result[0]
    };
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
  async modifyStatue(userId,statue){
    const statement = `UPDATE friends SET statue = ? WHERE userId = ?;`;
    await connection.execute(statement,[statue,userId]);
  }

  // 添加的数据
  async addStatue(userId,friendId,statue){
    const statement = `INSERT INTO friends (userId,friendId,statue) VALUES (?,?,?);`;
    await connection.execute(statement,[userId,friendId,statue]);
  }



}

module.exports = new FriendService();