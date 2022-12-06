const connection = require('../app/database');
const {SendMail} = require('../utils/mail');
const {createCode} = require('../utils/code');
const {md5Encryption} = require('../utils/md5');

class UserService{

  //注册
  async create(user){
    const {name,password,email} = user;
    const statement = `INSERT INTO users (name,password,email) VALUES (?,?,?);`;
    const result = await connection.execute(statement,[name,md5Encryption(password),email]);
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

  // 登录
  async login(name,password){
    const statement = `SELECT * FROM users WHERE name = ? AND password = ?;`;
    const result = await connection.execute(statement,[name,md5Encryption(password)]);
    return result[0];
  }

  //模糊查询用户名
  async searchName(name){
    const statement = `SELECT name, id FROM users WHERE name LIKE ?;`;
    const result = await connection.execute(statement,[`%${name}%`]);
    return result[0];
  }

}

module.exports = new UserService();