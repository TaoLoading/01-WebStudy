'use strict';
/* 
用于判断一个error是不是一个cancel错误
*/
module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};
