const connection = require('../app/database');
const {SendMail} = require('../utils/mail');
const {createCode} = require('../utils/code');
const {md5Encryption} = require('../utils/md5');

class DiaryService{

  //添加或修改日记内容
  async article(userId,article,time){
    const user = await this.searchUser(userId);
    if(user.length===0)return {code:400,msg:'没有对应用户'};
    const diary = await this.searchDiary(userId,time);
    if(diary.length===0){
      //插入数据
      await this.insterArticle(userId,article,time);
      return {code:200,msg:'添加成功'};
    }else{
      //修改数据
      await this.modifyArticle(userId,article,time);
      return {code:200,msg:'日记内容修改成功'};
    }
  } 

  //查用是否有该用户
  async searchUser(userId){
    const statement = `SELECT * FROM users WHERE id = ?;`;
    const result = await connection.execute(statement,[userId]);
    return result[0];
  }

  //根据时间查询日记具体内容
  async searchDiary(userId,time){
    const statement = `SELECT * FROM diarys WHERE userId = ? AND time = ?;`;
    const result = await connection.execute(statement,[userId,time]);
    return result[0];
  }

  // 插入日记内容
  async insterArticle(userId,article,time){
    console.log(userId);
    const statement = `INSERT INTO diarys (userId,article,time) VALUES (?,?,?);`;
    const result = await connection.execute(statement,[userId,article,time]);
    return result;
  }

  // 修改日记内容
  async modifyArticle(userId,article,time){
    const statement = `UPDATE diarys SET article = ? WHERE userId = ? AND time = ?;`;
    const result = await connection.execute(statement,[article,userId,time]);
    return result;
  }

}

module.exports = new DiaryService();