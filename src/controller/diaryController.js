const service = require('../service/diaryService');
const jwt = require('jsonwebtoken');

class DiaryController{

  //添加或修改日记内容
  async article(ctx,next){
    const {article,time} = ctx.request.body;
    const {userId} = ctx.request.query;
    const result = await service.article(userId,article,time);
    ctx.body = result;
  }

  // 根据时间查询日记具体内容
  async searchDiary(ctx,next){
    const {userId,time} = ctx.request.query;
    const result = await service.searchDiary(userId,time);
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: result[0] || null
    }
  }

  // 查询用户的所有日记的日期
  async calendarList(ctx,next){
    const {userId} = ctx.request.query;
    const result = await service.calendarList(userId);
    console.log(result);
    ctx.body = {
      code: 200,
      msg: '查询成功',
      data: !result[0].time ? [] : result[0].time.split(",")
    }
  }

}

module.exports = new DiaryController();