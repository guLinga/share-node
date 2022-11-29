const connection = require('../app/database');
const {SendMail} = require('../utils/mail');
const {createCode} = require('../utils/code');
const {md5Encryption} = require('../utils/md5');

class UserService{

  //注册
  async create(user){
    const {name,password} = user;
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`;
    const result = await connection.execute(statement,[name,md5Encryption(password)]);
    return result[0];
  }

  //查询用户名
  async getUserByName(name){
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement,[name]);
    return result[0];
  }

  //验证码
  async sendMail(email){
    const code = await createCode();
    const result = await SendMail(email,code);
    return result;
  }

}

module.exports = new UserService();