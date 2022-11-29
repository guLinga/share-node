const md5 = require('js-md5');

function md5Encryption(value){
  return md5(value);
}

module.exports = {
  md5Encryption
}