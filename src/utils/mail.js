const nodeMailer=require('nodemailer');
const {notReverseSend} = require('./code');
const {CODE_SEND_FAIL,FIVE_MINUTE_NOT_REVERSE_SEND} = require('../constants/error-types');
const {CODE_SEND_SUCCESS} = require('../constants/success-type');

let transporter=nodeMailer.createTransport({
    host:"smtp.qq.com",
        port:465,
        secure:true,
        auth:{
            user:"2634917964@qq.com",
            pass:"vzugubmripdndigg"
        }
});

function SendMail(mail,code){
    // 五分钟内不能重复发送
    if(notReverseSend(mail,code)){
        return {
            code: 400,
            msg: FIVE_MINUTE_NOT_REVERSE_SEND
        }
    }
    //邮件信息
    let Mail={
        from:'"1514"<2634917964@qq.com>',
        to:mail,
        subject:'',
        text:`你的验证码是${code},1分钟有效`
    }
    return new Promise((resolve,reject)=>{
        transporter.sendMail(Mail,(err,data)=>{
            if(err){
                reject({
                    code: 400,
                    msg: CODE_SEND_FAIL
                });
            }else{
                resolve({
                    code: 200,
                    msg: CODE_SEND_SUCCESS
                });
            }
        });
    })
}

module.exports={SendMail}